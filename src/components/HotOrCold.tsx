import React, { FC, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

import hotSvg from '../assets/images/coffee-cup-line.svg';
import iceSvg from '../assets/images/glass-line.svg';
import config from '../spring-config';

interface HotOrColdProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const HotOrIceCard = styled(animated.div)`
  @import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');

  font-family: 'Lexend Exa', sans-serif;
  height: 150px;
  width: 150px;
  /* box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2); */
  transform-style: preserve-3d;
  /* transition: box-shadow 0.2s ease; */
  position: relative;
  border-radius: 4px;
  user-select: none;
  /* perspective: 600px; */
  transform-origin: center right;

  img {
    width: 80px;
  }

  div {
    text-align: center;
    position: absolute;
    display: flex;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: white;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    will-change: transform;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    /* transition: box-shadow 0.2s ease; */

    &:hover {
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    }
    span {
      font-size: 18px;
      display: block;
      margin-bottom: 18px;
    }
  }

  div:last-child {
    /* z-index: -1; */
    transform: rotateY(180deg);
  }
`;

// const config = { mass: 5, tension: 500, friction: 70 };
const transform = ((y: number, scale: number): string => `rotateY(${y}deg) scale(${scale})`) as any;

const HotOrCold: FC<HotOrColdProps> = ({ value, onChange }) => {
  const [isHovered, setHovered] = useState(false);
  const props = useSpring({ ys: [value ? 0 : 180, isHovered ? 1.05 : 1], config });
  const handleClick = () => {
    const newValue = !value;
    onChange(newValue);
  };
  return (
    <HotOrIceCard
      style={{ transform: props.ys.interpolate(transform) }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <span>Iced</span>
        <img src={iceSvg} />
      </div>
      <div>
        <span>Hot</span>
        <img src={hotSvg} />
      </div>
    </HotOrIceCard>
  );
};

export default HotOrCold;
