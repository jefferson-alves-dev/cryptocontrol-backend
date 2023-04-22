import { TypeContribution } from './Contribution';
import { TypeWallet } from './Wallet';
import { TypeWithdrawal } from './Withdrawal';

export type TypeUser = {
  id: number;
  name: string;
  login: string;
  email: string;
  password: string;
  createdAt: DateTime;
  isActive: number;
  contributions: TypeContribution[];
  wallets: TypeWallet[];
  withdrawals: TypeWithdrawal[];
};
