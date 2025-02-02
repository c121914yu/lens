/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import type { DiContainer } from "@ogre-tools/injectable";

const legacyGlobalDis = new Map<Environments, DiContainer>();

export enum Environments {
  renderer,
  main,
}

export const setLegacyGlobalDiForExtensionApi = (
  di: DiContainer,
  environment: Environments,
) => {
  legacyGlobalDis.set(environment, di);
};

export const getLegacyGlobalDiForExtensionApi = () => {
  if (legacyGlobalDis.size > 1) {
    throw new Error("Tried to get DI container using legacy globals where there is multiple containers available.");
  }

  const [di] = [...legacyGlobalDis.values()];
console.log(legacyGlobalDis.values(),'====');
  if (!di) {
    throw new Error("Tried to get DI container using legacy globals where there is no containers available.");
  }

  return di;
};

export function getEnvironmentSpecificLegacyGlobalDiForExtensionApi(environment: Environments) {
  const di = legacyGlobalDis.get(environment);

  if (!di) {
    throw new Error("Tried to get DI container using legacy globals in environment which doesn't exist");
  }

  return di;
}
