import * as _ from 'lodash';

export class Model {

  constructor(data: any) {
    _.forIn(data, (value, filed) => {
      this[filed] = value;
    });
  }
}
