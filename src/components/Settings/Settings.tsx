import React, { FC, useState } from 'react';
import styled from 'styled-components';

import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Slider,
    Typography
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import hotSvg from '../../assets/images/coffee-cup-line.svg';
import iceSvg from '../../assets/images/cold-ice-cubes.svg';
import icedSvg from '../../assets/images/glass-line.svg';
import kettle from '../../assets/images/kettle-line.svg';
import { AppState, getDefaultState, PourOverType } from '../../state';
import { RatioSlider } from './RatioSlider';

const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90vw;
`;

interface SettingsProps {
  state: AppState;
  onChange: (patch: Partial<AppState>) => void;
}
export const Settings: FC<SettingsProps> = ({ state, onChange }) => {
  const { ratios } = state;
  const [isOpen, setIsOpen] = useState(false);
  const icePercent = state.iceRate * 100;
  const setIceRate = (value: number) => {
    onChange({ iceRate: value / 100 });
  };
  const reset = () => {
    const { iceRate, ratios } = getDefaultState();
    onChange({
      iceRate,
      ratios,
    });
  };
  return (
    <>
      <FlexRight>
        <IconButton onClick={() => setIsOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </FlexRight>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Typography variant="h4">
            <img alt="Hot Coffee" height="30" src={hotSvg} /> Hot Coffee
          </Typography>

          <RatioSlider ratios={ratios} onChange={onChange} type={PourOverType.Hot} />

          <Divider style={{ margin: '16px 0 32px 0' }} />
          <Typography variant="h4">
            <img alt="Iced Coffee" height="30" src={icedSvg} /> Iced Coffee
          </Typography>

          <RatioSlider ratios={ratios} onChange={onChange} type={PourOverType.Iced} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <div>
              <img alt="Water" height="20" src={kettle} /> Water {100 - icePercent}%
            </div>
            <div>
              <img alt="Ice" height="20" src={iceSvg} /> Ice {icePercent}%
            </div>
          </div>
          <Slider value={icePercent} onChange={(_, value) => setIceRate(value as number)} min={25} max={55} />
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Reset to Default</Button>
          <Button onClick={() => setIsOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
