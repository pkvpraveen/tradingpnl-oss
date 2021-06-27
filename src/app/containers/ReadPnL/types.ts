/* --- STATE --- */
export interface ReadPnLState {
  eqData?: {
    grossPnL: number;
    netPnL: number;
    charges: number;
    trades: Array<Array<string>>;
  };
  fnoData?: {
    grossPnL: number;
    netPnL: number;
    charges: number;
    trades: Array<Array<string>>;
  };
}

export type ContainerState = ReadPnLState;
