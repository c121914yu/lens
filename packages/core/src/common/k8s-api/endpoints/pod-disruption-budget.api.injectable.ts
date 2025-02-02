/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { PodDisruptionBudgetApi } from "./pod-disruption-budget.api";
import { kubeApiInjectionToken } from "../kube-api/kube-api-injection-token";
import loggerInjectable from "../../logger.injectable";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const podDisruptionBudgetApiInjectable = getInjectable({
  id: "pod-disruption-budget-api",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectionToken), "podDisruptionBudgetApi is only available in certain environments");

    return new PodDisruptionBudgetApi({
      
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    }, {
      checkPreferredVersion: true,
      allowedUsableVersions: {
        policy: [
          "v1",
          "v1beta1",
        ],
      },
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default podDisruptionBudgetApiInjectable;
