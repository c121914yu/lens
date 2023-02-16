/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import React from "react";
import type { LensProtocolRouterRenderer } from "../lens-protocol-router-renderer/lens-protocol-router-renderer";
import type { CatalogEntityRegistry } from "../../api/catalog/entity/registry";
import type { ShowNotification } from "../../components/notifications";
import type { NavigateToCatalog } from "../../../common/front-end-routing/routes/catalog/navigate-to-catalog.injectable";
import type { NavigateToEntitySettings } from "../../../common/front-end-routing/routes/entity-settings/navigate-to-entity-settings.injectable";
import type { NavigateToClusterView } from "../../../common/front-end-routing/routes/cluster-view/navigate-to-cluster-view.injectable";

import type { AttemptInstallByInfo } from "../../components/+extensions/attempt-install-by-info.injectable";
import type { GetClusterById } from "../../../common/cluster-store/get-by-id.injectable";

interface Dependencies {
  lensProtocolRouterRenderer: LensProtocolRouterRenderer;
  navigateToCatalog: NavigateToCatalog;
  navigateToAddCluster: () => void;
  navigateToEntitySettings: NavigateToEntitySettings;
  navigateToClusterView: NavigateToClusterView;
  navigateToPreferences: (tabId: string) => void;
  entityRegistry: CatalogEntityRegistry;
  getClusterById: GetClusterById;
  showShortInfoNotification: ShowNotification;
}

export const bindProtocolAddRouteHandlers = ({
  lensProtocolRouterRenderer,
  navigateToCatalog,
  navigateToAddCluster,
  navigateToEntitySettings,
  navigateToClusterView,
  navigateToPreferences,
  entityRegistry,
  getClusterById,
  showShortInfoNotification,
}: Dependencies) => () => {
  lensProtocolRouterRenderer
    .addInternalHandler("/preferences", ({ search: { highlight: tabId }}) => {
      if (tabId) {
        navigateToPreferences(tabId);
      }
    })
    .addInternalHandler("/", ({ tail }) => {
      if (tail) {
        showShortInfoNotification(
          <p>
            {"Unknown Action for "}
            <code>
              lens://app/
              {tail}
            </code>
            . Are you on the latest version?
          </p>,
        );
      }

      navigateToCatalog();
    })
    .addInternalHandler("/landing", () => {
      navigateToCatalog();
    })
    .addInternalHandler("/landing/view/:group/:kind", ({ pathname: { group, kind }}) => {
      navigateToCatalog({ group, kind });
    })
    .addInternalHandler("/cluster", () => {
      navigateToAddCluster();
    })
    .addInternalHandler("/entity/:entityId/settings", ({ pathname: { entityId }}) => {
      console.info(entityId);
      const entity = entityRegistry.getById(entityId);

      if (entity) {
        navigateToEntitySettings(entityId);
      } else {
        showShortInfoNotification(
          <p>
            {"Unknown catalog entity "}
            <code>{entityId}</code>
            .
          </p>,
        );
      }
    })
    // Handlers below are deprecated and only kept for backward compact purposes
    .addInternalHandler("/cluster/:clusterId", ({ pathname: { clusterId }}) => {
      console.info(clusterId);
      const cluster = getClusterById(clusterId);

      if (cluster) {
        navigateToClusterView(clusterId);
      } else {
        showShortInfoNotification(
          <p>
            {"Unknown catalog entity "}
            <code>{clusterId}</code>
            .
          </p>,
        );
      }
    })
    .addInternalHandler("/cluster/:clusterId/settings", ({ pathname: { clusterId }}) => {
      console.info(clusterId);
      const cluster = getClusterById(clusterId);

      if (cluster) {
        navigateToEntitySettings(clusterId);
      } else {
        showShortInfoNotification(
          <p>
            {"Unknown catalog entity "}
            <code>{clusterId}</code>
            .
          </p>,
        );
      }
    })
};
