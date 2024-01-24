// ====
// Maps
// ====
export const buildDbKeys = (validMap) => Object.keys(validMap).map(key => key[0]);
export const buildDbKeyMap = (validMap) => {
    const keyMap = {};
    for (const key of Object.keys(validMap)) {
        const k = key[0];
        keyMap[k] = key;
    }
    return keyMap;
};
// =================
// Map of Primitives
// =================
export const primitivesToDb = (values) => {
    const dbValues = {};
    for (const [key, val] of Object.entries(values)) {
        dbValues[key[0]] = (val !== undefined) ? val : null;
    }
    return dbValues;
};
export const dbToPrimitiveMap = (dbValues, keyMap) => {
    const values = {};
    for (const [k, val] of Object.entries(dbValues)) {
        const key = keyMap[k];
        values[key] = val;
    }
    return values;
};
export const dbToPrimitiveMapWithDefaults = (dbChoices, defaultValues) => {
    const keyMap = buildDbKeyMap(defaultValues);
    return dbToPrimitiveMap(dbChoices, keyMap);
};
// ==============
// Map of Choices
// ==============
export const buildDbChoiceMaps = (validChoices) => {
    const valueMaps = {};
    for (const [key, choices] of Object.entries(validChoices)) {
        const k = key[0];
        valueMaps[k] = {};
        if (typeof choices === 'string') {
            valueMaps[k][choices.toString()[0]] = choices;
        }
        else {
            for (const choice of choices) {
                valueMaps[k][choice.toString()[0]] = choice;
            }
        }
    }
    return valueMaps;
};
export const choicesToDb = (choices) => Object
    .entries(choices)
    .map(([key, val]) => (val?.toString()[0] !== undefined) ? key[0] + val.toString()[0] : '')
    .join('');
export const dbToChoices = (dbChoices, keyMap, choiceMaps) => {
    const choices = {};
    for (let i = 0; i < dbChoices.length; i += 2) {
        const k = dbChoices[i];
        const v = dbChoices[i + 1];
        const key = keyMap[k];
        const val = choiceMaps[k][v];
        choices[key] = val;
    }
    return choices;
};
export const dbToChoicesWithValidChoices = (dbChoices, validChoices) => {
    const keyMap = buildDbKeyMap(validChoices);
    const valueMaps = buildDbChoiceMaps(validChoices);
    return dbToChoices(dbChoices, keyMap, valueMaps);
};
//# sourceMappingURL=db.formater.js.map