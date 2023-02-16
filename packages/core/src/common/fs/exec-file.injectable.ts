/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
// import type { ExecFileException, ExecFileOptions } from "child_process";
// import { execFile } from "child_process";
import type { AsyncResult } from "../utils/async-result";

// export type ExecFileError = ExecFileException & { stderr: string };

// export interface ExecFile {
//   (filePath: string): Promise<AsyncResult<string, ExecFileError>>;
//   (filePath: string, argsOrOptions: string[] | ExecFileOptions): Promise<AsyncResult<string, ExecFileError>>;
//   (filePath: string, args: string[], options: ExecFileOptions): Promise<AsyncResult<string, ExecFileError>>;
// }

const execFileInjectable = getInjectable({
  id: "exec-file",

  instantiate: () => {
   console.info(11);
  },

  causesSideEffects: true,
});

export default execFileInjectable;
