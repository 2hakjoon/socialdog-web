import "styled-components";
import { Theme, theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}