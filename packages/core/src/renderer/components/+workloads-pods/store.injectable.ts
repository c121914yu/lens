/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import podApiInjectable from "../../../common/k8s-api/endpoints/pod.api.injectable";
import storesAndApisCanBeCreatedInjectable from "../../stores-apis-can-be-created.injectable";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import { PodStore } from "./store";
import podMetricsApiInjectable from "../../../common/k8s-api/endpoints/pod-metrics.api.injectable";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import loggerInjectable from "../../../common/logger.injectable";

const podStoreInjectable = getInjectable({
  id: "pod-store",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectable), "podStore is only available in certain environements");

    const api = di.inject(podApiInjectable);

    return new PodStore({
      podMetricsApi: di.inject(podMetricsApiInjectable),
      context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default podStoreInjectable;
