import { Model } from './model';

export class Menu extends Model {
  id: number;
  url: string;
  label: string;

  constructor(data) {
    super(data);
  }
}
