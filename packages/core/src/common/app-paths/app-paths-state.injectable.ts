/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { AppPaths } from "./app-path-injection-token";

const appPathsStateInjectable = getInjectable({
  id: "app-paths-state",

  instantiate: () => {
    let state: AppPaths = {currentApp: ''};

    return {
      get: () =>{
        return state;
      },

      set: (newState: AppPaths) => {
      },
    };
  },
});

export default appPathsStateInjectable;
