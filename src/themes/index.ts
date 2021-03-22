import {DefaultTheme} from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
  }
}

export const lightTheme: DefaultTheme = {
  name: 'Light Theme',
  backgroundColor: "#fff",
  primaryColor: "#333",
  secondaryColor: "#666",
};

export const darkTheme: DefaultTheme = {
  name: 'Dark Theme',
  backgroundColor: "#333",
  primaryColor: "#fff",
  secondaryColor: "#cacaca",
};
