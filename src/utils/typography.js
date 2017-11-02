import Typography from 'typography';
import theme from 'typography-theme-moraga';

theme.overrideThemeStyles = () => {
  return {
    // Color contrast correction https://dequeuniversity.com/rules/axe/2.2/color-contrast
    a: {
      color: `#185D8B`,
    },
    img: {
      position: `relative`,
      left: `50%`,
      transform: `translateX(-50%)`,
    },
    // code: {
    //   padding: `1px 3px`,
    //   fontFamily: `Inconsolata, monospace, sans-serif`,
    //   fontSize: `0.85em`,
    //   whiteSpace: `pre-wrap`,
    //   border: `#E3EDF3 1px solid`,
    //   background: `#F7FAFB`,
    //   borderRadius: `2px`,
    // },
    // '.gatsby-highlight code': {
    //   background: `inherit`,
    //   border: `none`,
    // },
  };
};

theme.baseFontSize = `22px`;
const typography = new Typography(theme);

module.exports = typography;
