export const computeHeight = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
export const sizeLabels = () => {
    const elems = document.getElementsByTagName('label');
    for (const elem of elems) {
        const txt = elem.innerText;
        const testElem = document.createElement('span');
        document.body.appendChild(testElem);
        testElem.innerText = txt;
        const fontStyle = window.getComputedStyle(elem, null).getPropertyValue('font');
        testElem.style.font = fontStyle;
        const textWidth = testElem.offsetWidth;
        const elemWidth = elem.offsetWidth;
        if (textWidth > elemWidth - 10) {
            const fontSizeStyle = window.getComputedStyle(elem, null).getPropertyValue('font-size');
            const fontSize = Number.parseInt(fontSizeStyle.match(/\d*/)[0]);
            elem.style.fontSize = `${fontSize - 2}px`;
        }
        document.body.removeChild(testElem);
    }
};
export function extractViewMode(page) {
    const pathParts = page.url.pathname.split('/');
    const pathTail = pathParts[pathParts.length - 1];
    if (pathTail === 'edit')
        return 'edit';
    if (pathTail === 'create')
        return 'create';
    return 'view';
}
export const getDocumentHeight = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
