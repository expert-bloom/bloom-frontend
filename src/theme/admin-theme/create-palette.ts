import { alpha } from '@mui/material/styles';
import { type PaletteOptions } from '@mui/material/styles/createPalette';

import {
  error,
  indigo,
  info,
  neutral,
  secondary,
  success,
  warning,
} from './colors';

export function createPalette() {
  const palette: PaletteOptions & { neutral: typeof neutral } = {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      // default: common.white,
      // paper: common.white,
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    primary: indigo,
    secondary,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };

  return palette;
}
