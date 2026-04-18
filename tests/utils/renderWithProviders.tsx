import type { PropsWithChildren, ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ToastProvider } from "@/shared/ui";
import { createTestStore, type TestStore } from "./testStore";

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
  store?: TestStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  { route = "/", store = createTestStore(), ...options }: ExtendedRenderOptions = {},
) => {
  window.history.pushState({}, "Test", route);

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <GlobalStyles />
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};
