/* --- STATE --- */
export interface ReadPnLState {
  eqData?: {
    grossPnL: number;
    netPnL: number;
    charges: number;
    trades: Array<Array<string>>;
  };
  fnoData?: [];
}

export type ContainerState = ReadPnLState;
