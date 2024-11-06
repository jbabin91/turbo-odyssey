import Box, { type BoxProps } from '@mui/material/Box';

export type AccountPopoverFooterProps = {
  children: React.ReactNode;
} & BoxProps;

export function AccountPopoverFooter({
  children,
  sx,
  ...props
}: AccountPopoverFooterProps) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        p: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
