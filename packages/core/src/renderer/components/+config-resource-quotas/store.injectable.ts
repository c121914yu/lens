/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import resourceQuotaApiInjectable from "../../../common/k8s-api/endpoints/resource-quota.api.injectable";
import loggerInjectable from "../../../common/logger.injectable";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import storesAndApisCanBeCreatedInjectable from "../../stores-apis-can-be-created.injectable";
import { ResourceQuotaStore } from "./store";

const resourceQuotaStoreInjectable = getInjectable({
  id: "resource-quota-store",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectable), "resourceQuotaStore is only available in certain environments");

    const api = di.inject(resourceQuotaApiInjectable);

    return new ResourceQuotaStore({
      context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default resourceQuotaStoreInjectable;
