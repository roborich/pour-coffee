import React, { FC, useState } from 'react';
import styled from 'styled-components';

import {
    Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Slider, Typography
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import hotSvg from '../../assets/images/coffee-cup-line.svg';
import iceSvg from '../../assets/images/cold-ice-cubes.svg';
import icedSvg from '../../assets/images/glass-line.svg';
import kettle from '../../assets/images/kettle-line.svg';
import { AppState, getDefaultState, PourOverType } from '../../state';
import { RatioSlider } from './RatioSlider';

const SettingsButton = styled(IconButton)`
  && {
    position: absolute;
    bottom: 0;
    right: 0;
  }
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
      <SettingsButton onClick={() => setIsOpen(true)}>
        <SettingsIcon />
      </SettingsButton>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
        <DialogContent>
          <Typography variant="h4" style={{ marginTop: '32px' }}>
            <img alt="Hot Coffee" height="30" src={hotSvg} /> Hot Coffee
          </Typography>

          <RatioSlider ratios={ratios} onChange={onChange} type={PourOverType.Hot} />

          <Divider style={{ margin: '16px 0 0 0' }} />
          <Typography variant="h4" style={{ marginTop: '32px' }}>
            <img alt="Iced Coffee" height="30" src={icedSvg} /> Iced Coffee
          </Typography>

          <RatioSlider ratios={ratios} onChange={onChange} type={PourOverType.Iced} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <div>
              <img alt="Water" height="20" src={kettle} /> Water {(100 - icePercent).toFixed(0)}%
            </div>
            <div>
              <img alt="Ice" height="20" src={iceSvg} /> Ice {icePercent.toFixed(0)}%
            </div>
          </div>
          <Slider value={icePercent} onChange={(_, value) => setIceRate(value as number)} min={25} max={55} />
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Reset to Defaults</Button>
          <Button onClick={() => setIsOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
