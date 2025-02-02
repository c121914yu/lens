/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { Cluster } from "../../common/cluster/cluster";
import directoryForTempInjectable from "../../common/app-paths/directory-for-temp/directory-for-temp.injectable";
import type { KubeconfigManagerDependencies } from "./kubeconfig-manager";
import { KubeconfigManager } from "./kubeconfig-manager";

import lensProxyPortInjectable from "../lens-proxy/lens-proxy-port.injectable";
import joinPathsInjectable from "../../common/path/join-paths.injectable";
import getDirnameOfPathInjectable from "../../common/path/get-dirname.injectable";
import pathExistsInjectable from "../../common/fs/path-exists.injectable";
import writeFileInjectable from "../../common/fs/write-file.injectable";
import removePathInjectable from "../../common/fs/remove.injectable";
import lensProxyCertificateInjectable from "../../common/certificate/lens-proxy-certificate.injectable";

export interface KubeConfigManagerInstantiationParameter {
  cluster: Cluster;
}

export type CreateKubeconfigManager = (cluster: Cluster) => KubeconfigManager;

const createKubeconfigManagerInjectable = getInjectable({
  id: "create-kubeconfig-manager",

  instantiate: (di): CreateKubeconfigManager => {
    const dependencies: KubeconfigManagerDependencies = {
      directoryForTemp: di.inject(directoryForTempInjectable),
      
      lensProxyPort: di.inject(lensProxyPortInjectable),
      joinPaths: di.inject(joinPathsInjectable),
      getDirnameOfPath: di.inject(getDirnameOfPathInjectable),
      removePath: di.inject(removePathInjectable),
      pathExists: di.inject(pathExistsInjectable),
      writeFile: di.inject(writeFileInjectable),
      certificate: di.inject(lensProxyCertificateInjectable).get(),
    };

    return (cluster) => new KubeconfigManager(dependencies, cluster);
  },
});

export default createKubeconfigManagerInjectable;
