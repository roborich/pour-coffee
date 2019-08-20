import React, { FC } from 'react';
import styled from 'styled-components';

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
  width: 16vh;
  height: 16vh;
  padding: 16px;
  margin: 8px;
  text-align: center;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  font-size: 2vh;

  img {
    width: 55%;
  }

  span {
    font-weight: bold;
    font-size: 3vh;
  }
`;
interface MeasurementsProps {
  value: number;
  isIced: boolean;
  ratio: number;
}

const Measurements: FC<MeasurementsProps> = ({ value, ratio, isIced }) => {
  const totalWater = round(value / ratio);
  const water = round(totalWater * 0.6);
  const ice = round(totalWater * 0.4);
  return (
    <StyledMeasurements>
      <Card>
        <img alt="Coffee Grinder" src={grinder} />
        <div>Coffee</div>
        <span>{value}g</span>
      </Card>
      <Card>
        <img alt="Water Kettle" src={kettle} />
        Water <span>{isIced ? water : totalWater}ml</span>
      </Card>
      {isIced && (
        <Card>
          <img alt="Ice" src={iceSvg} />
          Ice <span>{ice}g</span>
        </Card>
      )}
    </StyledMeasurements>
  );
};

export default Measurements;
