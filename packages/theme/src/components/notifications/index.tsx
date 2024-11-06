import { type ShowNotificationOptions } from '../../providers/notifications-provider';
import { Notification } from './notification';

export type NotificationQueueEntry = {
  notificationKey: string;
  options: ShowNotificationOptions;
  open: boolean;
  message: React.ReactNode;
};

export type NotificationsState = {
  queue: NotificationQueueEntry[];
};

export type NotificationsProps = {
  state: NotificationsState;
};

export function Notifications({ state }: NotificationsProps) {
  const currentNotification = state.queue[0] ?? null;

  return currentNotification ? (
    <Notification
      {...currentNotification}
      badge={state.queue.length > 1 ? String(state.queue.length) : null}
    />
  ) : null;
}
