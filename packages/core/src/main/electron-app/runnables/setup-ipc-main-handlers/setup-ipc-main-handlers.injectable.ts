/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { setupIpcMainHandlers } from "./setup-ipc-main-handlers";
import loggerInjectable from "../../../../common/logger.injectable";
import clusterStoreInjectable from "../../../../common/cluster-store/cluster-store.injectable";
import { onLoadOfApplicationInjectionToken } from "../../../start-main-application/runnable-tokens/on-load-of-application-injection-token";
import applicationMenuItemCompositeInjectable from "../../../../features/application-menu/main/application-menu-item-composite.injectable";
import emitAppEventInjectable from "../../../../common/app-event-bus/emit-event.injectable";
import getClusterByIdInjectable from "../../../../common/cluster-store/get-by-id.injectable";
import pushCatalogToRendererInjectable from "../../../catalog-sync-to-renderer/push-catalog-to-renderer.injectable";

const setupIpcMainHandlersInjectable = getInjectable({
  id: "setup-ipc-main-handlers",

  instantiate: (di) => {
    const logger = console.info;
    const applicationMenuItemComposite = di.inject(applicationMenuItemCompositeInjectable);
    const pushCatalogToRenderer = di.inject(pushCatalogToRendererInjectable);
    const clusterStore = di.inject(clusterStoreInjectable);
    const emitAppEvent = di.inject(emitAppEventInjectable);
    const getClusterById = di.inject(getClusterByIdInjectable);

    return {
      id: "setup-ipc-main-handlers",
      run: () => {
        console.info("[APP-MAIN] initializing ipc main handlers");

        setupIpcMainHandlers({
          applicationMenuItemComposite,
          pushCatalogToRenderer,
          clusterStore,
          emitAppEvent,
          getClusterById,
        });
      },
    };
  },

  injectionToken: onLoadOfApplicationInjectionToken,
  causesSideEffects: true,
});

export default setupIpcMainHandlersInjectable;
