/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import bindProtocolAddRouteHandlersInjectable from "../../protocol-handler/bind-protocol-add-route-handlers/bind-protocol-add-route-handlers.injectable";
import lensProtocolRouterRendererInjectable from "../../protocol-handler/lens-protocol-router-renderer/lens-protocol-router-renderer.injectable";
import catalogEntityRegistryInjectable from "../../api/catalog/entity/registry.injectable";

const initRootFrameInjectable = getInjectable({
  id: "init-root-frame",
  instantiate: (di) => {
    const bindProtocolAddRouteHandlers = di.inject(bindProtocolAddRouteHandlersInjectable);
    const catalogEntityRegistry = di.inject(catalogEntityRegistryInjectable);

    return async (unmountRoot: () => void) => {
      catalogEntityRegistry.init();

      bindProtocolAddRouteHandlers();
    };
  },
});

export default initRootFrameInjectable;
