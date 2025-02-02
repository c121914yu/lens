/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { kubeObjectStoreInjectionToken } from "../../../../common/k8s-api/api-manager/kube-object-store-token";
import roleBindingApiInjectable from "../../../../common/k8s-api/endpoints/role-binding.api.injectable";
import loggerInjectable from "../../../../common/logger.injectable";
import clusterFrameContextForNamespacedResourcesInjectable from "../../../cluster-frame-context/for-namespaced-resources.injectable";
import storesAndApisCanBeCreatedInjectable from "../../../stores-apis-can-be-created.injectable";
import { RoleBindingStore } from "./store";

const roleBindingStoreInjectable = getInjectable({
  id: "role-binding-store",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectable), "roleBindingStore is only available in certain environments");

    const api = di.inject(roleBindingApiInjectable);

    return new RoleBindingStore({
      context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default roleBindingStoreInjectable;
