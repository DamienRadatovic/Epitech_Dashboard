import { iteratorToMap } from "../../../helpers/iterator-to-map";
export function reduce(map, callback, initial = null) {
    map = iteratorToMap(map);
    let values = Array.from(map.values());
    return Promise.resolve(values.reduce((previousValue, currentValue) => {
        return callback(previousValue, currentValue);
    }, initial));
}
