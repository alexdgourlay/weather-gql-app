import "styled-components";
import { baseTheme } from "./theme";

type Theme = typeof baseTheme;
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
