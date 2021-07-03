import { colors } from "../consts/colors";
import {
  HIDE_NOTIFICATION,
  SET_NOTIFICATION,
} from "../actions/notificationAction";

export interface NotificationInterface {
  text: string;
  color: string;
}

export type NotificationState = {
  notification: NotificationInterface;
  visible: boolean;
};

export type Action = {
  type: string;
  notification: NotificationInterface;
};

export const notificationInitialState: NotificationState = {
  notification: {
    text: "",
    color: colors.white,
  },
  visible: false,
};

export const notificationReducer = (
  state = notificationInitialState,
  action: Action
) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { ...state, notification: action.notification, visible: true };
    case HIDE_NOTIFICATION:
      return { ...notificationInitialState };
    default:
      return state;
  }
};
