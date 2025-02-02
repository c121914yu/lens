/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { loggerTransportInjectionToken } from "../../common/logger/transports";

const browserLoggerTransportInjectable = getInjectable({
  id: "browser-logger-transport",
  instantiate: () => new BrowserConsole(),
  injectionToken: loggerTransportInjectionToken,
});

export default browserLoggerTransportInjectable;
