import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Slider from './Slider';

const Wrapper = () => {
  const [value, setValue] = useState<number>(25);
  return <Slider value={value} onChange={setValue} ratio={1 / 15} />;
};

storiesOf('Slider', module).add('default', () => <Wrapper />);
