/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { CustomResourceDefinitionApi } from "./custom-resource-definition.api";
import { kubeApiInjectionToken } from "../kube-api/kube-api-injection-token";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";
import loggerInjectable from "../../logger.injectable";

const customResourceDefinitionApiInjectable = getInjectable({
  id: "custom-resource-definition-api",
  instantiate: (di) => {
    console.info(di.inject(storesAndApisCanBeCreatedInjectionToken), "customResourceDefinitionApi is only available in certain environments");

    return new CustomResourceDefinitionApi({
      
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default customResourceDefinitionApiInjectable;
