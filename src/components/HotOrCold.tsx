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

const Wrapper = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Section = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0.2;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.5;
  }
  img {
    width: 80px;
  }

  span {
    font-size: 18px;
    display: block;
    margin-bottom: 18px;
  }
`;
const HotOrIceCard = styled(animated.div)`
  @import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');

  font-family: 'Lexend Exa', sans-serif;
  height: 150px;
  width: 150px;
  transform-style: preserve-3d;
  position: absolute;
  left: 0;
  border-radius: 4px;
  user-select: none;
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
    transition: box-shadow 0.4s ease;

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
    transform: rotateY(180deg);
  }
`;

// const config = { mass: 5, tension: 500, friction: 70 };
const transform = ((y: number, hint: number): string => {
  const isFlipped = y > 90;
  let rotate = y + hint * (isFlipped ? -1 : 1);
  return `rotateY(${rotate}deg)`;
}) as any;

const HotOrCold: FC<HotOrColdProps> = ({ value, onChange }) => {
  const [isHovered, setHovered] = useState(false);
  const props = useSpring({ ys: [value ? 0 : 180, isHovered ? 15 : 0], config });
  const handleClick = () => {
    const newValue = !value;
    onChange(newValue);
  };
  return (
    <Wrapper
      onClick={handleClick}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Section>
        <span>Hot</span>
        <img alt="Hot Coffee" src={hotSvg} />
      </Section>
      <Section>
        <span>Iced</span>
        <img alt="Iced Coffee" src={iceSvg} />
      </Section>
      <HotOrIceCard style={{ transform: props.ys.interpolate(transform) }}>
        <div>
          <span>Hot</span>
          <img alt="Hot Coffee" src={hotSvg} />
        </div>
        <div>
          <span>Iced</span>
          <img alt="Iced Coffee" src={iceSvg} />
        </div>
      </HotOrIceCard>
    </Wrapper>
  );
};

export default HotOrCold;
