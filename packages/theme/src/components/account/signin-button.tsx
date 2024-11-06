import Button, { type ButtonProps } from '@mui/material/Button';

import { useAuthentication } from '../../providers/authentication-provider';
import { useLocaleText } from '../../providers/locale-provider';

export type SignInButtonProps = ButtonProps;

export function SignInButton(props: SignInButtonProps) {
  const authentication = useAuthentication();
  const localeText = useLocaleText();

  return (
    <Button
      disableElevation
      size="small"
      sx={{
        '&:hover': {
          filter: 'opacity(1)',
        },
        filter: 'opacity(0.9)',
        textTransform: 'capitalize',
        transition: 'filter 0.2s ease-in',
      }}
      variant="contained"
      onClick={authentication?.signIn}
      {...props}
    >
      {localeText?.signInLabel ?? 'Sign In'}
    </Button>
  );
}
