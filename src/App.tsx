import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

import HotOrCold from './components/HotOrCold';
import Measurements from './components/Measurements';
import Slider from './components/Slider';
import config from './spring-config';

const getRatio = (isIced: boolean) => (isIced ? 65 / 1000 : 60 / 1000);
const defaultCoffee = 25;

const MainWrapper = styled(animated.div)`
  @import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');

  perspective: 600px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  font-family: 'Lexend Exa', sans-serif;
  padding: 16px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
`;
const HOT = 'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)';
const COLD = 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)';
const App: React.FC = () => {
  const [isIced, setIsIced] = useState<boolean>(true);
  const [coffee, setCoffee] = useState<number>(defaultCoffee);
  const wrapperStyle = useSpring({ background: isIced ? COLD : HOT, config });
  const ratio = getRatio(isIced);
  useEffect(() => {
    const calculateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    const prevent = (e: TouchEvent) => {
      e.preventDefault();
      return false;
    };
    window.addEventListener('resize', calculateVH);
    document.body.addEventListener('touchstart', prevent);
    calculateVH();

    return () => {
      window.removeEventListener('resize', calculateVH);
      document.body.removeEventListener('touchmove', prevent);
    };
  }, []);
  return (
    <MainWrapper style={wrapperStyle}>
      <HotOrCold value={isIced} onChange={setIsIced} />
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', flex: 1, paddingTop: '32px' }}>
        <Measurements value={coffee} isIced={isIced} ratio={ratio} />
        <Slider value={coffee} onChange={setCoffee} ratio={ratio} />
      </div>
    </MainWrapper>
  );
};

export default App;
