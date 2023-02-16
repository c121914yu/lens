/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { reaction } from "mobx";
import { currentClusterMessageChannel } from "../../../common/cluster/current-cluster-channel";
import { sendMessageToChannelInjectionToken } from "../../../common/utils/channel/message-to-channel-injection-token";
import matchedClusterIdInjectable from "../../navigation/matched-cluster-id.injectable";
import { beforeMainFrameStartsFirstInjectionToken } from "../tokens";

const setupCurrentClusterBroadcastInjectable = getInjectable({
  id: "setup-current-cluster-broadcast",
  instantiate: (di) => ({
    id: "setup-current-cluster-broadcast",
    run: () => {
      const matchedClusterId = di.inject(matchedClusterIdInjectable);

      reaction(
        () => matchedClusterId.get(),
        clusterId => {},
        {
          fireImmediately: true,
        },
      );
    },
  }),
  injectionToken: beforeMainFrameStartsFirstInjectionToken,
});

export default setupCurrentClusterBroadcastInjectable;
