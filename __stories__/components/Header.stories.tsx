import type { Meta, StoryObj } from "@storybook/react";

import Header from "@components/ui/Header";

import { handlers } from "../../__tests__/common/handler";

const meta = {
  title: "Component/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [handlers.getUserFailed],
    },
  },
};

export const IsLogged: Story = {
  parameters: {
    msw: {
      handlers: [handlers.getUserSuccess],
    },
  },
};
