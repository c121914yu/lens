/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { when } from "mobx";
import loggerInjectable from "../../../../common/logger.injectable";
import { TerminalChannels } from "../../../../common/terminal/channels";
import { waitUntilDefined } from "../../../../common/utils/wait";
import { noop } from "../../../utils";
import showSuccessNotificationInjectable from "../../notifications/show-success-notification.injectable";
import selectDockTabInjectable from "../dock/select-dock-tab.injectable";
import type { TabId } from "../dock/store";
import createTerminalTabInjectable from "./create-terminal-tab.injectable";
import getTerminalApiInjectable from "./get-terminal-api.injectable";

export interface SendCommandOptions {
  /**
   * Emit an enter after the command
   */
  enter?: boolean;

  /**
   * @deprecated This option is ignored and infered to be `true` if `tabId` is not provided
   */
  newTab?: any;

  /**
   * Specify a specific terminal tab to send this command to
   */
  tabId?: TabId;
}

export type SendCommand = (command: string, options?: SendCommandOptions) => Promise<void>;

const sendCommandInjectable = getInjectable({
  id: "send-command",

  instantiate: (di): SendCommand => {
    const createTerminalTab = di.inject(createTerminalTabInjectable);
    const selectTab = di.inject(selectDockTabInjectable);
    const getTerminalApi = di.inject(getTerminalApiInjectable);
    const showSuccessNotification = di.inject(showSuccessNotificationInjectable);
    const logger = console.info;

    return async (command: string, options: SendCommandOptions = {}): Promise<void> => {
      let tabId: string | undefined = options.tabId;

      if (tabId) {
        selectTab(tabId);
      } else {
        tabId = createTerminalTab().id;
      }

      const terminalApi = await waitUntilDefined(() => (
        tabId
          ? getTerminalApi(tabId)
          : undefined
      ));
      const shellIsReady = when(() => terminalApi.isReady);
      const notifyVeryLong = setTimeout(() => {
        shellIsReady.cancel();
        showSuccessNotification(
          "If terminal shell is not ready please check your shell init files, if applicable.",
          {
            timeout: 4_000,
          },
        );
      }, 10_000);

      await shellIsReady.catch(noop);
      clearTimeout(notifyVeryLong);

      if (terminalApi) {
        if (options.enter) {
          command += "\r";
        }

        terminalApi.sendMessage({
          type: TerminalChannels.STDIN,
          data: command,
        });
      } else {
        logger.warn(
          "The selected tab is does not have a connection. Cannot send command.",
          { tabId, command },
        );
      }
    };
  },
});

export default sendCommandInjectable;
