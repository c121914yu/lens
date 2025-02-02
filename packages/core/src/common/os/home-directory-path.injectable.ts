/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import userInfoInjectable from "../user-store/user-info.injectable";

const homeDirectoryPathInjectable = getInjectable({
  id: "home-directory-path",
  instantiate: (di) => '/',
});

export default homeDirectoryPathInjectable;
