export const qstr = require('../qtools/qstr');

exports.contains = (line: string, searchText: string) => String(line).includes(searchText);

exports.breakIntoParts = (main: string, delimiter = ',', maximumNumberOfParts = 0) => {
  const escapedDelimiter = `\\${delimiter}`;
  const mask = '@@@MASK@@@';
  if (qstr.isEmpty(main)) {
    return [];
  }

  const maskedMain = qstr.replaceAll(main, escapedDelimiter, mask);
  const roughParts = maskedMain.split(delimiter);
  let parts: Array<string> = [];
  roughParts.forEach((part: string) => {
    let newPart = part;
    newPart = newPart.trim();
    parts.push(newPart);
  });
  if (maximumNumberOfParts !== 0 && maximumNumberOfParts < parts.length) {
    const consolidatedParts: Array<string> = [];
    parts.forEach((part, index) => {
      if (index < maximumNumberOfParts - 1) {
        consolidatedParts.push(part);
      } else {
        const current = consolidatedParts[maximumNumberOfParts - 1];
        let prefix = '';
        if (current !== undefined) {
          prefix = `${current};`;
        }
        consolidatedParts[maximumNumberOfParts - 1] = prefix + part;
      }
    });
    parts = consolidatedParts;
  }

  // unmask
  const unmaskedParts = [];
  for (const part of parts) {
    const unmaskedPart = qstr.replaceAll(part, mask, delimiter);
    unmaskedParts.push(unmaskedPart);
  }
  parts = unmaskedParts;

  return parts;
};

exports.isEmpty = (line: string) => {
  if (line === undefined || line == null) {
    return true;
  }
  line = line.toString();
  if (line.trim() === '') {
    return true;
  }
  return false;
};

exports.replaceAll = (text: string, search: string, replace: string) => {
  text = qstr.forceAsString(text);
  const text2 = text.split(search).join(replace);
  return text2;
};

exports.forceAsString = (stringOrOther: any) => {
  if (!qstr.isString(stringOrOther)) {
    return String(stringOrOther);
  }
  return stringOrOther;
};

exports.chopRight = (main: string, textToChop: string) => {
  if (main.endsWith(textToChop)) {
    const len = textToChop.length;
    const mainLen = main.length;
    if (len <= mainLen) {
      return main.substring(0, mainLen - (len));
    }
  }
  return main;
};

exports.endsWith = (main: string, part: string) => main.endsWith(part);

exports.chopLeft = (main: string, textToChop: string) => {
  if (main.startsWith(textToChop)) {
    const len = textToChop.length;
    const mainLen = main.length;
    if (len <= mainLen) {
      return main.substring(len, mainLen);
    }
  }
  return main;
};

exports.isString = (obj: any) => (typeof obj === 'string' || obj instanceof String);
