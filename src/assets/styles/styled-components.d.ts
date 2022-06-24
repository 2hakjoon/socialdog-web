import "styled-components";
import { CustomColorTypes, CustomLayoutTypes, Theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    color: CustomColorTypes
    layout: CustomLayoutTypes
  }
}