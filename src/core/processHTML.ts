import { saveAs } from "../generators";
import {
  handleTitles,
  handleTables,
  handleSections,
  handleLocalFile,
  handleHyperLinks,
  handleAllElements,
  handleFakeTables,
  handleImages,
  handleMetaDataTable,
  handleStamps,
  handleTexts,
} from "../handlers";
import { handleEmptySections } from "../handlers/handleEmptySections";
import { handleVideos } from "../handlers/handleVideos";
import { assemblyLocalFiles } from "../parsers/assemblyLocalFiles";
import { convertSingleItemOlToUl } from "../parsers/convertSingleItemOlToUl";

export async function processHTML() {
  saveAs();

  handleEmptySections();
  handleTitles();
  handleTables();
  handleSections();
  handleLocalFile();
  handleVideos();
  handleHyperLinks();
  handleAllElements();
  handleFakeTables();
  handleImages();
  assemblyLocalFiles();
  handleMetaDataTable();
  handleStamps();
  convertSingleItemOlToUl();
  handleTexts();
}
