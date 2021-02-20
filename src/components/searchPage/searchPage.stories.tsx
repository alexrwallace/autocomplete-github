import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SearchPage } from './searchPage';

const testData = require('../shared/testfile.json');
export default {
  title: 'SearchPage',
  component: SearchPage,
} as Meta;

const Template: Story = () => <SearchPage />;

export const Empty = Template.bind({});
