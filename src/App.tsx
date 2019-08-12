import React, {useState, ChangeEvent} from 'react';
import {Grid, TextField, Switch, FormControlLabel, Card, CardContent, InputAdornment} from '@material-ui/core';
import grinder from './assets/images/grinder-line.svg';
import kettle from './assets/images/kettle-line.svg';
import icedImg from './assets/images/glass-line.svg';
import hotImg from './assets/images/coffee-cup-line.svg';

const getRatio = (isIced: boolean) => isIced ? 1000 / 65 : 1000 / 60;
const defaultCoffee = 25;
const App: React.FC = () => {
  const [isIced, setIsIced] = useState<boolean>(true);
  const ratio = getRatio(isIced);

  const [coffee, setCoffee] = useState<number>(defaultCoffee);
  const [water, setWater] = useState<number>(Math.round(defaultCoffee * ratio));
  const [actualIce, setActualIce] = useState<number>(0);
  const waterWithIce = Math.round(water * .6);
  const ice = Math.round(water * .4);
  const handleCoffeeChange: any = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
    setCoffee(Number(value));
    setWater(Math.round(Number(value ) * ratio));
  };
  const handleWaterChange = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
    setCoffee(Math.round(Number(value) / ratio))
    setWater(Number(value));
  }; 
  const handleSwitch = () => {
    setWater(Math.round(coffee * getRatio(!isIced)));
    setIsIced(!isIced);
  }
  const handleActualIce = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
    setActualIce(Number(value));
  }
  return (
    <div style={{padding: '16px'}}>
      <header className="App-header">
        <h2>Measurements</h2>
        
        <FormControlLabel
          control={<Switch checked={isIced} onChange={handleSwitch}/>}
          label="Iced"  
        />
        
        <Grid container spacing={3} justify="space-around">
       
          <Grid item xs={12} sm={5}>
            <Card>
              <CardContent>
                <img src={grinder} alt="Coffee"/>
                <TextField label="Coffee" type="number" value={coffee} variant="outlined" onChange={handleCoffeeChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card>
              <CardContent>
                <img src={kettle} alt="Water"/>
                <TextField label="Water" type="number" value={water} variant="outlined" onChange={handleWaterChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                }}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
     
        {isIced ? <div>
          <div>coffee={coffee}g</div>
          <div>water={waterWithIce}ml</div>
          <div>Target Ice={ice}g</div>
        </div>
        : <div>
            <div>coffee={coffee}g</div>
            <div>water={water}ml</div>
        </div>}
        <TextField label="Actual Ice" value={actualIce || ice} type="number" onChange={handleActualIce}/>
        {actualIce > 0 && <div>
          Final Water={water - actualIce}ml
        </div>}
      </header>
     
    </div>
  );
}

export default App;
