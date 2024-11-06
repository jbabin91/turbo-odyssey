import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled, type SxProps, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createLink } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useBranding } from '../../../providers/branding-provider';
import { useNavigation } from '../../../providers/navigation-provider';
import { type Theme } from '../../../theme';
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from '../../../utils/dashboard-utils';
import { Account, type AccountProps } from '../../account';
import { DashboardSidebarSubNavigation } from './dashboard-sidebar-subnavigation';
import { Logo } from './logo';
import { ThemeSwitcher } from './theme-switcher';
import { ToolbarActions } from './toolbar-actions';

const AppBar = styled(MUIAppBar)(({ theme }) => ({
  borderBottomWidth: 1,
  borderColor: (theme.vars ?? theme).palette.divider,
  borderStyle: 'solid',
  borderWidth: 0,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled('div')({
  '& img': {
    maxHeight: 40,
  },
  height: 40,
  position: 'relative',
});

const RouterLink = createLink(Link);

export type SidebarFooterProps = {
  mini: boolean;
};

export type DashboardLayoutSlotProps = {
  toolbarActions?: object;
  toolbarAccount?: AccountProps;
  sidebarFooter?: SidebarFooterProps;
};

export type DashboardLayoutSlots = {
  /**
   * The toolbar actions component used in the layout header.
   * @default ToolbarActions
   */
  toolbarActions?: React.JSXElementConstructor<object>;
  /**
   * The toolbar account component used in the layout header.
   * @default Account
   */
  toolbarAccount?: React.JSXElementConstructor<AccountProps>;
  /**
   * Optional footer component used in the layout sidebar.
   * @default null
   */
  sidebarFooter?: React.JSXElementConstructor<SidebarFooterProps>;
};

export type DashboardLayoutProps = {
  /**
   * The content of the dashboard.
   */
  children: React.ReactNode;
  /**
   * Whether the sidebar should not be collapsible to a mini variant in desktop and tablet viewports.
   * @default false
   */
  disableCollapsibleSidebar?: boolean;
  /**
   * Whether the sidebar should start collapsed in desktop size screens.
   * @default false
   */
  defaultSidebarCollapsed?: boolean;
  /**
   * Whether the navigation bar and menu icon should be hidden
   * @default false
   */
  hideNavigation?: boolean;
  /**
   * Width of the sidebar when expanded.
   * @default 320
   */
  sidebarExpandedWidth?: number | string;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: DashboardLayoutSlots;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: DashboardLayoutSlotProps;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
};

/**
 *
 * Demos:
 *
 * - [Dashboard Layout](https://mui.com/toolpad/core/react-dashboard-layout/)
 *
 * API:
 *
 * - [DashboardLayout API](https://mui.com/toolpad/core/api/dashboard-layout)
 */
export function DashboardLayout({
  children,
  disableCollapsibleSidebar = false,
  defaultSidebarCollapsed = false,
  hideNavigation = false,
  sidebarExpandedWidth = 320,
  slots,
  slotProps,
  sx,
}: DashboardLayoutProps) {
  const theme = useTheme<Theme>();
  const branding = useBranding();

  const navigation = useNavigation();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
    useState(!defaultSidebarCollapsed);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
    useState(false);

  const isUnderMdViewport = useMediaQuery(theme.breakpoints.down('md'));
  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));

  const isNavigationExpanded = isUnderMdViewport
    ? isMobileNavigationExpanded
    : isDesktopNavigationExpanded;

  const setIsNavigationExpanded = useCallback(
    (newExpanded: boolean) => {
      if (isUnderMdViewport) {
        setIsMobileNavigationExpanded(newExpanded);
      } else {
        setIsDesktopNavigationExpanded(newExpanded);
      }
    },
    [isUnderMdViewport],
  );

  const [isNavigationFullyExpanded, setIsNavigationFullyExpanded] =
    useState(isNavigationExpanded);

  useEffect(() => {
    if (isNavigationExpanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsNavigationFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsNavigationFullyExpanded(false);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [isNavigationExpanded, theme]);

  const selectedItemIdRef = useRef('');

  const handleSetNavigationExpanded = useCallback(
    (newExpanded: boolean) => () => {
      setIsNavigationExpanded(newExpanded);
    },
    [setIsNavigationExpanded],
  );

  const toggleNavigationExpanded = useCallback(() => {
    setIsNavigationExpanded(!isNavigationExpanded);
  }, [isNavigationExpanded, setIsNavigationExpanded]);

  const handleNavigationLinkClick = useCallback(() => {
    selectedItemIdRef.current = '';
    setIsMobileNavigationExpanded(false);
  }, [setIsMobileNavigationExpanded]);

  // If useEffect was used, the reset would also happen on the client render after SSR which we don't need
  useMemo(() => {
    if (navigation) {
      selectedItemIdRef.current = '';
    }
  }, [navigation]);

  const isDesktopMini =
    !disableCollapsibleSidebar && !isDesktopNavigationExpanded;
  const isMobileMini =
    !disableCollapsibleSidebar && !isMobileNavigationExpanded;

  const getMenuIcon = useCallback(
    (isExpanded: boolean) => {
      const expandMenuActionText = 'Expand';
      const collapseMenuActionText = 'Collapse';

      return (
        <Tooltip
          enterDelay={1000}
          title={`${isExpanded ? collapseMenuActionText : expandMenuActionText} menu`}
        >
          <div>
            <IconButton
              aria-label={`${isExpanded ? collapseMenuActionText : expandMenuActionText} navigation menu`}
              onClick={toggleNavigationExpanded}
            >
              {isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </Tooltip>
      );
    },
    [toggleNavigationExpanded],
  );

  const hasDrawerTransitions =
    isOverSmViewport && (disableCollapsibleSidebar || !isUnderMdViewport);

  const ToolbarActionsSlot = slots?.toolbarActions ?? ToolbarActions;
  const ToolbarAccountSlot = slots?.toolbarAccount ?? Account;
  const SidebarFooterSlot = slots?.sidebarFooter ?? null;

  const getDrawerContent = useCallback(
    (isMini: boolean, viewport: 'phone' | 'tablet' | 'desktop') => (
      <>
        <Toolbar />
        <Box
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          component="nav"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            overflow: 'auto',
            pt: navigation[0]?.kind === 'header' && !isMini ? 0 : 2,
            ...(hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isNavigationFullyExpanded, 'padding')
              : {}),
          }}
        >
          <DashboardSidebarSubNavigation
            hasDrawerTransitions={hasDrawerTransitions}
            isFullyExpanded={isNavigationFullyExpanded}
            isMini={isMini}
            selectedItemId={selectedItemIdRef.current}
            subNavigation={navigation}
            onLinkClick={handleNavigationLinkClick}
          />
          {SidebarFooterSlot ? (
            <SidebarFooterSlot mini={isMini} {...slotProps?.sidebarFooter} />
          ) : null}
        </Box>
      </>
    ),
    [
      SidebarFooterSlot,
      handleNavigationLinkClick,
      hasDrawerTransitions,
      isNavigationFullyExpanded,
      navigation,
      slotProps?.sidebarFooter,
    ],
  );

  const getDrawerSharedSx = useCallback(
    (isMini: boolean, isTemporary: boolean) => {
      const drawerWidth = isMini ? 64 : sidebarExpandedWidth;

      return {
        displayPrint: 'none',
        flexShrink: 0,
        width: drawerWidth,
        ...getDrawerWidthTransitionMixin(isNavigationExpanded),
        ...(isTemporary ? { position: 'absolute' } : {}),
        [`& .MuiDrawer-paper`]: {
          backgroundImage: 'none',
          boxSizing: 'border-box',
          position: 'absolute',
          width: drawerWidth,
          ...getDrawerWidthTransitionMixin(isNavigationExpanded),
        },
      };
    },
    [isNavigationExpanded, sidebarExpandedWidth],
  );

  const layoutRef = useRef<Element | null>(null);

  return (
    <Box
      ref={layoutRef}
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        width: '100vw',
        ...sx,
      }}
    >
      <AppBar color="inherit" position="absolute" sx={{ displayPrint: 'none' }}>
        <Toolbar
          sx={{ backgroundColor: 'inherit', mx: { sm: -1.5, xs: -0.75 } }}
        >
          {hideNavigation ? null : (
            <>
              <Box
                sx={{
                  display: { md: 'none' },
                  mr: { sm: disableCollapsibleSidebar ? 0 : 1 },
                }}
              >
                {getMenuIcon(isMobileNavigationExpanded)}
              </Box>
              <Box
                sx={{
                  display: {
                    md: disableCollapsibleSidebar ? 'none' : 'block',
                    xs: 'none',
                  },
                  mr: disableCollapsibleSidebar ? 0 : 1,
                }}
              >
                {getMenuIcon(isDesktopNavigationExpanded)}
              </Box>
            </>
          )}

          <Box
            sx={{
              left: { md: 'auto', xs: '50%' },
              position: { md: 'static', xs: 'absolute' },
              transform: { md: 'none', xs: 'translateX(-50%)' },
            }}
          >
            <RouterLink
              style={{ color: 'inherit', textDecoration: 'none' }}
              to="/"
            >
              <Stack alignItems="center" direction="row">
                <LogoContainer>
                  {branding?.logo ?? <Logo size={40} />}
                </LogoContainer>
                <Typography
                  sx={{
                    color: (theme.vars ?? theme).palette.primary.main,
                    fontWeight: '700',
                    ml: 0.5,
                    whiteSpace: 'nowrap',
                  }}
                  variant="h5"
                >
                  {branding?.title}
                </Typography>
              </Stack>
            </RouterLink>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1}>
            <ToolbarActionsSlot {...slotProps?.toolbarActions} />
            <ThemeSwitcher />
            <ToolbarAccountSlot {...slotProps?.toolbarAccount} />
          </Stack>
        </Toolbar>
      </AppBar>

      {hideNavigation ? null : (
        <>
          <Drawer
            container={layoutRef.current}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            open={isMobileNavigationExpanded}
            sx={{
              display: {
                md: 'none',
                sm: disableCollapsibleSidebar ? 'block' : 'none',
                xs: 'block',
              },
              ...getDrawerSharedSx(false, true),
            }}
            variant="temporary"
            onClose={handleSetNavigationExpanded(false)}
          >
            {getDrawerContent(false, 'phone')}
          </Drawer>
          <Drawer
            sx={{
              display: {
                md: 'none',
                sm: disableCollapsibleSidebar ? 'none' : 'block',
                xs: 'none',
              },
              ...getDrawerSharedSx(isMobileMini, false),
            }}
            variant="permanent"
          >
            {getDrawerContent(isMobileMini, 'tablet')}
          </Drawer>
          <Drawer
            sx={{
              display: { md: 'block', xs: 'none' },
              ...getDrawerSharedSx(isDesktopMini, false),
            }}
            variant="permanent"
          >
            {getDrawerContent(isDesktopMini, 'desktop')}
          </Drawer>
        </>
      )}

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
