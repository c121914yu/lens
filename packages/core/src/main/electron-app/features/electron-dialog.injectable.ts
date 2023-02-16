/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

const electronDialogInjectable = getInjectable({
  id: "electron-dialog",
  instantiate: () => dialog,
  causesSideEffects: true,
});

export default electronDialogInjectable;
