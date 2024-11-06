import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { createLink, useLocation } from '@tanstack/react-router';
import { Fragment, useCallback, useMemo, useState } from 'react';

import type { Navigation } from '../../../providers/navigation-provider';
import { getDrawerSxTransitionMixin } from '../../../utils/dashboard-utils';
import {
  getItemTitle,
  getPageItemFullPath,
  hasSelectedNavigationChildren,
  isPageItemSelected,
} from '../../../utils/navigation-utils';

const RouterLink = createLink(Link);

const NavigationListItemButton = styled(ListItemButton)(({ theme }) => ({
  '& .MuiAvatar-root': {
    backgroundColor: (theme.vars ?? theme).palette.action.active,
  },
  '& .MuiSvgIcon-root': {
    color: (theme.vars ?? theme).palette.action.active,
  },
  '&.Mui-selected': {
    '& .MuiAvatar-root': {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiListItemIcon-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiSvgIcon-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiTypography-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
  },
  borderRadius: 8,
}));

export type DashboardSidebarSubNavigationProps = {
  subNavigation: Navigation;
  basePath?: string;
  depth?: number;
  onLinkClick: () => void;
  isMini?: boolean;
  isFullyExpanded?: boolean;
  hasDrawerTransitions?: boolean;
  selectedItemId: string;
};

export function DashboardSidebarSubNavigation({
  subNavigation,
  basePath = '',
  depth = 0,
  onLinkClick,
  isMini = false,
  isFullyExpanded = true,
  hasDrawerTransitions = false,
  selectedItemId,
}: DashboardSidebarSubNavigationProps) {
  const location = useLocation();

  const pathname = location?.pathname ?? '/';

  const initialExpandedSidebarItemIds = useMemo(
    () =>
      subNavigation
        .map((navigationItem, navigationItemIndex) => ({
          navigationItem,
          originalIndex: navigationItemIndex,
        }))
        .filter(({ navigationItem }) =>
          hasSelectedNavigationChildren(navigationItem, basePath, pathname),
        )
        .map(({ originalIndex }) => `${depth}-${originalIndex}`),
    [basePath, depth, pathname, subNavigation],
  );

  const [expandedSidebarItemIds, setExpandedSidebarItemIds] = useState(
    initialExpandedSidebarItemIds,
  );

  const handleOpenFolderClick = useCallback(
    (itemId: string) => () => {
      setExpandedSidebarItemIds((previousValue) =>
        previousValue.includes(itemId)
          ? previousValue.filter(
              (previousValueItemId) => previousValueItemId !== itemId,
            )
          : [...previousValue, itemId],
      );
    },
    [],
  );

  return (
    <List sx={{ mb: depth === 0 ? 4 : 1, padding: 0, pl: 2 * depth }}>
      {subNavigation.map((navigationItem, navigationItemIndex) => {
        if (navigationItem.kind === 'header') {
          return (
            <ListSubheader
              key={`subheader-${depth}-${navigationItemIndex}`}
              component="div"
              sx={{
                fontSize: 12,
                fontWeight: '700',
                height: isMini ? 0 : 40,
                ...(hasDrawerTransitions
                  ? getDrawerSxTransitionMixin(isFullyExpanded, 'height')
                  : {}),
                overflow: 'hidden',
                px: 2,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                zIndex: 2,
              }}
            >
              {getItemTitle(navigationItem)}
            </ListSubheader>
          );
        }

        if (navigationItem.kind === 'divider') {
          const nextItem = subNavigation[navigationItemIndex + 1];

          return (
            <Divider
              key={`divider-${depth}-${navigationItemIndex}`}
              sx={{
                borderBottomWidth: 2,
                mb: nextItem?.kind === 'header' && !isMini ? 0 : 1,
                mt: 1,
                mx: 1,
                ...(hasDrawerTransitions
                  ? getDrawerSxTransitionMixin(isFullyExpanded, 'margin')
                  : {}),
              }}
            />
          );
        }

        const navigationItemFullPath = getPageItemFullPath(
          basePath,
          navigationItem,
        );
        const navigationItemId = `${depth}-${navigationItemIndex}`;
        const navigationItemTitle = getItemTitle(navigationItem);

        const isNestedNavigationExpanded =
          expandedSidebarItemIds.includes(navigationItemId);

        const nestedNavigationCollapseIcon = isNestedNavigationExpanded ? (
          <ExpandLessIcon />
        ) : (
          <ExpandMoreIcon />
        );

        const listItemIconSize = 34;

        const isSelected = isPageItemSelected(
          navigationItem,
          basePath,
          pathname,
        );

        if (
          process.env.NODE_ENV === 'production' &&
          isSelected &&
          selectedItemId
        ) {
          console.warn(
            `Duplicate selected path in navigation: ${navigationItemFullPath}`,
          );
        }

        if (isSelected && !selectedItemId) {
          selectedItemId = navigationItemId;
        }

        const listItem = (
          <ListItem
            sx={{
              my: 1,
              overflowX: 'hidden',
              px: 1,
              py: 0,
            }}
          >
            <NavigationListItemButton
              selected={isSelected && (!navigationItem.children || isMini)}
              sx={{
                height: 48,
                px: 1.4,
              }}
              {...(navigationItem.children && !isMini
                ? {
                    onClick: handleOpenFolderClick(navigationItemId),
                  }
                : {
                    LinkComponent: RouterLink,
                    onClick: onLinkClick,
                    to: navigationItemFullPath,
                  })}
            >
              {navigationItem.icon || isMini ? (
                <ListItemIcon
                  sx={{
                    minWidth: listItemIconSize,
                    mr: 1.2,
                  }}
                >
                  {navigationItem.icon ?? null}
                  {!navigationItem.icon && isMini ? (
                    <Avatar
                      sx={{
                        fontSize: 12,
                        height: listItemIconSize - 7,
                        ml: '-2px',
                        width: listItemIconSize - 7,
                      }}
                    >
                      {navigationItemTitle
                        .split(' ')
                        .slice(0, 2)
                        .map((itemTitleWord) =>
                          itemTitleWord.charAt(0).toUpperCase(),
                        )}
                    </Avatar>
                  ) : null}
                </ListItemIcon>
              ) : null}
              <ListItemText
                primary={navigationItemTitle}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: '500',
                  },
                  whiteSpace: 'nowrap',
                  zIndex: 1,
                }}
              />
              {navigationItem.action && !isMini && isFullyExpanded
                ? navigationItem.action
                : null}
              {navigationItem.children && !isMini && isFullyExpanded
                ? nestedNavigationCollapseIcon
                : null}
            </NavigationListItemButton>
          </ListItem>
        );

        return (
          <Fragment key={navigationItemId}>
            {isMini ? (
              <Tooltip placement="right" title={navigationItemTitle}>
                {listItem}
              </Tooltip>
            ) : (
              listItem
            )}

            {navigationItem.children && !isMini ? (
              <Collapse
                unmountOnExit
                in={isNestedNavigationExpanded}
                timeout="auto"
              >
                <DashboardSidebarSubNavigation
                  basePath={navigationItemFullPath}
                  depth={depth + 1}
                  selectedItemId={selectedItemId}
                  subNavigation={navigationItem.children}
                  onLinkClick={onLinkClick}
                />
              </Collapse>
            ) : null}
          </Fragment>
        );
      })}
    </List>
  );
}
