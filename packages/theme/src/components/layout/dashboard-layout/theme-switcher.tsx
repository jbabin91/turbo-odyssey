import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { useColorScheme, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useCallback } from 'react';

import { type Theme } from '../../../theme';

export function ThemeSwitcher() {
  const theme = useTheme<Theme>();
  const { mode, setMode } = useColorScheme();
  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  return (
    <Tooltip
      enterDelay={1000}
      title={`${mode === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      <div>
        <IconButton
          aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          sx={{
            color: (theme.vars || theme).palette.primary.dark,
          }}
          onClick={toggleMode}
        >
          {theme.getColorSchemeSelector ? (
            <>
              <DarkModeIcon
                sx={{
                  display: 'inline',
                  [theme.getColorSchemeSelector('dark')]: {
                    display: 'none',
                  },
                }}
              />
              <LightModeIcon
                sx={{
                  display: 'none',
                  [theme.getColorSchemeSelector('dark')]: {
                    display: 'inline',
                  },
                }}
              />
            </>
          ) : (
            <>{mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}</>
          )}
        </IconButton>
      </div>
    </Tooltip>
  );
}
