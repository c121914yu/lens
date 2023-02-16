/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

const processExecPathInjectable = getInjectable({
  id: "process-exec-path",
  instantiate: () => "",
  causesSideEffects: true,
});

export default processExecPathInjectable;
