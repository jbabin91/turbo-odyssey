import { type SnackbarProps } from '@mui/material/Snackbar';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  Notifications,
  type NotificationsState,
} from '../components/notifications';

type NotificationsContextValue = {
  show: ShowNotification;
  close: CloseNotification;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

let nextId = 0;
function generateId() {
  const id = nextId;
  nextId += 1;
  return id;
}

export type NotificationsProviderSlotProps = {
  snackbar: SnackbarProps;
};

export type NotificationsProviderSlots = {
  /**
   * The component that renders the snackbar.
   * @default Snackbar
   */
  snackbar: React.ElementType;
};

export type NotificationsProviderProps = {
  children?: React.ReactNode;
  slots?: Partial<NotificationsProviderSlots>;
  slotProps?: Partial<NotificationsProviderSlotProps>;
};

const RootPropsContext = createContext<NotificationsProviderProps | null>(null);

/**
 * Provider for Notifications. The subtree of this component can use the `useNotifications` hook to
 * access the notifications API. The notifications are shown in the same order they are requested.
 *
 * Demos:
 *
 * - [Sign-in Page](https://mui.com/toolpad/core/react-sign-in-page/)
 * - [useNotifications](https://mui.com/toolpad/core/react-use-notifications/)
 *
 * API:
 *
 * - [NotificationsProvider API](https://mui.com/toolpad/core/api/notifications-provider)
 */
export function NotificationsProvider(props: NotificationsProviderProps) {
  const { children } = props;
  const [state, setState] = useState<NotificationsState>({ queue: [] });

  const show = useCallback<ShowNotification>((message, options = {}) => {
    const notificationKey =
      options.key ?? `::toolpad-internal::notification::${generateId()}`;
    setState((prev) => {
      if (prev.queue.some((n) => n.notificationKey === notificationKey)) {
        // deduplicate by key
        return prev;
      }
      return {
        ...prev,
        queue: [
          ...prev.queue,
          { message, notificationKey, open: true, options },
        ],
      };
    });
    return notificationKey;
  }, []);

  const close = useCallback<CloseNotification>((key) => {
    setState((prev) => ({
      ...prev,
      queue: prev.queue.filter((n) => n.notificationKey !== key),
    }));
  }, []);

  const contextValue = useMemo(() => ({ close, show }), [show, close]);

  return (
    <RootPropsContext.Provider value={props}>
      <NotificationsContext.Provider value={contextValue}>
        {children}
        <Notifications state={state} />
      </NotificationsContext.Provider>
    </RootPropsContext.Provider>
  );
}

export type ShowNotificationOptions = {
  /**
   * The key to use for deduping notifications. If not provided, a unique key will be generated.
   */
  key?: string;
  /**
   * The severity of the notification. When provided, the snackbar will show an alert with the
   * specified severity.
   */
  severity?: 'info' | 'warning' | 'error' | 'success';
  /**
   * The duration in milliseconds after which the notification will automatically close.
   */
  autoHideDuration?: number;
  /**
   * The text to display on the action button.
   */
  actionText?: React.ReactNode;
  /**
   * The callback to call when the action button is clicked.
   */
  onAction?: () => void;
};

/**
 * Show a snackbar in the application.
 *
 * @param message The message to display in the snackbar.
 * @param options Options for the snackbar.
 * @returns The key that represents the notification. Useful for programmatically
 * closing it.
 */
type ShowNotification = (
  message: React.ReactNode,
  options?: ShowNotificationOptions,
) => string;

/**
 * Close a snackbar in the application.
 *
 * @param key The key of the notification to close.
 */
type CloseNotification = (key: string) => void;

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined || context === null) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider',
    );
  }
  return context;
}

export function useRootProps() {
  const context = useContext(RootPropsContext);
  return context;
}
