/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { storesAndApisCanBeCreatedInjectionToken } from "../../../../common/k8s-api/stores-apis-can-be-created.token";
import clusterRoleApiInjectable from "../../../../common/k8s-api/endpoints/cluster-role.api.injectable";
import { kubeObjectStoreInjectionToken } from "../../../../common/k8s-api/api-manager/kube-object-store-token";
import { ClusterRoleStore } from "./store";
import clusterFrameContextForClusterScopedResourcesInjectable from "../../../cluster-frame-context/for-cluster-scoped-resources.injectable";
import loggerInjectable from "../../../../common/logger.injectable";

const clusterRoleStoreInjectable = getInjectable({
  id: "cluster-role-store",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectionToken), "clusterRoleStore is only available in certain environments");

    const api = di.inject(clusterRoleApiInjectable);

    return new ClusterRoleStore({
      context: di.inject(clusterFrameContextForClusterScopedResourcesInjectable),
      
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default clusterRoleStoreInjectable;
