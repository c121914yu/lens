/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */



import packageInfo from "../package.json";
import path from "path"
export const isDevelopment = process.env.NODE_ENV !== "production";
export const mainDir = path.join(process.cwd(), "src", "main");
export const buildDir = path.join(process.cwd(), "static", "build");
export const extensionEntry = path.join(process.cwd(), "src", "extensions", "extension-api.ts");
export const extensionOutDir = path.join(process.cwd(), "packages", "extensions", "dist");
export const assetsFolderName = "assets";
export const rendererDir = path.join(process.cwd(), "src", "renderer");
export const appName = isDevelopment
  ? `${packageInfo.productName}Dev`
  : packageInfo.productName;
export const htmlTemplate = path.resolve(rendererDir, "template.html");
export const publicPath = "/build/";
export const sassCommonVars = path.resolve(rendererDir, "components/vars.scss");
export const webpackDevServerPort = Number(process.env.WEBPACK_DEV_SERVER_PORT) || 9191;

console.log(Number.isInteger(webpackDevServerPort), "WEBPACK_DEV_SERVER_PORT environment variable must only be an integer");
