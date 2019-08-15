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
const SliderWrapper = styled.div`
  height: calc(100vh - 168px);
  width: 200px;

  .MuiSlider-root {
    .MuiSlider-track {
      width: 7;
    }
    .MuiSlider-rail {
      width: 7;
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
