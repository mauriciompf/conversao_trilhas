import { adjustComments } from "./adjustComments";
import { adjustSections } from "./adjustSections";
import { assemblyLocalFiles } from "./assemblyLocalFiles";
import { handleAllElements } from "./handleAllElements";
import { handleFakeTables } from "./handleFakeTables";
import { handleHyperLinks } from "./handleHyperLinks";
import { handleLocalFile } from "./handleLocalFile";
import { handleTables } from "./handleTables";
import { handleTitles } from "./handleTitles";
import { handleVimeoVideo } from "./handleVimeoVideo";
import { handleYTVideo } from "./handleYTVideo";
import { saveAs } from "./saveAs";

export async function processHTML() {
  saveAs(); // Ctrl + s => save as .zip (wrap content)

  adjustComments();
  adjustSections();
  handleLocalFile();
  handleVimeoVideo();
  handleYTVideo();
  handleHyperLinks();
  handleTables();
  handleTitles();
  handleFakeTables();
  assemblyLocalFiles();
  handleAllElements();
}
