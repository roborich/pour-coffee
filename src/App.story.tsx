import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import App from './App';

const Wrapper = () => {
  return <App />;
};

storiesOf('App', module).add('App', () => <Wrapper />);
