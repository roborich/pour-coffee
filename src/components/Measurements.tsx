import React, { FC } from 'react';
import styled from 'styled-components';

import { Slider } from '@material-ui/core';

import grinder from '../assets/images/grinder-line.svg';
import kettle from '../assets/images/kettle-line.svg';
import { round } from '../util';

const StyledMeasurements = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');

  font-family: 'Lexend Exa', sans-serif;
  min-height: 200px;
  display: flex;
  justify-content: center;

  & > div {
    flex: 0 0 auto;
    width: 150px;
    height: 150px;
    text-align: center;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

interface MeasurementsProps {
  value: number;
  onChange: (value: number) => void;
  ratio: number;
}

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

const Measurements: FC<MeasurementsProps> = ({ value, onChange, ratio }) => {
  const max = 1000 * ratio;
  const handleChange = (_: any, value: unknown) => {
    onChange(value as number);
  };
  const marks = getMarks(ratio);
  return (
    <StyledMeasurements>
      <div>
        <img src={grinder} width="100px" />
        Coffee {value}g
      </div>
      <div>
        <Slider orientation="vertical" value={value} onChange={handleChange} marks={marks} max={max} />
      </div>
      <div>
        <img src={kettle} width="100px" />
        Water {round(value / ratio)}ml
      </div>
    </StyledMeasurements>
  );
};

export default Measurements;
