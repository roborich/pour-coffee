import { BehaviorSubject, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

const STORE_KEY = '@pourCoffee:appState';
export enum PourOverType {
  Hot,
  Iced,
}

type Ratios = { [key in PourOverType]: number };

export interface AppState {
  coffeeWeight: number;
  iceRate: number;
  type: PourOverType;
  ratios: Ratios;
}

export const getDefaultState = (): AppState => ({
  coffeeWeight: 25,
  iceRate: 0.4,
  ratios: {
    [PourOverType.Hot]: 60 / 1000,
    [PourOverType.Iced]: 65 / 1000,
  },
  type: PourOverType.Hot,
});

const getInitialState = () => {
  let initialState = getDefaultState();
  const stateString = localStorage.getItem(STORE_KEY);
  if (stateString == null) {
    return initialState;
  }
  try {
    initialState = JSON.parse(stateString);
  } catch (e) {
    console.error('clearing corrupted data');
    localStorage.removeItem(STORE_KEY);
  }
  return initialState;
};

export const state$ = new BehaviorSubject(getInitialState());

state$.pipe(debounce(() => interval(1000))).subscribe((state) => localStorage.setItem(STORE_KEY, JSON.stringify(state)));
