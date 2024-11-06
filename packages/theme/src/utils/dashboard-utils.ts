import { type Theme } from '@mui/material';

export function getDrawerSxTransitionMixin(
  isExpanded: boolean,
  property: string,
) {
  return {
    transition: (theme: Theme) =>
      theme.transitions.create(property, {
        duration: isExpanded
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
  };
}

export function getDrawerWidthTransitionMixin(isExpanded: boolean) {
  return {
    ...getDrawerSxTransitionMixin(isExpanded, 'width'),
    overflowX: 'hidden',
  };
}
