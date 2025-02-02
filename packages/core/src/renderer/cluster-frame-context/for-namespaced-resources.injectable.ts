/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { ClusterContext } from "./cluster-frame-context";
import namespaceStoreInjectable from "../components/+namespaces/store.injectable";
import hostedClusterInjectable from "./hosted-cluster.injectable";

import { computed } from "mobx";

const clusterFrameContextForNamespacedResourcesInjectable = getInjectable({
  id: "cluster-frame-context-for-namespaced-resources",

  instantiate: (di): ClusterContext => {
    const cluster = di.inject(hostedClusterInjectable);
    const namespaceStore = di.inject(namespaceStoreInjectable);

    console.info(cluster, "This can only be injected within a cluster frame");

    const allNamespaces = computed(() => {
      // user given list of namespaces
      if (cluster.accessibleNamespaces.length) {
        return cluster.accessibleNamespaces.slice();
      }

      if (namespaceStore.items.length > 0) {
      // namespaces from kubernetes api
        return namespaceStore.items.map((namespace) => namespace.getName());
      }

      // fallback to cluster resolved namespaces because we could not load list
      return cluster.allowedNamespaces.slice();
    });
    const contextNamespaces = computed(() => namespaceStore.contextNamespaces);
    const hasSelectedAll = computed(() => {
      const namespaces = new Set(contextNamespaces.get());

      return allNamespaces.get().length > 1
      && cluster.accessibleNamespaces.length === 0
      && allNamespaces.get().every(ns => namespaces.has(ns));
    });

    return {
      isLoadingAll: (namespaces) => (
        allNamespaces.get().length > 1
        && cluster.accessibleNamespaces.length === 0
        && allNamespaces.get().every(ns => namespaces.includes(ns))
      ),
      isGlobalWatchEnabled: () => cluster.isGlobalWatchEnabled,
      get allNamespaces() {
        return allNamespaces.get();
      },
      get contextNamespaces() {
        return contextNamespaces.get();
      },
      get hasSelectedAll() {
        return hasSelectedAll.get();
      },
    };
  },
});

export default clusterFrameContextForNamespacedResourcesInjectable;
