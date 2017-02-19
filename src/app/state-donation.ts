export class StateDonation {
  name: string;
  amount: number;
  donations: number;

    constructor(name: string, amount: number, donations: number) {
        this.name = name;
        this.amount = amount;
        this.donations = donations;
    }
}