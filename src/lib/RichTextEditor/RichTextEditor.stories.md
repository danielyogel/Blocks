import React from 'react';
import { Meta, Story } from '@storybook/react';
import RichTextEditor from './index';

export default {
  component: RichTextEditor,
  title: 'Components/controls/RichTextEditor',
  argTypes: { onChange: { action: 'onChange' } },
  args: { value: '' }
} as Meta<React.ComponentProps<typeof RichTextEditor>>;

const Template: Story<React.ComponentProps<typeof RichTextEditor>> = args => <RichTextEditor {...args} />;

export const Height32 = Template.bind({});
Height32.args = { height: 'h-32' };

export const Height72 = Template.bind({});
Height72.args = { height: 'h-72' };

export const HeightAuto = Template.bind({});
HeightAuto.args = { height: 'h-auto' };
