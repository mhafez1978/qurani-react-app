import React from 'react';

import { SimpleHeaderTop } from './SimpleHeaderTop';

export default {
  title: 'Example/SimpleHeaderTop',
  component: SimpleHeaderTop,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <SimpleHeaderTop {...args} />;

export const appName = Template.bind({});
appName.args = 'Quraani';
