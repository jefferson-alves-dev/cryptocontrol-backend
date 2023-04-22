import { Decimal } from '@prisma/client/runtime';
import { TypeContribution } from '../../types/Contribution';
import { TypeWallet } from '../../types/Wallet';

export default async function getAllContributions(wallets: TypeWallet[]) {
  const contributions: Array<number | Decimal> = [];

  wallets.forEach((wallet: TypeWallet) => {
    wallet.Contributions.forEach((contribution: TypeContribution) => {
      contributions.push(contribution.amountContribution);
    });
  });

  return contributions;
}
