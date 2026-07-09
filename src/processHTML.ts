import { addTypeRowToMetadataTable } from "./addTypeRowToMetadataTable";
import { adjustComments } from "./adjustComments";
import { adjustNoSection } from "./adjustNoSection";
import { adjustSections } from "./adjustSections";
import { adjustSoloSection } from "./adjustSoloSection";
import { assemblyLocalFiles } from "./assemblyLocalFiles";
import { convertSingleItemOlToUl } from "./convertSingleItemOlToUl";
import { handleAllElements } from "./handleAllElements";
import { handleFakeTables } from "./handleFakeTables";
import { handleHyperLinks } from "./handleHyperLinks";
import { handleImages } from "./handleImages";
import { handleLocalFile } from "./handleLocalFile";
import { handleStamps } from "./handleStamps";
import { handleTables } from "./handleTables";
import { handleTitles } from "./handleTitles";
import { handleVimeoVideo } from "./handleVimeoVideo";
import { handleYTVideo } from "./handleYTVideo";
import { saveAs } from "./saveAs";

export async function processHTML() {
  saveAs(); // Ctrl + s => save as .zip (wrap content)

  adjustNoSection();
  handleTitles();
  adjustComments();
  handleTables();
  adjustSoloSection();
  adjustSections();
  handleLocalFile();
  handleVimeoVideo();
  handleYTVideo();
  handleHyperLinks();
  handleAllElements();
  handleFakeTables();
  assemblyLocalFiles();
  addTypeRowToMetadataTable();
  handleStamps();
  handleImages();
  convertSingleItemOlToUl();
}
