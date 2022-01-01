export interface Trade {
  symbol: string;
  buyDate: Date;
  buyQuantity: number;
  buyPrice: number;
  sellDate: Date;
  sellQuantity: number;
  sellPrice: number;
  profit: number;
  profitDate: Date;
}
export interface EQTrade extends Trade {}
export interface FnOTrade extends Trade {
  expiry: string;
  option: string;
  strike: number;
}
interface AngelState {
  eqTrades: Array<EQTrade>;
  eqResidue?: any;
  eqCharges: number;
  fnoTrades: Array<FnOTrade>;
  fnoResidue?: any;
  fnoCharges: number;
}

export type ContainerState = AngelState;
