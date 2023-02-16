/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

export type RandomBytes = (size: number) => Promise<Buffer>;

const randomBytesInjectable = getInjectable({
  id: "random-bytes",
  instantiate: () => {},
  causesSideEffects: true,
});

export default randomBytesInjectable;
