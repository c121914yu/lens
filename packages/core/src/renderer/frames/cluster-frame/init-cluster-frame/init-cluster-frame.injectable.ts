/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { initClusterFrame } from "./init-cluster-frame";
import catalogEntityRegistryInjectable from "../../../api/catalog/entity/registry.injectable";
import frameRoutingIdInjectable from "./frame-routing-id/frame-routing-id.injectable";
import hostedClusterInjectable from "../../../cluster-frame-context/hosted-cluster.injectable";

import emitAppEventInjectable from "../../../../common/app-event-bus/emit-event.injectable";
import loadExtensionsInjectable from "../../load-extensions.injectable";
import loggerInjectable from "../../../../common/logger.injectable";
import showErrorNotificationInjectable from "../../../components/notifications/show-error-notification.injectable";
import closeRendererLogFileInjectable from "../../../logger/close-renderer-log-file.injectable";

const initClusterFrameInjectable = getInjectable({
  id: "init-cluster-frame",

  instantiate: (di) => {
    const hostedCluster = di.inject(hostedClusterInjectable);

    console.info(hostedCluster, "This can only be injected within a cluster frame");

    return initClusterFrame({
      hostedCluster,
      loadExtensions: di.inject(loadExtensionsInjectable),
      catalogEntityRegistry: di.inject(catalogEntityRegistryInjectable),
      frameRoutingId: di.inject(frameRoutingIdInjectable),
      emitAppEvent: di.inject(emitAppEventInjectable),
      
      showErrorNotification: di.inject(showErrorNotificationInjectable),
      closeFileLogging: di.inject(closeRendererLogFileInjectable),
    });
  },
});

export default initClusterFrameInjectable;
