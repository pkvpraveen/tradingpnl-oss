/* --- STATE --- */
export interface Trade {
  scripName: string;
  scripCode: string;
  symbol: string;
  scriptOpt: string;
  buyDate: string;
  buyQuantity: number;
  buyRate: number;
  buyAmount: number;
  sellDate: string;
  sellQuantity: number;
  sellRate: number;
  sellAmount: number;
  days: number;
  profit: number;
}
export interface ReadPnLState {
  eqData?: {
    grossPnL: number;
    netPnL: number;
    charges: number;
    trades: Array<Trade>;
  };
  fnoData?: {
    grossPnL: number;
    netPnL: number;
    charges: number;
    trades: Array<Trade>;
  };
}

export type ContainerState = ReadPnLState;
