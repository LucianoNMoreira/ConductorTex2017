export class Donation {
  state: string;
  value: number;
  date: string;

    constructor(state: string, value: number) {
        this.state = state;
        this.value = value;
    }
}