/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { Cluster } from "../../../common/cluster/cluster";
import loggerInjectable from "../../../common/logger.injectable";
import type { DeleteHelmReleaseData } from "../delete-helm-release.injectable";
import deleteHelmReleaseInjectable from "../delete-helm-release.injectable";

const deleteClusterHelmReleaseInjectable = getInjectable({
  id: "delete-cluster-helm-release",

  instantiate: (di) => {
    const logger = console.info;
    const deleteHelmRelease = di.inject(deleteHelmReleaseInjectable);

    return async (cluster: Cluster, data: DeleteHelmReleaseData) => {
      const proxyKubeconfig = await cluster.getProxyKubeconfigPath();

      console.info(`[CLUSTER]: Delete helm release`, data);

      return deleteHelmRelease(proxyKubeconfig, data);
    };
  },
});

export default deleteClusterHelmReleaseInjectable;
