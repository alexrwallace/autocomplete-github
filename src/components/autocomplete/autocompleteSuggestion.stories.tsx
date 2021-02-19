import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { AutoCompleteSuggestion } from './autocompleteSuggestion';

export default {
  title: 'AutoCompleteSuggestion',
  component: AutoCompleteSuggestion,
} as Meta;

const Template: Story = (args) => <AutoCompleteSuggestion {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    suggestion: null,
    searchTerm: null,
};

export const ShouldBoldSearchTerm = Template.bind({});
ShouldBoldSearchTerm.args = {
    suggestion: 'I am the suggestion',
    searchTerm: 'am',
};

export const ShouldBoldMultipleSearchTerm = Template.bind({});
ShouldBoldMultipleSearchTerm.args = {
    suggestion: 'I am the suggestion and I have multiple results',
    searchTerm: 'I',
};


