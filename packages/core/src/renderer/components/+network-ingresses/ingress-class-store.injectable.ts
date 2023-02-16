/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getInjectable } from "@ogre-tools/injectable";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import ingressClassApiInjectable from "../../../common/k8s-api/endpoints/ingress-class.api.injectable";
import { IngressClassStore } from "./ingress-class-store";
import storesAndApisCanBeCreatedInjectable from "../../stores-apis-can-be-created.injectable";
import clusterFrameContextForClusterScopedResourcesInjectable from "../../cluster-frame-context/for-cluster-scoped-resources.injectable";
import loggerInjectable from "../../../common/logger.injectable";

const ingressClassStoreInjectable = getInjectable({
  id: "ingress-class-store",

  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectable), "ingressClassStore is only available in certain environments");

    const api = di.inject(ingressClassApiInjectable);

    return new IngressClassStore({
      context: di.inject(clusterFrameContextForClusterScopedResourcesInjectable),
      
    }, api);
  },

  injectionToken: kubeObjectStoreInjectionToken,
});

export default ingressClassStoreInjectable;
