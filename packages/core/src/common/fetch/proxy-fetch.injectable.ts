/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import userStoreInjectable from "../user-store/user-store.injectable";
import type { Fetch } from "./fetch.injectable";
import fetchInjectable from "./fetch.injectable";

const proxyFetchInjectable = getInjectable({
  id: "proxy-fetch",
  instantiate: (di): Fetch => {
    const fetch = di.inject(fetchInjectable);
    const { httpsProxy, allowUntrustedCAs } = di.inject(userStoreInjectable);
    const agent = httpsProxy
      ? new HttpsProxyAgent({
        proxy: httpsProxy,
        rejectUnauthorized: !allowUntrustedCAs,
      })
      : undefined;

    return (url, init = {}) => fetch(url, {
      agent,
      ...init,
    });
  },
});

export default proxyFetchInjectable;
