import { Contribution } from './Contribution';

export type Wallet = {
  id: number;
  name: string;
  Contributions: Contribution[];
};
