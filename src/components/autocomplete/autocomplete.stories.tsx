import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Autocomplete } from '../autocomplete/autocomplete';

const testData = require('../shared/testfile.json');
const testSuggestions = testData.map(data => data.title);

export default {
  title: 'Autocomplete',
  component: Autocomplete,
} as Meta;

const Template: Story = (args) => <Autocomplete {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    suggestions: [],
};

export const HasData = Template.bind({});
HasData.args = {
    suggestions: testSuggestions,
};

export const CallsOnChange = Template.bind({});
CallsOnChange.args = {
    suggestions: [],
    onChange: (text: string) =>{
        alert('called with:' + text)
    },
};

export const ItemClicked = Template.bind({});
ItemClicked.args = {
    suggestions: testSuggestions,
    onSelected: (selectedItem: any) =>{
        alert('item selected:' + JSON.stringify(selectedItem))
    },
};
