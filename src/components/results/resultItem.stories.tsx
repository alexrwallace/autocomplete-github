import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ResultItem } from './resultItem';

const testData = require('../shared/testfile.json');
export default {
  title: 'ResultItem',
  component: ResultItem,
} as Meta;

const Template: Story = (args) => <ResultItem {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    result: null,
};

export const ShoudlSetStatusIconToOpen = Template.bind({});
const openData = { ...testData[0], state: 'open' }
ShoudlSetStatusIconToOpen.args = {
    result: openData,
};

export const ShoudlSetStatusIconToClosed = Template.bind({});
const closedData = { ...testData[0], state: 'closed' }
ShoudlSetStatusIconToClosed.args = {
    result: closedData,
};

export const ShoudlSetStatusIconToUnknown = Template.bind({});
const unknownData = { ...testData[0], state: '' }
ShoudlSetStatusIconToUnknown.args = {
    result: unknownData,
};