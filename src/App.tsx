import React, { ChangeEvent, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

import HotOrCold from './components/HotOrCold';
import Measurements from './components/Measurements';
import config from './spring-config';

const getRatio = (isIced: boolean) => (isIced ? 65 / 1000 : 60 / 1000);
const defaultCoffee = 25;

const MainWrapper = styled(animated.div)`
  @import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');

  font-family: 'Lexend Exa', sans-serif;
  padding: 16px;
`;

const App: React.FC = () => {
  const [isIced, setIsIced] = useState<boolean>(true);
  const [coffee, setCoffee] = useState<number>(defaultCoffee);
  const wrapperStyle = useSpring({ backgroundColor: isIced ? 'rgba(123,223,242,1)' : 'rgba(255,59,29,1)', config });
  const ratio = getRatio(isIced);

  // const [coffee, setCoffee] = useState<number>(defaultCoffee);
  // const [water, setWater] = useState<number>(Math.round(defaultCoffee * ratio));
  // const [actualIce, setActualIce] = useState<number>(0);
  // const waterWithIce = Math.round(water * 0.6);
  // const ice = Math.round(water * 0.4);
  // const handleCoffeeChange: any = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
  //   setCoffee(Number(value));
  //   setWater(Math.round(Number(value) * ratio));
  // };
  // const handleWaterChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
  //   setCoffee(Math.round(Number(value) / ratio));
  //   setWater(Number(value));
  // };
  // const handleSwitch = () => {
  //   setWater(Math.round(coffee * getRatio(!isIced)));
  //   setIsIced(!isIced);
  // };
  // const handleActualIce = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
  //   setActualIce(Number(value));
  // };
  return (
    <MainWrapper style={wrapperStyle}>
      <HotOrCold value={isIced} onChange={setIsIced} />
      <Measurements value={coffee} onChange={setCoffee} ratio={ratio} />
    </MainWrapper>
  );
};

export default App;
