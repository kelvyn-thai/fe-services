// button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/testing-library";
import { Button } from "@button/index";
import { useState } from "react";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Click Me",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "base-btn",
      "base-btn--default",
      "base-btn--default",
    );
  },
};

export const CustomClassName: Story = {
  args: {
    className: "custom-class",
    children: "Custom",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  },
};

export const DestructiveVariant: Story = {
  args: {
    variant: "destructive",
    children: "Danger",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /danger/i });
    expect(button).toHaveClass("base-btn--destructive");
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /large/i });
    expect(button).toHaveClass("base-btn--lg");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  },
};

export const ClickHandlerExample: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <Button onClick={() => setCount((c) => c + 1)}>Clicked {count}</Button>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    expect(button).toHaveTextContent("Clicked 0");

    await userEvent.click(button);

    expect(button).toHaveTextContent("Clicked 1");
  },
};
