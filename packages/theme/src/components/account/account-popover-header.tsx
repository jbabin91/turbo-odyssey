import Stack, { type StackProps } from '@mui/material/Stack';

export type AccountPopoverHeaderProps = {
  children: React.ReactNode;
} & StackProps;

export function AccountPopoverHeader({
  children,
  ...props
}: AccountPopoverHeaderProps) {
  return <Stack {...props}>{children}</Stack>;
}
