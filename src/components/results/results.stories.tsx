import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Results } from './results';

export default {
  title: 'Results',
  component: Results,
} as Meta;

const testData = require('../shared/testfile.json');
const Template: Story = (args) => <Results {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    results: [],
};

export const ShouldShowResults = Template.bind({});
ShouldShowResults.args = {
    results: testData,
};


