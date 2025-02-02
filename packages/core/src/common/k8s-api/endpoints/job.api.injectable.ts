/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { JobApi } from "./job.api";
import { kubeApiInjectionToken } from "../kube-api/kube-api-injection-token";
import loggerInjectable from "../../logger.injectable";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const jobApiInjectable = getInjectable({
  id: "job-api",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectionToken), "jobApi is only available in certain environments");

    return new JobApi({
      
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    }, {
      checkPreferredVersion: true,
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default jobApiInjectable;
