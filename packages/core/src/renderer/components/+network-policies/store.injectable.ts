/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import networkPolicyApiInjectable from "../../../common/k8s-api/endpoints/network-policy.api.injectable";
import loggerInjectable from "../../../common/logger.injectable";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import storesAndApisCanBeCreatedInjectable from "../../stores-apis-can-be-created.injectable";
import { NetworkPolicyStore } from "./store";

const networkPolicyStoreInjectable = getInjectable({
  id: "network-policy-store",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectable), "networkPolicyStore is only available in certain environments");

    const api = di.inject(networkPolicyApiInjectable);

    return new NetworkPolicyStore({
      context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default networkPolicyStoreInjectable;
