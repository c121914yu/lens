/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { PodSecurityPolicyApi } from "./pod-security-policy.api";
import { kubeApiInjectionToken } from "../kube-api/kube-api-injection-token";
import loggerInjectable from "../../logger.injectable";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const podSecurityPolicyApiInjectable = getInjectable({
  id: "pod-security-policy-api",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectionToken), "podSecurityPolicyApi is only available in certain environments");

    return new PodSecurityPolicyApi({
      
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default podSecurityPolicyApiInjectable;
