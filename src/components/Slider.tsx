import React, { FC } from 'react';
import styled from 'styled-components';

import { Slider as MUISlider } from '@material-ui/core';

import { round } from '../util';

const getMarks = (ratio: number) => [
  {
    value: round(390 * ratio),
    label: '1 Serving',
  },
  {
    value: round(675 * ratio),
    label: '2 Servings',
  },
];
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  ratio: number;
}

const YELLOW = ' linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)';
const SliderWrapper = styled.div`
  min-height: 200px;
  width: 150px;

  .MuiSlider-root {
    .MuiSlider-track {
      width: 20px;
      background: ${YELLOW};
      border-radius: 0 0 10px 10px;
    }

    .MuiSlider-rail {
      width: 20px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }

    .MuiSlider-thumb {
      width: 30px;
      height: 30px;
      background: white;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);

      &.MuiSlider-active {
        box-shadow: 0 0 0 15px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
const Slider: FC<SliderProps> = ({ value, onChange, ratio }) => {
  const max = 1000 * ratio;
  const handleChange = (_: any, value: unknown) => {
    onChange(value as number);
  };
  const marks = getMarks(ratio);

  return (
    <SliderWrapper>
      <MUISlider value={value} orientation="vertical" onChange={handleChange} marks={marks} max={max} />
    </SliderWrapper>
  );
};

export default Slider;
