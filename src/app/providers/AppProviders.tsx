import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "../store";
import { theme } from "@/styles/theme";
import { GlobalStyles } from "@/styles/GlobalStyles";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Provider>
  );
};
