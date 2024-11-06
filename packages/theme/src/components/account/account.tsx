import type Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { useAuthentication } from '../../providers/authentication-provider';
import { useSession } from '../../providers/session-provider';
import { AccountPopoverFooter } from './account-popover-footer';
import { AccountPopoverHeader } from './account-popover-header';
import { AccountPreview, type AccountPreviewProps } from './account-preview';
import { SignInButton } from './signin-button';
import { SignOutButton } from './signout-button';

export type AccountSlots = {
  /**
   * The component used for the account preview
   * @default AccountPreview
   */
  preview?: React.ElementType;
  /**
   * The component used for the account popover menu
   * @default Popover
   */
  popover?: React.ElementType;
  /**
   * The component used for the content of account popover
   * @default Stack
   */
  popoverContent?: React.ElementType;
  /**
   * The component used for the sign in button.
   * @default Button
   */
  signInButton?: React.ElementType;
  /**
   * The component used for the sign out button.
   * @default Button
   */
  signOutButton?: React.ElementType;
};

export type AccountProps = {
  /**
   * The components used for each slot inside.
   */
  slots?: AccountSlots;
  /**
   * The props used for each slot inside.
   */
  slotProps?: {
    preview?: AccountPreviewProps;
    popover?: React.ComponentProps<typeof Popover>;
    popoverContent?: React.ComponentProps<typeof Stack>;
    signInButton?: React.ComponentProps<typeof SignInButton>;
    signOutButton?: React.ComponentProps<typeof Button>;
  };
};

export function Account({ slots, slotProps }: AccountProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const session = useSession();
  const authentication = useAuthentication();
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  if (!authentication) {
    return null;
  }

  if (!session?.user) {
    return (
      <>
        {slots?.signInButton ? (
          <slots.signInButton onClick={authentication.signIn} />
        ) : (
          <SignInButton {...slotProps?.signInButton} />
        )}
      </>
    );
  }

  return (
    <>
      {slots?.preview ? (
        <slots.preview handleClick={handleClick} open={open} />
      ) : (
        <AccountPreview
          handleClick={handleClick}
          open={open}
          variant="condensed"
          {...slotProps?.preview}
        />
      )}
      {slots?.popover ? (
        <slots.popover {...slotProps?.popover} />
      ) : (
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          id="account-menu"
          open={open}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          onClick={handleClose}
          onClose={handleClose}
          {...slotProps?.popover}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                '&::before': {
                  bgcolor: 'background.paper',
                  content: '""',
                  display: 'block',
                  height: 10,
                  position: 'absolute',
                  right: 14,
                  top: 0,
                  transform: 'translateY(-50%) rotate(45deg)',
                  width: 10,
                  zIndex: 0,
                },
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1,
                overflow: 'visible',
              },
            },
            ...slotProps?.popover?.slotProps,
          }}
        >
          {slots?.popoverContent ? (
            <slots.popoverContent {...slotProps?.popoverContent} />
          ) : (
            <Stack direction="column" {...slotProps?.popoverContent}>
              <AccountPopoverHeader>
                <AccountPreview variant="expanded" />
              </AccountPopoverHeader>
              <Divider />
              <AccountPopoverFooter>
                <SignOutButton {...slotProps?.signOutButton} />
              </AccountPopoverFooter>
            </Stack>
          )}
        </Popover>
      )}
    </>
  );
}
