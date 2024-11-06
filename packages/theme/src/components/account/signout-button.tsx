import LogoutIcon from '@mui/icons-material/Logout';
import Button, { type ButtonProps } from '@mui/material/Button';

import { useAuthentication } from '../../providers/authentication-provider';
import { useLocaleText } from '../../providers/locale-provider';

export type SignOutButtonProps = ButtonProps;

export function SignOutButton(props: SignOutButtonProps) {
  const authentication = useAuthentication();
  const localeText = useLocaleText();

  return (
    <Button
      disableElevation
      disabled={!authentication}
      size="small"
      startIcon={<LogoutIcon />}
      sx={{
        '&:hover': {
          filter: 'opacity(1)',
        },
        filter: 'opacity(0.9)',
        fontWeight: 'normal',
        textTransform: 'capitalize',
        transition: 'filter 0.2s ease-in',
      }}
      variant="outlined"
      onClick={authentication?.signOut}
      {...props}
    >
      {localeText.signOutLabel}
    </Button>
  );
}
