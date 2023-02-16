/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

import { beforeFrameStartsSecondInjectionToken } from "../before-frame-starts/tokens";
import observableHistoryInjectable from "./observable-history.injectable";

const setupLoggingForNavigationInjectable = getInjectable({
  id: "setup-logging-for-navigation",
  instantiate: (di) => ({
    id: "setup-logging-for-navigation",
    run: () => {
      const logger = console.info;
      const observableHistory = di.inject(observableHistoryInjectable);

      observableHistory.listen((location, action) => {
        const isClusterView = false;
        const domain = global.location.href;

        console.info(`[NAVIGATION]: ${action}-ing. Current is now:`, {
          isClusterView,
          domain,
          location,
        });
      });
    },
  }),
  injectionToken: beforeFrameStartsSecondInjectionToken,
});

export default setupLoggingForNavigationInjectable;
