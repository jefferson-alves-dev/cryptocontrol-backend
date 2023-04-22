import { Decimal } from '@prisma/client/runtime';
import { Contribution } from '../../types/Contribution.interface';
import { Wallet } from '../../types/Wallet.interface';

export default async function getAllContributions(wallets: Wallet[]) {
  const contributions: Array<number | Decimal> = [];

  wallets.forEach((wallet: Wallet) => {
    wallet.Contributions.forEach((contribution: Contribution) => {
      contributions.push(contribution.amountContribution);
    });
  });

  return contributions;
}
