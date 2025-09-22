import "@/styles/globals.css";
import { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize as mswInit, mswLoader } from "msw-storybook-addon";

mswInit({ onUnhandledRequest: "warn" });

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],

  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
