import { saveAs } from "../generators";
import {
  handleTitles,
  handleSubComments,
  handleTables,
  handleSections,
  handleLocalFile,
  handleHyperLinks,
  handleAllElements,
  handleFakeTables,
  handleImages,
  handleMetaDataTable,
  handleStamps,
} from "../handlers";
import { handleVideos } from "../handlers/handleVideos";
import { assemblyLocalFiles } from "../parsers/assemblyLocalFiles";

export async function processHTML() {
  saveAs();

  handleTitles();
  handleSubComments();
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
}
