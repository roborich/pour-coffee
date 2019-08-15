import React, { FC } from 'react';
import styled from 'styled-components';

import { Slider } from '@material-ui/core';

import iceSvg from '../assets/images/cold-ice-cubes.svg';
import grinder from '../assets/images/grinder-line.svg';
import kettle from '../assets/images/kettle-line.svg';
import { round } from '../util';

const StyledMeasurements = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');

  font-family: 'Lexend Exa', sans-serif;
  min-height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
`;
const Card = styled.div`
  flex: 0 0 auto;
  width: 150px;
  height: 150px;
  text-align: center;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
`;
interface MeasurementsProps {
  value: number;
  isIced: boolean;
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

const Measurements: FC<MeasurementsProps> = ({ value, ratio, isIced }) => {
  const totalWater = round(value / ratio);
  const water = round(totalWater * 0.6);
  const ice = round(totalWater * 0.4);
  return (
    <StyledMeasurements>
      <Card>
        <img src={grinder} width="100px" />
        Coffee {value}g
      </Card>
      <Card>
        <img src={kettle} width="100px" />
        Water {isIced ? water : totalWater}ml
      </Card>
      {isIced && (
        <Card>
          <img src={iceSvg} width="100px" />
          Ice {ice}g
        </Card>
      )}
    </StyledMeasurements>
  );
};

export default Measurements;
