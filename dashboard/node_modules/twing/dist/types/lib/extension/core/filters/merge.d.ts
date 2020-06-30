/**
 * Merges an array with another one.
 *
 * <pre>
 *  {% set items = { 'apple': 'fruit', 'orange': 'fruit' } %}
 *
 *  {% set items = items|merge({ 'peugeot': 'car' }) %}
 *
 *  {# items now contains { 'apple': 'fruit', 'orange': 'fruit', 'peugeot': 'car' } #}
 * </pre>
 *
 * @param {Map<any, any>} iterable1 A map
 * @param {Map<any, any>} iterable2 A map
 *
 * @return {Promise<Map<any, any>>} The merged map
 */
export declare function merge(iterable1: Map<any, any>, iterable2: Map<any, any>): Promise<Map<any, any>>;
