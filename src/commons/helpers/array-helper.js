//remove itens if an array item or object is equivalent with another by key
import _ from "lodash";

export const removeEqualsByKey = (key, arrayA, arrayB) => {
  return _.remove(arrayA, a => _.isEmpty(_.filter(arrayB, (b) => a[key] === b[key])));
};