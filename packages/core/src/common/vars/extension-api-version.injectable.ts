/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import packageJson from "../../../package.json";

const extensionApiVersionInjectable = getInjectable({
  id: "extension-api-version",
  instantiate: () => {
    // const { major, minor, patch } = new SemVer(packageJson.version);

    return `1.0.0`;
  },
  causesSideEffects: true,
});

export default extensionApiVersionInjectable;
