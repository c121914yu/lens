/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { PersistentVolumeApi } from "./persistent-volume.api";
import { kubeApiInjectionToken } from "../kube-api/kube-api-injection-token";
import loggerInjectable from "../../logger.injectable";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const persistentVolumeApiInjectable = getInjectable({
  id: "persistent-volume-api",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectionToken), "persistentVolumeApi is only available in certain environments");

    return new PersistentVolumeApi({
      
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default persistentVolumeApiInjectable;
