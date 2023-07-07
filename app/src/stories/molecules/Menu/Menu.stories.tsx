import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import UserMenu from "@components/ui/molecules/Menu/User";
import PageMenu from "@components/ui/molecules/Menu/Page";

const Component = ({ username }: { username: string | null }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "1rem",
      }}
    >
      {username && <UserMenu username={username} />}
      <PageMenu username={username} />
    </div>
  );
};

const meta = {
  title: "Molecules/Menu",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Signin: Story = {
  args: {
    username: "John Doe",
  },
};

export const Signout: Story = {
  args: {
    username: null,
  },
};
