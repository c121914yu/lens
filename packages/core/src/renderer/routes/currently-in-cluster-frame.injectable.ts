/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

const currentlyInClusterFrameInjectable = getInjectable({
  id: "currently-in-cluster-frame",
  instantiate: () => false,
  causesSideEffects: true,
});

export default currentlyInClusterFrameInjectable;
