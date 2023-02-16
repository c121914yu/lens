/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

const ipcRendererInjectable = getInjectable({
  id: "ipc-renderer",
  instantiate: () => {},
  causesSideEffects: true,
});

export default ipcRendererInjectable;
