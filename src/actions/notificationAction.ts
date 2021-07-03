import { NotificationInterface } from "../reducers/notificationReducer";

export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

type SetNotification = {
  readonly type: typeof SET_NOTIFICATION;
  readonly notification: NotificationInterface;
};

type HideNotification = {
  readonly type: typeof HIDE_NOTIFICATION;
};

export const setNotification = (
  notification: NotificationInterface
): SetNotification => ({
  type: SET_NOTIFICATION,
  notification,
});

export const hideNotification = (): HideNotification => ({
  type: HIDE_NOTIFICATION,
});

export type Notification = SetNotification | HideNotification;
