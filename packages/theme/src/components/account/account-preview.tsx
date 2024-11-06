import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar, { type AvatarProps } from '@mui/material/Avatar';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useLocaleText } from '../../providers/locale-provider';
import { useSession } from '../../providers/session-provider';

export type AccountPreviewVariant = 'condensed' | 'expanded';

export type AccountPreviewSlots = {
  /**
   * The component used for the Avatar
   * @default Avatar
   */
  avatar?: React.ElementType;
  /**
   * The component used for the overflow icon button in the expanded variant
   * @default IconButton
   */
  moreIconButton?: React.ElementType;
  /**
   * The component used for the avatar icon button in the condensed variant
   * @default IconButton
   */
  avatarIconButton?: React.ElementType;
};

export type AccountPreviewProps = {
  /**
   * The components used for each slot inside.
   */
  slots?: AccountPreviewSlots;
  /**
   * The props used for each slot inside.
   */
  slotProps?: {
    avatar?: AvatarProps;
    moreIconButton?: IconButtonProps;
    avatarIconButton?: IconButtonProps;
  };
  /**
   * The type of account details to display.
   * @property {'condensed'} condensed - Shows only the user's avatar.
   * @property {'expanded'} expanded - Displays the user's avatar, name, and email if available.
   * @default 'condensed'
   */
  variant?: AccountPreviewVariant;
  /**
   * The handler used when the preview is expanded
   */
  handleClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * The state of the Account popover
   * @default false
   */
  open?: boolean;
};

export function AccountPreview({
  variant = 'condensed',
  slots,
  slotProps,
  open,
  handleClick,
}: AccountPreviewProps) {
  const session = useSession();
  const localeText = useLocaleText();

  if (!session?.user) {
    return null;
  }

  const avatarContent = slots?.avatar ? (
    <slots.avatar />
  ) : (
    <Avatar
      alt={session.user?.name ?? session.user?.email ?? ''}
      src={session.user?.image ?? ''}
      sx={{
        height: variant === 'expanded' ? 48 : 32,
        width: variant === 'expanded' ? 48 : 32,
      }}
      {...slotProps?.avatar}
    />
  );

  if (variant === 'expanded') {
    return (
      <Stack
        direction="row"
        justifyContent="flex-start"
        padding={2}
        spacing={2}
      >
        {avatarContent}
        <Stack direction="column" justifyContent="space-evenly">
          <Typography noWrap fontWeight="bolder" variant="body2">
            {session.user?.name}
          </Typography>
          <Typography noWrap variant="caption">
            {session.user?.email}
          </Typography>
        </Stack>
        {handleClick &&
          (slots?.moreIconButton ? (
            <slots.moreIconButton />
          ) : (
            <IconButton
              size="small"
              onClick={handleClick}
              {...slotProps?.moreIconButton}
              sx={{ alignSelf: 'flex-start', ...slotProps?.moreIconButton?.sx }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          ))}
      </Stack>
    );
  }

  return (
    <Tooltip title={session.user.name ?? 'Account'}>
      {slots?.avatarIconButton ? (
        <slots.avatarIconButton />
      ) : (
        <IconButton
          aria-controls={open ? 'account-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          aria-label={localeText.iconButtonAriaLabel ?? 'Current User'}
          size="small"
          onClick={handleClick}
          {...slotProps?.avatarIconButton}
        >
          {avatarContent}
        </IconButton>
      )}
    </Tooltip>
  );
}
