/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import extensionLoaderInjectable from "../../../extensions/extension-loader/extension-loader.injectable";
import { LensProtocolRouterMain } from "./lens-protocol-router-main";
import extensionsStoreInjectable from "../../../extensions/extensions-store/extensions-store.injectable";
import showApplicationWindowInjectable from "../../start-main-application/lens-window/show-application-window.injectable";
import broadcastMessageInjectable from "../../../common/ipc/broadcast-message.injectable";
import loggerInjectable from "../../../common/logger.injectable";

const lensProtocolRouterMainInjectable = getInjectable({
  id: "lens-protocol-router-main",

  instantiate: (di) =>
    new LensProtocolRouterMain({
      extensionLoader: di.inject(extensionLoaderInjectable),
      extensionsStore: di.inject(extensionsStoreInjectable),
      showApplicationWindow: di.inject(showApplicationWindowInjectable),
      broadcastMessage: di.inject(broadcastMessageInjectable),
      
    }),
});

export default lensProtocolRouterMainInjectable;
