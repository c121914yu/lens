/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectionToken } from "@ogre-tools/injectable";

const ipcMainInjectionToken = getInjectionToken({
  id: "ipc-main-injection-token",
});

export default ipcMainInjectionToken;
