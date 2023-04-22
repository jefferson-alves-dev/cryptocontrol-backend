import { Contribution } from './Contribution.interface';

export type Wallet = {
  id: number;
  name: string;
  Contributions: Contribution[];
};
