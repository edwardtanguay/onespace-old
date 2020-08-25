import { getSitePathAndFileNames, copyFileForceDirectories } from '../qtools/qfil.tsx';
import { isEmpty } from '../qtools/qstr.tsx';

class SiteGenerator {
  constructor(relativeDestinationDirectory = '') {
    this.relativeDestinationDirectory = relativeDestinationDirectory;
  }

  createSite() {
    if (!isEmpty(this.relativeDestinationDirectory)) {
      const sourceFiles = getSitePathAndFileNames();

      sourceFiles.forEach((sourceFile) => {
        const targetFile = `${this.relativeDestinationDirectory}/${sourceFile}`;
        copyFileForceDirectories(sourceFile, targetFile);
      });
    }
  }
}

export default SiteGenerator;
