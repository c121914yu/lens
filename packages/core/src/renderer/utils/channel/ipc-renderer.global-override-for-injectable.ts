/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import ipcRendererInjectable from "./ipc-renderer.injectable";
import { getGlobalOverride } from "../../../common/test-utils/get-global-override";

export default getGlobalOverride(ipcRendererInjectable, () => ({
  invoke: () => {},
  on: () => {},
}) as unknown );
