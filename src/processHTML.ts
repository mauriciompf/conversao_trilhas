import { adjustComments } from "./adjustComments";
import { adjustSections } from "./adjustSections";
import { assemblyLocalFiles } from "./assemblyLocalFile";
import { handleAllElements } from "./handleAllElements";
import { handleFakeTables } from "./handleFakeTables";
import { handleHyperLinks } from "./handleHyperLink";
import { handleLocalFile } from "./handleLocalFile";
import { handleTable } from "./handleTable";
import { handleTitles } from "./handleTitles";
import { handleVimeoVideo } from "./handleVimeoVideo";
import { handleYTVideo } from "./handleYTVideo";
import { saveAs } from "./saveAs";

export async function processHTML() {
  await saveAs(); // Ctrl + s => save as .zip (wrap content)

  adjustComments();
  adjustSections();
  handleLocalFile();
  handleVimeoVideo();
  handleYTVideo();
  handleHyperLinks();
  handleTable();
  handleTitles();
  handleFakeTables();
  assemblyLocalFiles();
  handleAllElements();
}
