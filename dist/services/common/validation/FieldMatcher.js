import * as stringSimilarity from 'string-similarity';
import * as levenshtein from 'fast-levenshtein';
import { FieldDefs } from './CommonFieldDefinition';
import { toWords } from '../util/string.utils';
export const diceRank = (word1, word2) => {
    if (!word1 || !word2)
        return 0;
    return stringSimilarity.compareTwoStrings(word1.toLowerCase(), word2.toLowerCase());
};
export const levenshteinRank = (word1, word2) => {
    if (!word1 || !word2)
        return 0;
    return 1 / (Math.log(Math.exp(1) + levenshtein.get(word1.toLowerCase(), word2.toLowerCase(), { useCollator: false })));
};
export const wordsRank = (word1, word2) => (diceRank(word1, word2) + levenshteinRank(word1, word2)) / 2;
export const fnameSimilarity = (word1, word2) => {
    if (!word1 || !word2)
        return 0;
    return wordsRank(word1, word2);
};
export const getClosestName = (text, names) => {
    let closestName = '';
    let bestRank = 0;
    const rank = 0;
    for (const name of names) {
        const rank = fnameSimilarity(text, name);
        if (rank > bestRank) {
            closestName = name;
            bestRank = rank;
        }
    }
    return { name: closestName, rank: bestRank };
};
export const getClosestFieldname = (text) => {
    let closestName = '';
    const fnames = Object.keys(FieldDefs);
    const textResult = getClosestName(text, fnames);
    if (textResult.rank > 0.70)
        return textResult.name;
    const words = toWords(text);
    const fnameWords = fnames.map(toWords);
    const firstWord = words[0];
    const firstFnameWord = fnameWords.map(ws => ws[0]);
    const lastWord = words[words.length - 1];
    const lastFnameWord = fnameWords.map(ws => ws[ws.length - 1]);
    const ffResult = getClosestName(firstWord, firstFnameWord);
    const llResult = getClosestName(lastWord, lastFnameWord);
    const ffllBest = (ffResult.rank < llResult.rank) ? llResult : ffResult;
    if (ffllBest.rank > 0.70)
        return ffllBest.name;
    const flResult = getClosestName(firstWord, firstFnameWord);
    const lfResult = getClosestName(firstWord, firstFnameWord);
    const fllfBest = (flResult.rank > lfResult.rank) ? flResult : lfResult;
    if (fllfBest.rank > 0.70)
        return fllfBest.name;
    const results = [textResult, ffllBest, fllfBest];
    const bestRank = Math.max(...results.map(r => r.rank));
    if (bestRank > 0.55) {
        const bestResult = results.find(r => r.rank == bestRank);
        closestName = bestResult?.name || text;
    }
    else
        closestName = text;
    return closestName;
};
export const getClosestFieldName = (word) => {
    let closestName = '';
    let bestSimilarity = 0;
    for (const fname of Object.keys(FieldDefs)) {
        const similarity = fnameSimilarity(fname, word);
        if (fnameSimilarity(fname, word) > bestSimilarity) {
            closestName = fname;
            bestSimilarity = similarity;
        }
        if (bestSimilarity < 0.35) {
            closestName = word;
        }
    }
    return closestName;
};
