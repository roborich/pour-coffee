import React, { FC } from 'react';
import FullHeight from 'react-div-100vh';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

import HotOrCold from './components/HotOrCold';
import Measurements from './components/Measurements';
import { Settings } from './components/Settings';
import Slider from './components/Slider';
import { useCentralState } from './hooks/useCentralState';
import config from './spring-config';
import { PourOverType } from './state';

const isIced = (type: PourOverType) => type === PourOverType.Iced;

const MainWrapper = styled(animated(FullHeight))`
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

const App: FC = () => {
  const [state, patchState] = useCentralState();
  const { ratios, type, coffeeWeight, iceRate } = state;
  const ratio = ratios[type];
  const wrapperStyle = useSpring({ background: isIced(type) ? COLD : HOT, config });

  return (
    <MainWrapper style={wrapperStyle}>
      <Settings state={state} onChange={patchState} />
      <HotOrCold
        value={type === PourOverType.Iced}
        onChange={(isIced) => {
          patchState({ type: isIced ? PourOverType.Iced : PourOverType.Hot });
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', flex: 1, paddingTop: '32px' }}>
        <Measurements value={coffeeWeight} iceRate={iceRate} isIced={type === PourOverType.Iced} ratio={ratio} />
        <Slider
          value={coffeeWeight}
          onChange={(newWeight) => {
            patchState({ coffeeWeight: newWeight });
          }}
          ratio={ratio}
        />
      </div>
    </MainWrapper>
  );
};

export default App;
