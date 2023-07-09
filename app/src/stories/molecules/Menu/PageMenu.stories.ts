import type { Meta, StoryObj } from "@storybook/react";

import PageMenu from "@components/ui/molecules/Menu/Page/List";

const meta = {
  title: "Molecules/Menu/PageMenu",
  component: PageMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    isSign: true,
  },
};

export const Logout: Story = {
  args: {
    isSign: false,
  },
};
