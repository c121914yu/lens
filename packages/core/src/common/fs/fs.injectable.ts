/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

/**
 * NOTE: Add corrisponding a corrisponding override of this injecable in `src/test-utils/override-fs-with-fakes.ts`
 */
const fsInjectable = getInjectable({
  id: "fs",
  instantiate: () => {
    return {}
  },
  causesSideEffects: true,
});

export default fsInjectable;
