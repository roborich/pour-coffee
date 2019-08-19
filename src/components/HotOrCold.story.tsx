import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import HotOrCold from './HotOrCold';

const Wrapper = ({ startIced = false }) => {
  const [isIced, setIced] = useState<boolean>(startIced);
  return <HotOrCold value={isIced} onChange={setIced} />;
};

storiesOf('Hot Or Iced', module)
  .add('Iced', () => <Wrapper startIced />)
  .add('Hot', () => <Wrapper />);
