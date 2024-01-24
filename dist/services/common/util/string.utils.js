export const toCamelCase = (str0) => {
    if (!str0)
        return '';
    let camel = str0[0].toLowerCase();
    for (let i = 1; i < str0.length; i++) {
        const pchar = str0[i - 1];
        const char = str0[i];
        if (char.match(/[A-Za-z0-9]/)) {
            if (char.match(/[A-Z]/) || pchar.match(/![A-Z]/)) {
                camel += char;
            }
            else {
                camel += char.toLowerCase();
            }
        }
    }
    return camel;
};
export const toWords = (str0) => {
    const words = [];
    if (!str0)
        return words;
    let word = str0[0];
    for (let i = 1; i < str0.length; i++) {
        const pchar = str0[i - 1];
        const char = str0[i];
        if (char.match(/[A-Z]/)) {
            if (pchar.match(/[^A-Z]/)) {
                words.push(word);
                word = char;
            }
            else {
                word += char;
            }
        }
        else {
            word += char;
        }
    }
    if (word)
        words.push(word);
    return words;
};
export const toDisplayString = (str0) => {
    if (!str0)
        return '';
    const str1 = toWords(str0).join(' ');
    return str1[0].toUpperCase() + str1.slice(1);
};
export const toDisplayString0 = (str0) => {
    if (!str0)
        return '';
    let str = str0[0].toUpperCase();
    for (let i = 1; i < str0.length; i++) {
        const pchar = str0[i - 1];
        const char = str0[i];
        if (char.match(/[A-Z]/)) {
            if (pchar.match(/[^A-Z]/)) {
                str += ' ' + char;
            }
            else {
                str += char;
            }
        }
        else {
            str += char;
        }
    }
    return str;
};
const alphaRegex = new RegExp(/[A-Za-z]/);
export const alphaFromStr = str => {
    let alpha = '';
    if (str) {
        let i = str.length;
        while (i--) {
            if (alphaRegex.test(str[i])) {
                alpha = alpha + str[i];
            }
        }
    }
    return alpha;
};
