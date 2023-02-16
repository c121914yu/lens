/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";

export type GetConfigurationFileModel = <T extends object>(content: any) => any;

const getConfigurationFileModelInjectable = getInjectable({
  id: "get-configuration-file-model",
  instantiate: (): GetConfigurationFileModel => (content) => {},
  causesSideEffects: true,
});

export default getConfigurationFileModelInjectable;
