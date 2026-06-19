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

export async function processHTML() {
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
