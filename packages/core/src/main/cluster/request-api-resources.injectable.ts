/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getInjectable } from "@ogre-tools/injectable";

import type { KubeApiResource } from "../../common/rbac";
import type { Cluster } from "../../common/cluster/cluster";
import { requestApiVersionsInjectionToken } from "./request-api-versions";
import { withConcurrencyLimit } from "../../common/utils/with-concurrency-limit";
import requestKubeApiResourcesForInjectable from "./request-kube-api-resources-for.injectable";
import type { AsyncResult } from "../../common/utils/async-result";
import { backoffCaller } from "../../common/utils/backoff-caller";

export type RequestApiResources = (cluster: Cluster) => Promise<AsyncResult<KubeApiResource[], Error>>;

export interface KubeResourceListGroup {
  group: string;
  path: string;
}

const requestApiResourcesInjectable = getInjectable({
  id: "request-api-resources",
  instantiate: (di): RequestApiResources => {
    const logger = console.info;
    const apiVersionRequesters = di.injectMany(requestApiVersionsInjectionToken);
    const requestKubeApiResourcesFor = di.inject(requestKubeApiResourcesForInjectable);

    return async (...args) => {
      const [cluster] = args;
      const requestKubeApiResources = withConcurrencyLimit(5)(requestKubeApiResourcesFor(cluster));

      const groupLists: KubeResourceListGroup[] = [];

      for (const apiVersionRequester of apiVersionRequesters) {
        const result = await backoffCaller(() => apiVersionRequester(cluster), {
          onIntermediateError: (error, attempt) => {
            cluster.broadcastConnectUpdate(`Failed to list kube API resource kinds, attempt ${attempt}: ${error}`, "warning");
            logger.warn(`[LIST-API-RESOURCES]: failed to list kube api resources: ${error}`, { attempt, clusterId: cluster.id });
          },
        });

        if (!result.callWasSuccessful) {
          return result;
        }

        groupLists.push(...result.response);
      }

      const apiResourceRequests = groupLists.map(async listGroup => (
        Object.assign(await requestKubeApiResources(listGroup), { listGroup })
      ));
      const results = await Promise.all(apiResourceRequests);
      const resources: KubeApiResource[] = [];

      for (const result of results) {
        if (!result.callWasSuccessful) {
          cluster.broadcastConnectUpdate(`Kube APIs under "${result.listGroup.path}" may not be displayed`, "warning");
          continue;
        }

        resources.push(...result.response);
      }

      return {
        callWasSuccessful: true,
        response: resources,
      };
    };
  },
});

export default requestApiResourcesInjectable;
