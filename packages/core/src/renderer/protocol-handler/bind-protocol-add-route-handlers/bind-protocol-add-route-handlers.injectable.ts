/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { bindProtocolAddRouteHandlers } from "./bind-protocol-add-route-handlers";
import lensProtocolRouterRendererInjectable from "../lens-protocol-router-renderer/lens-protocol-router-renderer.injectable";
import navigateToCatalogInjectable from "../../../common/front-end-routing/routes/catalog/navigate-to-catalog.injectable";
import navigateToAddClusterInjectable from "../../../common/front-end-routing/routes/add-cluster/navigate-to-add-cluster.injectable";
import navigateToEntitySettingsInjectable from "../../../common/front-end-routing/routes/entity-settings/navigate-to-entity-settings.injectable";
import navigateToClusterViewInjectable from "../../../common/front-end-routing/routes/cluster-view/navigate-to-cluster-view.injectable";
import catalogEntityRegistryInjectable from "../../api/catalog/entity/registry.injectable";

// TODO: Importing from features is not OK. Make protocol-router to comply with Open Closed Principle to allow moving implementation under a feature
import navigateToPreferencesInjectable from "../../../features/preferences/common/navigate-to-preferences.injectable";
import getClusterByIdInjectable from "../../../common/cluster-store/get-by-id.injectable";
import showShortInfoNotificationInjectable from "../../components/notifications/show-short-info.injectable";

const bindProtocolAddRouteHandlersInjectable = getInjectable({
  id: "bind-protocol-add-route-handlers",

  instantiate: (di) => bindProtocolAddRouteHandlers({
    lensProtocolRouterRenderer: di.inject(lensProtocolRouterRendererInjectable ),
    navigateToCatalog: di.inject(navigateToCatalogInjectable),
    navigateToAddCluster: di.inject(navigateToAddClusterInjectable),
    navigateToEntitySettings: di.inject(navigateToEntitySettingsInjectable),
    navigateToClusterView: di.inject(navigateToClusterViewInjectable),
    navigateToPreferences: di.inject(navigateToPreferencesInjectable),
    entityRegistry: di.inject(catalogEntityRegistryInjectable),
    getClusterById: di.inject(getClusterByIdInjectable),
    showShortInfoNotification: di.inject(showShortInfoNotificationInjectable),
  }),
});

export default bindProtocolAddRouteHandlersInjectable;
