/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./components/app.scss";

import React from "react";
import { DefaultProps } from "./mui-base-theme";
import { render, unmountComponentAtNode } from "react-dom";
import { DiContextProvider } from "@ogre-tools/injectable-react";
import type { DiContainer } from "@ogre-tools/injectable";
import initRootFrameInjectable from "./frames/root-frame/init-root-frame.injectable";
// import initClusterFrameInjectable from "./frames/cluster-frame/init-cluster-frame/init-cluster-frame.injectable";
import { Router } from "react-router";
import historyInjectable from "./navigation/history.injectable";
import startFrameInjectable from "./start-frame/start-frame.injectable";

export async function bootstrap(di: DiContainer) {
  const startFrame = di.inject(startFrameInjectable);
  await startFrame();

  const rootElem = document.getElementById("app");

  if(!rootElem) return

  let App = (await import("./frames/root-frame/root-frame")).RootFrame;
  let initializeApp = di.inject(initRootFrameInjectable);


  await initializeApp(() => {
    unmountComponentAtNode(rootElem);
  });

  const history = di.inject(historyInjectable);

  render(
    <DiContextProvider value={{ di }}>
      <Router history={history}>
        {DefaultProps(App)}
      </Router>
    </DiContextProvider>,
    rootElem,
  );
}
