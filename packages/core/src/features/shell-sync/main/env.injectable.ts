/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

const processEnvInjectable = getInjectable({
  id: "process-env",
  instantiate: () =>"development",
  causesSideEffects: true,
});

export default processEnvInjectable;
