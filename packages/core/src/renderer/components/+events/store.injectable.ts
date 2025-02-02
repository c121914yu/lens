/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import getPodByIdInjectable from "../+workloads-pods/get-pod-by-id.injectable";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import kubeEventApiInjectable from "../../../common/k8s-api/endpoints/events.api.injectable";
import loggerInjectable from "../../../common/logger.injectable";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import storesAndApisCanBeCreatedInjectable from "../../stores-apis-can-be-created.injectable";
import { EventStore } from "./store";

const eventStoreInjectable = getInjectable({
  id: "event-store",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectable), "eventStore is only available in certain environments");

    const api = di.inject(kubeEventApiInjectable);

    return new EventStore({
      getPodById: di.inject(getPodByIdInjectable),
      context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      
    }, api);
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default eventStoreInjectable;
