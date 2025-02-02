/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";


const terminalSpawningPoolInjectable = getInjectable({
  id: "terminal-spawning-pool",
  instantiate: () => {
    const pool = document.getElementById("terminal-init");

    console.info(pool, "DOM MUST contain #terminal-init element");

    return pool;
  },
  causesSideEffects: true,
});

export default terminalSpawningPoolInjectable;
