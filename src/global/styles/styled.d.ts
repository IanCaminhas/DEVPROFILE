import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  //DefaultTheme é do styled-components e estou fazendo um override dele
  export interface DefaultTheme extends ThemeType {}
}
