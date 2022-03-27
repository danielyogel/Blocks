import React from 'react';
import { configure } from 'mobx';
import { Meta, Story } from '@storybook/react/types-6-0';

configure({ enforceActions: 'never' });

const View = () => {
  return <div>laal</div>;
};

export default {
  title: 'KnowlegeEditor',
  component: View
} as Meta;

const Template: Story<{}> = args => <View {...args} />;

export const KnowlegeEditor = Template.bind({});
