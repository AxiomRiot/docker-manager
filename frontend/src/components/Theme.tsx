import React from 'react';
import { ThemeProvider } from 'styled-components';

const colors = {
  brillantBlue: '#119DA4',
  peach: '#F7C59F',
  yaleBlue: '#043565',
  savoyBlue: '#5158BB',
  pistachioGreen: '#99D17B',
  olivineGreen: '#95BF8F',
};

const tailwind_palette = {
  blue_900: 'oklch(37.9% 0.146 265.522)',
};

const theme = {
  colors,
  tailwind_palette,
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
  },
  navBarColor: 'oklch(52% 0.105 223.128)',
  sideBarColor: '#E7E5E4',
  buttonColor: colors.savoyBlue,
  buttonColorHover: colors.yaleBlue,
  submitButtonColor: colors.pistachioGreen,
  submitButtonColorHover: colors.olivineGreen,
  servingButtonColor: '#E7E5E4',
  timelineInputColor: '#CA5310',
  timelineButtonColor: 'oklch(62.3% 0.214 259.815)',
  timelineAddToTimeline: 'oklch(72.3% 0.219 149.579)',
};

export function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
