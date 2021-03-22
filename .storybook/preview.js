import {addDecorator} from "@storybook/react";
import {withThemesProvider} from "storybook-addon-styled-component-theme";
import {darkTheme, lightTheme} from "../src/themes";
import '../src/index.scss';

import {QueryClientProvider, QueryClient} from "react-query";
import {Router} from "react-router";
import React from "react";
import {createBrowserHistory} from "history";

const queryClient = new QueryClient();
const browserHistory = createBrowserHistory();

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
}

addDecorator(story => (
    <QueryClientProvider client={queryClient}>
      {story()}
    </QueryClientProvider>
  )
);


addDecorator(story => (
    <Router history={browserHistory}>
      <QueryClientProvider client={queryClient}>
        {story()}
      </QueryClientProvider>
    </Router>
  )
);

const themes = [lightTheme, darkTheme];
addDecorator(withThemesProvider(themes));
