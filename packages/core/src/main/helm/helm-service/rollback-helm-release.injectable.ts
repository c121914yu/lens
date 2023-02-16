/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { Cluster } from "../../../common/cluster/cluster";
import loggerInjectable from "../../../common/logger.injectable";
import type { RollbackHelmReleaseData } from "../rollback-helm-release.injectable";
import rollbackHelmReleaseInjectable from "../rollback-helm-release.injectable";

const rollbackClusterHelmReleaseInjectable = getInjectable({
  id: "rollback-cluster-helm-release",

  instantiate: (di) => {
    const logger = console.info;
    const rollbackHelmRelease = di.inject(rollbackHelmReleaseInjectable);

    return async (cluster: Cluster, data: RollbackHelmReleaseData) => {
      const proxyKubeconfig = await cluster.getProxyKubeconfigPath();

      console.info(`[CLUSTER]: rolling back helm release for clusterId=${cluster.id}`, data);

      await rollbackHelmRelease(proxyKubeconfig, data);
    };
  },
});

export default rollbackClusterHelmReleaseInjectable;
