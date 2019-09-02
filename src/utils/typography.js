const Typography = require('typography');
const theme = require('typography-theme-moraga');

theme.overrideThemeStyles = () => ({
  // Color contrast correction https://dequeuniversity.com/rules/axe/2.2/color-contrast
  a: {
    color: `#185D8B`,
  },
  img: {
    position: `relative`,
    left: `50%`,
    transform: `translateX(-50%)`,
  },
});

theme.baseFontSize = `22px`;
const typography = new Typography(theme);

module.exports = typography;
