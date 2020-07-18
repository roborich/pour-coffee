import React, { FC } from 'react';
import styled from 'styled-components';

import { Slider } from '@material-ui/core';

import grinder from '../../assets/images/grinder-line.svg';
import kettle from '../../assets/images/kettle-line.svg';
import { AppState, PourOverType } from '../../state';

const RatioDisplay = styled.div`
  img {
    height: 20px;
  }

  margin-top: 16px;

  span:last-child {
    opacity: 0.65;
  }
`;

interface RatioSliderProps {
  ratios: AppState['ratios'];
  onChange: (patch: Partial<AppState>) => void;
  type: PourOverType;
}
export const RatioSlider: FC<RatioSliderProps> = ({ ratios, onChange, type }) => {
  const value = ratios[type];
  const update = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    onChange({
      ratios: {
        ...{
          [PourOverType.Hot]: ratios[PourOverType.Hot],
          [PourOverType.Iced]: ratios[PourOverType.Iced],
        },
        [type]: value / 1000,
      },
    });
  };
  return (
    <div>
      <RatioDisplay>
        <span>
          <img alt="Coffee" src={grinder} />
          {value * 1000}g
        </span>
        <span>
          &nbsp;/&nbsp;
          <img alt="Hot Water" src={kettle} />
          1000ml
        </span>
      </RatioDisplay>
      <Slider value={value * 1000} onChange={(_, value) => update(value as number)} min={30} max={90} />
    </div>
  );
};
