import CloseIcon from '@mui/icons-material/Close';
import { type CloseReason } from '@mui/material';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import useSlotProps from '@mui/utils/useSlotProps';
import { useCallback } from 'react';

import {
  type ShowNotificationOptions,
  useNotifications,
  useRootProps,
} from '../../providers/notifications-provider';

const closeText = 'Close';

export type NotificationProps = {
  notificationKey: string;
  badge: string | null;
  open: boolean;
  message: React.ReactNode;
  options: ShowNotificationOptions;
};

export function Notification({
  notificationKey,
  open,
  message,
  options,
  badge,
}: NotificationProps) {
  const notification = useNotifications();

  const { severity, actionText, onAction, autoHideDuration } = options;

  const handleClose = useCallback(
    (_event: unknown, reason?: CloseReason | SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }
      notification?.close(notificationKey);
    },
    [notification, notificationKey],
  );

  const action = (
    <>
      {onAction ? (
        <Button color="inherit" size="small" onClick={onAction}>
          {actionText ?? 'Action'}
        </Button>
      ) : null}
      <IconButton
        aria-label={closeText}
        color="inherit"
        size="small"
        title={closeText}
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const props = useRootProps();
  const SnackbarComponent = props?.slots?.snackbar ?? Snackbar;
  const snackbarSlotProps = useSlotProps({
    additionalProps: {
      action,
      autoHideDuration,
      onClose: handleClose,
      open,
    },
    elementType: SnackbarComponent,
    externalSlotProps: props?.slotProps?.snackbar,
    ownerState: props,
  });

  return (
    <SnackbarComponent key={notificationKey} {...snackbarSlotProps}>
      <Badge badgeContent={badge} color="primary" sx={{ width: '100%' }}>
        {severity ? (
          <Alert action={action} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        ) : (
          <SnackbarContent action={action} message={message} />
        )}
      </Badge>
    </SnackbarComponent>
  );
}
