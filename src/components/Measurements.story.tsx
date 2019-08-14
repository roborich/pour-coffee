import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Measurements from './Measurements';

const Wrapper = () => {
  const [value, setValue] = useState<number>(25);
  return <Measurements value={value} onChange={setValue} ratio={1 / 15} />;
};

storiesOf('Measurements', module).add('default', () => <Wrapper />);
