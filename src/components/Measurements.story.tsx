import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Measurements from './Measurements';

const Wrapper = () => {
  return <Measurements value={25} isIced={true} iceRate={0.4} ratio={1 / 15} />;
};

storiesOf('Measurements', module).add('default', () => <Wrapper />);
