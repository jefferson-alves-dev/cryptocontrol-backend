import { Contribution } from './Contribution.interface';

export interface Wallet {
  id: number;
  name: string;
  Contributions: Contribution[];
}
