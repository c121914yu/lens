/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { Logger } from "./logger";
import winstonLoggerInjectable from "./winston-logger.injectable";

const loggerInjectable = getInjectable({
  id: "logger",
  instantiate: (di): Logger => {
    return {
      debug: (message, ...data) => console.info(message, ...data),
      info: (message, ...data) => console.info(message, ...data),
      warn: (message, ...data) => console.warn(message, ...data),
      error: (message, ...data) => console.error(message, ...data),
      silly: (message, ...data) => console.info(message, ...data),
    };
  },
});

export default loggerInjectable;
