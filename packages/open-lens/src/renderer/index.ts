// @ts-nocheck

import "@k8slens/core/styles";
import { createContainer } from "@ogre-tools/injectable";
import { runInAction } from "mobx";
import { createApp, rendererExtensionApi as Renderer, commonExtensionApi as Common } from "@k8slens/core/renderer";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";

const di = createContainer("renderer");
const app = createApp({
  di,
  mode: process.env.NODE_ENV || "development"
});

runInAction(() => {
  autoRegister({
    di,
    requireContexts: [
      require.context("./", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
      require.context("../common", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
    ],
  });
});

app.start();

