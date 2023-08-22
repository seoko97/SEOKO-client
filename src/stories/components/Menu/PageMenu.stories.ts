import type { Meta, StoryObj } from "@storybook/react";
import PageMenu from "@components/ui/Menu/Page/List";

const meta = {
  title: "Component/Menu/PageMenu",
  component: PageMenu,
  parameters: {
    layout: "centered",
  },
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
