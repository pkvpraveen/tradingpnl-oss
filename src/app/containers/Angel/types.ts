export interface EQTrade {
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
export interface FnOTrade {
  symbol: string;
  expiry: string;
  option: string;
  strike: number;
  buyDate: Date;
  buyQuantity: number;
  buyPrice: number;
  sellDate: Date;
  sellQuantity: number;
  sellPrice: number;
  profit: number;
  profitDate: Date;
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
