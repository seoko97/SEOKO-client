import type { Meta, StoryObj } from "@storybook/react";

import UserMenu from "@components/ui/Menu/User/List";

const meta = {
  title: "Component/Menu/UserMenu",
  component: UserMenu,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UserMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "John Doe",
    signOut: () => {
      return;
    },
  },
};
