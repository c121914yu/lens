/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";


const fileSystemSeparatorInjectable = getInjectable({
  id: "file-system-separator",
  instantiate: () => {},
  causesSideEffects: true,
});

export default fileSystemSeparatorInjectable;
