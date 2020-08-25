const mkdirp = require('mkdirp');
const fs = require('fs');
export const qsys = require('../qtools/qsys');
const qstr = require('../qtools/qstr');
const qfil = require('../qtools/qfil');

exports.forceCreateDirectory = (relativeDirectoryName: string) => {
  mkdirp.sync(relativeDirectoryName);
};

exports.copyFileForceDirectories = (sourcePathAndFileName: string, targetPathAndFileName: string) => {
  const directory = (qfil.getDirectoryAndFileNameFromRelativePathAndFileName(targetPathAndFileName))[0];
  qfil.forceCreateDirectory(directory);
  qfil.copyFile(sourcePathAndFileName, targetPathAndFileName);
};

exports.copyFile = (sourcePathAndFileName: string, targetPathAndFileName: string) => {
  fs.createReadStream(sourcePathAndFileName).pipe(fs.createWriteStream(targetPathAndFileName));
};

// e.g. "../n49901_dpnversion/systemPages/createPage.ejs" returns :
// [0] = "../n49901_dpnversion/systemPages"
// [1] = "createPage.ejs"
exports.getDirectoryAndFileNameFromRelativePathAndFileName = (relativePathAndFileName: string) => {
  if (qstr.contains(relativePathAndFileName, '/')) {
    const parts = qstr.breakIntoParts(relativePathAndFileName, '/');
    const fileName = parts.pop();
    const directory = parts.join('/');
    return [directory, fileName];
  }
  return ['', relativePathAndFileName];
};

exports.getSitePathAndFileNames = (absoluteDirectory: string, pathAndFileNamesOriginal: string[]) => {
  absoluteDirectory = absoluteDirectory || qsys.getApplicationBaseDirectory();
  const pathAndFileNames: string[] = pathAndFileNamesOriginal || [];

  const files = fs.readdirSync(absoluteDirectory);
  for (const file of files) {
    let absolutePathAndFileName = `${absoluteDirectory}\\${file}`;
    if (!qstr.endsWith(absolutePathAndFileName, '\\node_modules') && !qstr.contains(absolutePathAndFileName, '\\.git') && !qstr.contains(absolutePathAndFileName, '\\.vscode')) {
      absolutePathAndFileName = qstr.replaceAll(absolutePathAndFileName, '\\\\', '\\');
      if (fs.statSync(absolutePathAndFileName).isDirectory()) {
        qfil.getSitePathAndFileNames(absolutePathAndFileName, pathAndFileNames);
      } else {
        const fixedPathAndFileName = qsys.convertAbsoluteWindowsPathAndFileNameToPathAndFileName(absolutePathAndFileName);
        pathAndFileNames.push(fixedPathAndFileName);
      }
    }
  }
  return pathAndFileNames;
};

exports.convertBackSlashesToForwardSlashes = (pathAndFileName: string) => qstr.replaceAll(pathAndFileName, '\\', '/');
