/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import React from "react";
import * as proto from "../../../common/protocol-handler";
import type { LensProtocolRouterDependencies } from "../../../common/protocol-handler";
import type { ShowNotification } from "../../components/notifications";

interface Dependencies extends LensProtocolRouterDependencies {
  showShortInfoNotification: ShowNotification;
  showErrorNotification: ShowNotification;
}

export class LensProtocolRouterRenderer extends proto.LensProtocolRouter {
  constructor(protected readonly dependencies: Dependencies) {
    super(dependencies);
  }
}
