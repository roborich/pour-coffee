import React, { FC, FormEvent, useState } from 'react';

import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

interface RatioProps {
  value: number;
  onChange: (value: number) => void;
}

enum Preset {
  CHEMEX = 'chemex',
  HARIO = 'hario',
  CUSTOM = 'custom',
}

const presets = {
  chemex: 15,
  hario: 13.25,
};

const Ratio: FC<RatioProps> = ({ value, onChange }) => {
  const [preset, setPreset] = useState<Preset>(Preset.CHEMEX);
  const handleSelect = (_: any, value: any) => {
    console.log({ value });
    setPreset(value as Preset);
    if ((presets as any)[value]) {
      onChange((presets as any)[value] as number);
    }
  };
  const handleInput = ({ currentTarget }: FormEvent<HTMLInputElement>) => onChange(Math.max(Number(currentTarget.value) || 1, 1));
  return (
    <>
      <h2>Ratio ({preset})</h2>
      <RadioGroup value={preset} onChange={handleSelect}>
        <FormControlLabel value={Preset.CHEMEX} control={<Radio />} label="Chemex 1 : 15" />
        <FormControlLabel value={Preset.HARIO} control={<Radio />} label="Hario V60 1 : 13.25" />
        <FormControlLabel
          value={Preset.CUSTOM}
          control={<Radio />}
          label={
            <span>
              Custom 1 : <input disabled={preset !== Preset.CUSTOM} type="number" value={value} onInput={handleInput} />
            </span>
          }
        />
      </RadioGroup>
    </>
  );
};
export default Ratio;
