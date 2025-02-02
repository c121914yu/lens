/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import serviceAccountApiInjectable from "../../../../common/k8s-api/endpoints/service-account.api.injectable";
import storesAndApisCanBeCreatedInjectable from "../../../stores-apis-can-be-created.injectable";
import { kubeObjectStoreInjectionToken } from "../../../../common/k8s-api/api-manager/kube-object-store-token";
import { ServiceAccountStore } from "./store";
import clusterFrameContextForNamespacedResourcesInjectable from "../../../cluster-frame-context/for-namespaced-resources.injectable";
import loggerInjectable from "../../../../common/logger.injectable";

const serviceAccountStoreInjectable = getInjectable({
  id: "service-account-store",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectable), "serviceAccountStore is only available in certain environments");

    const api = di.inject(serviceAccountApiInjectable);

    return new ServiceAccountStore({
      context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default serviceAccountStoreInjectable;
