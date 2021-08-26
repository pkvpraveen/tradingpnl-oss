/* --- STATE --- */
export type SupportedBrokers = 'upstox' | 'angel' | 'zerodha';

interface HomeState {
  broker: SupportedBrokers;
}

export type ContainerState = HomeState;
