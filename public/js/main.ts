/**
 * --------------------------------------
 *
 * ! ***=======================*** !
 * ! ***------ BEM-VINDO ------*** !
 * ! ***=======================*** !
 *
 * ! aqui comeca a aventura kekw
 *
 *
 * ? o .ts esta divido da seguinte forma
 *
 *  * declaracoes
 * 	* user-triggered events
 * 	* script-triggered events
 *
 * --------------------------------------
 **/

/**
 *  !!! ===========***----------***---------***=========== !!!
 * 	!!! ------------->      declaracoes     <------------- !!!
 *  !!! ===========***----------***---------***=========== !!!
 */
declare class ProgressBar {
  static Line: any;
  static new(Line: any);
  static Circle: any;
  static new(Circle: any);
}

interface Aluno {
  matricula: string;
  nome: string;
  disciplina: string;
  turma: string;
  semestre?: string;
}

interface EvolucaoRequest {
  aluno: string;
  semestre: string;
  disciplina: string;
  index: string[];
  tipo: "1" | "2";
}

let savedSize = getCookie(`font-size`);
let fontSize = savedSize ? savedSize : `16`;

let progressBar;
let progressBarT;

let currentURL = new URL(window.location.toString());
let currentPath = currentURL.pathname;
let currentPage = currentPath.split("/").pop();
let pathArray = currentPath.split(`/`);
let currentDisciplina = pathArray[pathArray.length - 2];

let isAvaliou = getCookie("avaliou" + currentPath.split("/")[1]);
let seenPopupChegouLivro = getCookie("popupLivroD" + currentPath.split("/")[1]);
let seenPopupFaltaLivro = getCookie(
  "popupLivroD-faltando" + currentPath.split("/")[1],
);

let identificacao = getCookie(`id-${currentDisciplina}`);
let currentSemester;
let sumario;
let desempenho;

/**
 *  !!! ===========***----------***---------***=========== !!!
 * 	!!! -------------> user triggered events <------------ !!!
 *  !!! ===========***----------***---------***=========== !!!
 */

/**
 * toggle entre video padrao e versao libras
 * @param event click event
 * @param tipoVideo se vai carregar libras ou padrao
 */
function selectVideo(event, tipoVideo) {
  let frame = event.target.parentElement.parentElement.querySelector("iframe");

  let currentState = frame.getAttribute("data-current-state");
  let altURL = frame.getAttribute("data-alt-url");

  if (tipoVideo != currentState) {
    //troca o estilo dos botoes
    event.target.parentElement
      .querySelector(".selected")
      .classList.remove("selected");
    event.target.classList.add("selected");

    //troca a url do iframe
    frame.setAttribute("data-current-state", tipoVideo);

    let newAltURL = frame.getAttribute("src")
      ? frame.getAttribute("src")
      : frame.getAttribute("data-src");
    frame.setAttribute("data-alt-url", newAltURL);

    frame.src = altURL;
  }
}

//_deprecated --> era usado em algumas trilhas antigas, onde ia div no lugar de anchor
function redirect(a) {
  if (a != `index`) window.location.href = a + ".html";
}

//menu de acessibilidade
function toggleAccess() {
  document.querySelector("#accessibility-menu")?.classList.toggle("active");
}

function decreaseFont() {
  let size = parseInt(fontSize);

  if (size > 10) {
    size -= 2;
    document.body.style.fontSize = `${size}px`;

    fontSize = size.toString();
    setCookie(`font-size`, size);
  }
}

function increaseFont() {
  let size = parseInt(fontSize);

  if (size < 28) {
    size += 2;
    document.body.style.fontSize = `${size}px`;

    fontSize = size.toString();
    setCookie(`font-size`, size);
  }
}

function resetFont() {
  fontSize = `16`;
  document.body.style.fontSize = "";

  setCookie(`font-size`, fontSize);
}

/**
 * Clicou no botao responder de uma atividade,
 * mostrar o feedback se tiver alguma alternativa marcada
 * @param event click event
 */
function respostaEx(event) {
  let exParent = event.target;

  while (!exParent.classList.contains("um-item")) {
    exParent = exParent.parentElement;
  }

  let resp = exParent.querySelector("input:checked");
  if (resp) {
    //selecionou uma resposta

    exParent.querySelector(".ex-enviar").classList.remove("visible");

    if (resp.value == "true") {
      //resposta certa
      exParent.querySelector(".ex-fb-correto").classList.add("visible");

      // makeBadge();
    } else {
      //resposta errada
      exParent.querySelector(".ex-fb-incorreto").classList.add("visible");
    }

    exParent.querySelectorAll("input").forEach((el) => {
      el.setAttribute("disabled", "true");
    });
  }
}

/**
 * Navega entre blocos dentro de uma div .exercicios-wrapper
 * Podem ser atividades ou uma galeria de imagens ou outra coisa
 * @param event click event
 * @param index target index
 */
function navEx(event, index) {
  let exsParent = event.target;
  while (!exsParent.classList.contains("carroussel")) {
    exsParent = exsParent.parentElement;
  }

  let selected = exsParent.getAttribute("data-selected");

  if (selected != index) {
    let items = exsParent.querySelectorAll(".um-item");

    for (let i = 0; i < items.length; i++) {
      let translateXVal = `calc(100% + 80px)`;

      if (i < index) {
        //tx negativo
        translateXVal = `calc(-100% - 80px)`;
      } else if (i == index) {
        //tx 0
        translateXVal = `0`;
      }

      items[i].style.transform = `translateX(${translateXVal})`;
    }

    //mudar o checked
    let i = exsParent.querySelectorAll(".carroussel-indicator i");
    i[selected].innerHTML = "radio_button_unchecked";
    i[index].innerHTML = "radio_button_checked";

    exsParent.setAttribute("data-selected", index);
  }
}

/**
 * Chama o navEx pro indice anterior
 * @param event click event
 */
function navExPrev(event) {
  let exsParent = event.target;
  while (!exsParent.classList.contains("carroussel")) {
    exsParent = exsParent.parentElement;
  }

  let selected = exsParent.getAttribute("data-selected");

  if (selected != 0) {
    navEx(event, selected - 1);
  }
}
/**
 * Chama navEx para o proximo index
 * @param event click event
 */
function navExNext(event) {
  let exsParent = event.target;
  while (!exsParent.classList.contains("carroussel")) {
    exsParent = exsParent.parentElement;
  }

  let selected = parseInt(exsParent.getAttribute("data-selected"));
  let nChildren = exsParent.querySelectorAll(".um-item").length - 1;

  if (selected < nChildren) {
    navEx(event, selected + 1);
  }
}

function toggleMenu() {
  document.querySelector("#sidebar")?.classList.toggle("show");
}

function loadVideo(e) {
  let parentPlaylist = e.parentElement;

  while (!parentPlaylist.classList.contains("playlist")) {
    parentPlaylist = parentPlaylist.parentElement;
  }

  parentPlaylist
    .querySelector(".video-item.selected")
    .classList.remove("selected");

  e.classList.add("selected");

  let videoURL = e.getAttribute("data-videoid");

  parentPlaylist.querySelector(".video iframe").src =
    `https://www.youtube.com/embed/${videoURL}?rel=0&amp;showinfo=0&amp;disablekb=1&amp;modestbranding=1&amp;allowfullscreen=1`;
}

function sctop() {
  document.documentElement.scrollTop = 0;
}

//mostra ou esconde o menu lateral dos materiais
function toggleMaterial() {
  let el = document.querySelector("#material-menu");
  if (el && el.classList.toggle("hidden")) {
    //escondeu

    // el.querySelector(".material-icons").innerHTML = "expand_more";
    setCookie("side-menu-visibility", "hidden");
  } else {
    // el.querySelector(".material-icons").innerHTML = "expand_less";
    setCookie("side-menu-visibility", "visible");
  }
}

/**
 *  !!! ===========***----------***---------***=========== !!!
 * 	!!! -----------> script triggered events <------------ !!!
 *  !!! ===========***----------***---------***=========== !!!
 */

/**
 * set fontSize with saved values
 */
document.body.style.fontSize = savedSize + `px`;

/**
 * Criar as barras de progresso da navegacao no topo da pagina
 *  e no menu lateral e salva a ref delas
 */
function buildProgressBars() {
  //preenche a barra de progresso da pagina no menu lateral
  if (document.querySelector(".sidebar-progress"))
    progressBar = new ProgressBar.Line(
      document.querySelector(".sidebar-progress"),
      {
        strokeWidth: 6,
        easing: "easeInOut",
        duration: 800,
        color: "#ffdd00",
        trailWidth: 6,
      },
    );

  //preenche a barra de progresso da pagina no topo da pagina
  if (document.querySelector(".topbar-progress"))
    progressBarT = new ProgressBar.Line(
      document.querySelector(".topbar-progress"),
      {
        strokeWidth: 6,
        easing: "easeInOut",
        duration: 800,
        color: "#ffdd00",
        trailColor: "rgba(0,0,0,0)",
        trailWidth: 6,
        text: {
          style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: "#ffffff",
            position: "absolute",
            left: "5px",
            top: "-1px",
            padding: 0,
            margin: 0,
            fontSize: "10px",
          },
          autoStyleContainer: false,
        },
        step: (state, bar) => {
          let perc = Math.round(bar.value() * 100);

          if (perc > 0 && perc < 97) {
            try {
              bar.text.style.transform =
                "translateX(" + bar.value() * window.innerWidth + "px)";
            } catch (e) {}
            bar.setText(perc + "%");
          } else {
            bar.setText("");
          }
        },
      },
    );
}

/**
 * Atualiza as barras de progresso e
 * esconde o botao/menu de materiais ao chegar no fim da pagina
 * caso esteja no celular
 */
function updatePageLayoutOnScroll() {
  let currentY = window.pageYOffset;
  let totalY = document.body.scrollHeight - window.innerHeight;

  //atualiza as progressBars
  progressBar?.animate((currentY / totalY).toFixed(2));
  progressBarT?.animate((currentY / totalY).toFixed(2));

  //esconde o botão do material-menu quando chega no fim
  if (
    currentY == totalY &&
    window.matchMedia("screen and (max-width: 550px)").matches
  ) {
    let mMenu = document.querySelector("#material-menu");
    //mas só se o menu não estiver visível
    if (mMenu && mMenu.classList.contains("hidden")) {
      mMenu.querySelector("#material-menu-toggle")?.classList.add("hidden");
    }
  } else {
    try {
      document
        .querySelector("#material-menu-toggle")
        ?.classList.remove("hidden");
    } catch (e) {}
  }
}

function setCookie(cname, cvalue) {
  window.localStorage.setItem(cname, cvalue);
}

function getCookie(cname) {
  return window.localStorage.getItem(cname);
}

/**
 * Insere a avaliacao da trilha na ultima pagina
 */
function appendAvaliacaoStars() {
  // ---> Avaliação da trilha <---
  if (!isAvaliou && currentPage === "unidade3.html") {
    //hora de avaliar - append no ultimo content-section
    let contentA = document.createElement("div");
    contentA.classList.add("content-avalia", "flex-c", "column");

    contentA.innerHTML = `
     <hr>

     <h3 class="subheader">AVALIE ESTA TRILHA DE APRENDIZAGEM:</h3>

     <div class="classificador-wrapper flex-c">

      <a class="classificador flex-c r5" title="Ótima!" id="classificador-5" onclick="avaliou(event)">
        <i class="material-icons r5">star</i>
      </a>
      <a class="classificador flex-c r4" title="Muito Boa!" id="classificador-4" onclick="avaliou(event)">
        <i class="material-icons r4">star</i>
      </a>
      <a class="classificador flex-c r3" title="Regular" id="classificador-3" onclick="avaliou(event)">
        <i class="material-icons r3">star</i>
      </a>
      <a class="classificador flex-c r2" title="Ruim" id="classificador-2" onclick="avaliou(event)">
        <i class="material-icons r2">star</i>
      </a>
      <a class="classificador flex-c r1" title="Muito Ruim!" id="classificador-1" onclick="avaliou(event)">
        <i class="material-icons r1">star</i>
      </a>

      </div>
    `;

    let contentSec = document.querySelectorAll(".content-section");

    contentSec[contentSec.length - 1].appendChild(contentA);
  }
}

function avaliou(event) {
  let el = event.target;

  while (!el.classList.contains("content-avalia")) {
    el = el.parentElement;
  }

  el.querySelector(".subheader").innerHTML = "Obrigado pela sua avaliação!";
  el.querySelector(".classificador-wrapper").style.display = "none";

  setCookie("avaliou" + currentPath.split("/")[1], true);
}

function popupLivroDigital() {
  let materialMenu = document.querySelector("#material-menu");
  let refDigital = document.querySelector("#material-menu-livro-digital");

  if (!materialMenu?.classList.contains(`estagio`)) {
    if (refDigital) {
      //existe o link para o livro digital, a popup diz que ele esta disponivel
      if (seenPopupChegouLivro == null || seenPopupChegouLivro === "") {
        //append popup style

        let popstyle = document.createElement("link");
        popstyle.rel = "stylesheet";
        popstyle.href = "../css/popup.min.css";

        let styleList = document.getElementsByTagName("link");

        let styleItem = styleList.item(styleList.length - 1);
        styleItem?.parentNode?.insertBefore(popstyle, styleItem);

        //append popup html
        let popupHTML =
          '<div class="popup-material" onclick="closepop()"><div class="popup-balao" onclick="event.stopPropagation()"><p>Acadêmico, o novo <b>Livro Digital</b> já está disponível para esta disciplina. Não deixe de acessar!</p><p>Estamos sempre trabalhando para trazer novos materiais para você. 😄</p><button onclick="closepop()"> Fechar</button></div></div>';

        document.body.insertAdjacentHTML("beforeend", popupHTML);

        // window.addEventListener("click", closepop);

        let el = document.querySelector("#material-menu");
        if (el && el.classList.contains("hidden")) {
          // el.querySelector(".material-icons").innerHTML = "expand_less";
          setCookie("side-menu-visibility", "visible");
          el.classList.remove("hidden");
        }
      }
    } else {
      //nao tem livro digital nessa disciplina,
      //criar o botao que abre uma popup que diz que nao tem livro

      let materialMenu = document.querySelector(`#material-menu`);

      let linkLivro =
        document.querySelector<HTMLAnchorElement>(`#material-menu-livro`)?.href;

      materialMenu?.insertAdjacentHTML(
        `afterbegin`,
        `	<a  id="material-menu-livro-digital"
			class="menu-side-item disabled"
			title="Livro Digital"
			onclick="openLivroWarning()"
			tabindex="-1">
				<img src="/img/ico/livro_digital.svg" alt="Ícone Livro">
				<i class="material-icons">error</i>
    	</a>
	  `,
      );

      document.body.insertAdjacentHTML(
        `beforeend`,
        `
      <div class="popup-livro-warning" onclick="closeLivroWarning()">
        <div class="balao" onclick="event.stopPropagation()">
          <h3>Ops</h3>

          <p>
            Parece que seu <span class="livrod">Livro Digital</span>
            ainda está sendo produzido.
          </p>
          <p>
            Assim que ele estiver disponível avisamos você por aqui,
            enquanto isso, você pode estudar usando o <b>livro em PDF</b>.
          </p>

          <div class="buttons">
            <a onclick="closeLivroWarning()">Fechar</a>
            <a class="livrop" href="${linkLivro}" target="_blank">Livro em PDF</a>
          </div>
        </div>
      </div>
	  `,
      );
    }
  }
}

function closepop() {
  let popup = document.querySelector<HTMLElement>(".popup-material");

  if (popup) {
    popup.style.display = "none";
    popup.innerHTML = "";
  }

  setCookie("popupLivroD" + currentPath.split("/")[1], true);
}

function openLivroWarning() {
  document.querySelector(`.popup-livro-warning`)?.classList.add(`visible`);
}
function closeLivroWarning() {
  document.querySelector(`.popup-livro-warning`)?.classList.remove(`visible`);
}

// !--- TEMPORARIO -- AVISO SEMINARIO

function isOnSemiList(string) {
  //prettier-ignore
  let semiList = ["LEF101", "LEF102", "SOC117", "LEF110", "LEF111", "LEF31", "SOC45", "LEF28", "EMP08", "LOD33", "EMP100", "19246", "17365", "LOD100", "19299", "19350", "ART102", "FIL105", "MAD109", "HID108", "MAD112", "QUI113", "FIL111", "SOC111", "FIL115", "MAD117", "16575", "LED118", "ART111", "ART112", "18543", "18538", "18533", "16794", "ART116", "LES127", "16805", "16810", "16799", "HID114", "ART33", "FIL51", "ENM02", "ENM05", "ECE113", "ECN113", "ENM03", "EEA115", "19261", "17475", "20180", "17586", "19251", "20157", "19437", "17531", "20264", "20201", "17383", "17388", "17398", "20212", "19407", "18559", "18555", "20191", "19293", "17351", "17480", "20172", "17374", "17375", "CPO08", "17471", "19274", "17553", "19321", "19338", "17592", "17558", "17360", "19347", "CPO104", "20164", "19377", "17435", "17408", "CPO04", "BIB111", "16570", "GED114", "19270", "MAD114", "FSA117", "PED24", "17477", "SES03", "HOS44", "APU101", "APU100", "HOS101", "APU07", "APU08", "17526", "LEF103", "LEF112", "LEF32", "TIP102", "EMD100", "CMA17", "GCO09", "ADG46", "ADG100", "CMA100", "HID109", "HID110", "LLI59", "ART105", "ART114", "ART42", "HOS42", "ECN03", "HOS46", "HOS103", "ECN111", "ECN118", "FPS01", "HOS28", "PED100", "LEF107", "PED68", "LES122", "LES125", "LES124", "19318", "ART107", "ART115", "ART43", "QUI111", "QUI117", "QUI119", "QUI114", "GFI101", "GFI100", "CTB33", "GFI19", "MOB103", "CTB101", "17499", "LIN19", "APU05", "GPU43", "CME11", "GPU44", "RHU28", "CME102", "GPU101", "RHU102", "APU103", "GPU100", "17403", "FPM02", "GED100", "SOC102", "LED102", "LED103", "QUI10", "QUI116", "SOC115", "ADG35", "ART44", "CME01", "CTB22", "GED31", "GTI13", "HID11", "LED33", "SOC23", "HID15", "ADG37", "GED25", "SOC100", "HID24", "HID29", "PED19", "ADS04", "CMA13", "CME06", "GFI15", "GPU31", "GPU40", "GTI20", "LOD24", "RHU18", "TIP02", "TEO37", "ADG44", "ADS08", "CTB45", "RHU25", "MOB09", "GPI04", "GFI21", "MOB10", "CTB48", "GFI22", "SEG73", "SEG68", "TEO51", "TEO100", "16517", "FPG02", "FPH02", "FPM04", "FPV02", "FSG02", "FSH02", "FSI02", "FSM05", "FSS02", "FSV02", "FPC02", "TIP03", "16443", "SEG101", "SEG102", "LIN103", "GTI27", "LES115", "LES123", "LES126", "GTI25", "ADS18", "LEE38", "LEE35", "LEE36", "LEE37", "LEE102", "LEE101", "LEE103", "LEE100", "BID106", "BID111", "CTB46", "ART104", "ART113", "16561", "ART36", "TIP06", "TIP04", "TIP101", "TIP10", "GAM33", "GAM39", "FIL100", "FIL114", "FIL48", "FIL50", "TEO45", "TEO09", "TEO06", "CGQ101", "SEG103", "16442", "ENG33", "GPI08", "ECE07", "ENG35", "ENG36", "ENG103", "GPI100", "ENG101", "GPI102", "LEE26", "LEE31", "PED101", "PED104", "PED94", "PED88", "FSA114", "LIN15", "LIN20", "ADS13", "GTI101", "CMA18", "CTB02", "CMA101", "GPI06", "GPI10", "GPI101", "LEF100", "LEF104", "LEF109", "LEF113", "LEF30", "ECN107", "ECN117", "17355", "GAM19", "GAM42", "CTB49", "LED105", "LED106", "LED117", "LED115", "LED116", "TEO49", "TEO50", "TEO08", "19493", "19494", "HID103", "HID111", "HID113", "HID31", "LBR105", "LBR109", "LBR113", "LBR122", "LBR121", "LBR120", "17411", "SES01", "LEE22", "HID112", "HID30", "PED62", "MOB101", "GAM23", "GAM28", "19403", "GAM100", "GAM03", "GFI20", "CTB47", "GFI102", "CTB100", "GSA108", "GSA104", "GSA09", "GTU20", "GTU21", "GTU102", "GTU101", "GED105", "GED115", "RHU26", "RHU27", "RHU101", "RHU100", "BID32", "BID33", "CGQ11", "EEA113", "SEG104", "CGQ102", "19381", "EMD27", "GCO10", "EMP10", "GCO11", "GCO01", "EMP102", "GCO07", "MAD113", "TIP05", "TIP100", "LBR09", "LBR118", "LBR12", "LBR123", "GAM101", "LED113", "LED114", "LLI44", "LLI62", "LLI102", "LLI101", "LLI105", "18551", "18546", "SEC08", "LOD32", "ECN102", "ECN116", "LOD01", "QUI115", "SOC108", "FIL108", "SOC119", "FIL52", "SOC48", "TEO75", "CPO01", "TEO101", "ENG34", "ENG102", "MAD115", "MAD116", "BID107", "BID109", "AGR22", "AGR23", "AGR25", "AGR101", "AGR103", "AGR102", "AGR24", "ECE03", "ECE102", "EEA01", "SOC118", "SOC47", "CPO101", "ADS22", "ADS102", "FSC02", "BID07", "BID108", "BID30", "BID31", "BID34", "AGR100", "FSM03", "LLI60", "LLI61", "LLI104", "LLI103", "APU03", "CME09", "APU06", "CME100", "LBR04", "LEE28", "LBR119", "PED102", "PED78", "HOS43", "CME10", "HOS100", "CME101", "LLI63", "LEF02", "LEF108", "LEF01", "LEF09", "BIB110", "LEE33", "PED98", "PED93", "ADS26", "GTI100", "ADS103", "ENG31", "ENM01", "ENG09", "GTI26", "LIN101", "LIN109", "LIN110", "LIN10", "GTI07", "PED71", "LEE24", "LEE34", "LEE07", "GPU42", "HOS45", "HOS102", "GPU03", "16800", "16791", "LIN102", "GTI28", "ADG48", "ADG50", "ADG102", "ADG101", "BIB112", "GED117", "GED113", "GED29", "ADS101", "ADS100", "CMA19", "GTU22", "LOD34", "LOD101", "CMA102", "GTU103", "FSA115", "FSA116", "19433", "EEA114", "CGQ100", "MOB102", "ENG100", "SOC116", "FIL49", "SOC44", "FSA112", "SEC05", "SEC01", "GED116", "GED28", "EMD21", "ADG52", "EMD101", "ADG103", "EMD22", "ADG54", "EMD102", "HOS23", "ADG41", "HOS41", "EMD26", "LOD31", "EMD15", "ENG29", "ENG30", "19956", "MOB100", "LEE29", "PED103", "17413", "PED83", "ART100", "16565", "ART29", "19289", "16786", "18531", "17467", "EMP09", "ECN08", "ECN115", "EMP101"];

  for (let i = 0; i < semiList.length; i++) {
    if (string == semiList[i]) return true;
  }
  return false;
}

function seminarioAddIns() {
  if (
    (currentDisciplina?.includes(`seminario`) ||
      currentDisciplina?.includes(`pratica`)) &&
    isOnSemiList(currentDisciplina.split(`_`)[0])
  ) {
    if (currentPage == `apresentacao.html`) {
      //mostrar popup
      document.body.insertAdjacentHTML(
        `beforeend`,
        `
            <div
                class="popup-seminario visible"
                onclick="closeSeminarioWarning()"
            >
                <div class="balao" onclick="event.stopPropagation()">
                    <h3 style="font-weight:bold;margin-bottom: 2em">
                        Comunicado para disciplinas de Seminário
                        Interdiscipinar, Seminário da Prática e Prática
                        Interdisciplinar
                    </h3>

                    <p>
                        Buscando oferecer ainda mais qualidade em sua graduação
                        EAD, o modelo de oferta 100% Flex foi alterado para Flex
                        Curso. <u>Mas, o que isso muda?</u> Agora você consegue
                        interagir com colegas que estão no mesmo curso e o tutor
                        também será exclusivo para o curso de vocês,
                        proporcionando um maior domínio de conhecimento. Desta
                        forma, a Uniasselvi designa que <b>a realização da pesquisa
                            e a escrita do paper deve ser realizada em grupo de 3 a
                            5 acadêmicos</b>. Este encaminhamento tem amparo nos pilares
                        da Educação da UNESCO que permeiam o projeto pedagógico
                        de todos os cursos:
                    </p>
                    <ul>
                        <li>
                            <u>Aprender a aprender</u> - A pesquisa que resulta na
                            escrita do paper colabora muito no desenvolvimento
                            de competências pessoais para que a aprendizagem
                            aconteça ao longo de toda a vida.
                        </li>
                        <li>
                            <u>Aprender a fazer</u> – A relação da teoria com a prática
                            que ocorre durante a pesquisa e a escrita do paper,
                            desenvolve competências que proporcionam a
                            capacidade de aplicar a teoria(ciência) às situações
                            do dia-a-dia do acadêmico durante toda a sua vida.
                            Ou seja, é a teoria contribuindo para elucidar a
                            prática consolidando uma prática transformadora.
                        </li>
                        <li>
                            <u>Aprender a ser</u> – O nível mais aprofundado de
                            compreensão de um conteúdo é o “julgamento”, segundo
                            Zaballa (1998). Ou seja, a aprendizagem efetiva
                            promove no acadêmico a capacidade da argumentação e
                            do posicionamento frente às situações do dia-a-dia.
                        </li>
                        <li>
                            <u>Aprender a conviver</u> – O relacionamento interpessoal
                            é essencial para vivermos em comunidade e,
                            especialmente, no campo profissional, é a
                            competência mais observada nos processos seletivos e
                            na fidelização do colaborador em uma empresa. É
                            preciso aprender a pensar e a trabalhar em grupo. É
                            preciso aprender a lidar com as diferenças de
                            posicionamentos, de saberes e de culturas.
                        </li>
                    </ul>
                    <p style="padding: 16px; box-shadow: 0 0 0 2px #eee;border-radius:10px;margin:2em 0">
                        É com este fundamento educacional que a Uniasselvi
                        define que todas as atividades das disciplinas de
                        Seminário Interdisciplinar, Prática Interdisciplinar e
                        Seminário da prática sejam realizadas em grupos de 3 a 5
                        integrantes.
                    </p>
                    <p>
                        Quanto a socialização também deverá ser realizada em
                        grupo no encontro, ao final do semestre, de acordo com
                        as orientações do seu tutor externo.
                    </p>
                    <p>
                        Por fim, tendo como pano de fundo os pilares acima
                        reafirmamos para você acadêmico que a oportunidade de
                        realizar um trabalho em equipe requer pensar juntos onde
                        cada integrante apresenta os argumentos (convence ou é
                        convencido) e juntos tomam decisões consensuais.
                        Trabalho em grupo não é distribuição de tarefas e sim
                        socialização de aprendizagem.
                    </p>
                    <p>
                        Destacamos que as trilhas de aprendizagem estão sendo
                        atualizadas de acordo com esta métrica de grupos, sendo
                        que a orientação sobre a formação de grupos é esta
                        apresentada neste comunicado.
                    </p>

                    <p>Atenciosamente, Uniasselvi</p>

                    <button onclick="closeSeminarioWarning()">Fechar</button>
                </div>
            </div>
            `,
      );

      //inserir tambem o manual de praticas para o teams no final
      let texts = document.querySelectorAll(`.content-text`);

      texts[texts.length - 1].insertAdjacentHTML(
        `beforeend`,
        `
            <div class="dica-leitura">
                <img
                    src="/img/ico/modelo_outline.svg"
                    alt="Dica de Leitura"
                />
                <p>
                    Buscando apoiar nossos alunos no momento da
                    realização de seu paper em equipe,
                    elaboramos este manual com orientações para
                    utilização do TEAMS, como a ferramenta que
                    permite a realização de encontro virtual
                    para discussão, elaboração e
                    compartilhamento de seu trabalho. Aproveite
                    as dicas!
                </p>
                <a
                    class="content-link flex-c"
                    href="https://trilhaaprendizagem.uniasselvi.com.br/docs/manual_teams.pdf"
                    target="_blank"
                >
                    <i class="material-icons">description</i>
                    <span
                        >Manual do Teams para trabalho em
                        equipe</span
                    >
                </a>
            </div>
        `,
      );
    } else if (
      currentPage == `unidade3.html` &&
      //nao incluir em trilhas de gastronomia
      currentDisciplina.indexOf(`GSA09`) < 0 &&
      currentDisciplina.indexOf(`GSA108`) < 0 &&
      currentDisciplina.indexOf(`GSA104`) < 0
    ) {
      //templates de socializacao ao fim
      let texts = document.querySelectorAll(`.content-text`);

      texts[texts.length - 1].insertAdjacentHTML(
        `beforeend`,
        `
            <div class="dica-leitura">
                <img
                    src="/img/ico/modelo_outline.svg"
                    alt="Templates"
                />
                <p>
                    Buscando apoiar nossos alunos no momento da
                    socialização,
                    elaboramos alguns templates para que você possa utilizar!
                </p>

                <p>Acesse a seguir o template referente ao módulo desta disciplina.</p>
                <a
                    class="content-link flex-c"
                    href="../docs/templates/socializacao/Templates_Socialização_Seminario_modulo_II.pptx"
                    target="_blank"
                >
                    <i class="material-icons">description</i>
                    <span
                        >Templates de Socialização - Modulo II</span
                    >
                </a>
                <a
                    class="content-link flex-c"
                    href="../docs/templates/socializacao/Templates_Socialização_Seminario_modulo_III.pptx"
                    target="_blank"
                >
                    <i class="material-icons">description</i>
                    <span
                        >Templates de Socialização - Modulo III</span
                    >
                </a>
                <a
                    class="content-link flex-c"
                    href="../docs/templates/socializacao/Templates_Socialização_Seminario_modulo_IV.pptx"
                    target="_blank"
                >
                    <i class="material-icons">description</i>
                    <span
                        >Templates de Socialização - Modulo IV</span
                    >
                </a>
                <a
                    class="content-link flex-c"
                    href="../docs/templates/socializacao/Templates_Socialização_Seminario_modulo_V.pptx"
                    target="_blank"
                >
                    <i class="material-icons">description</i>
                    <span
                        >Templates de Socialização - Modulo V</span
                    >
                </a>
                <a
                    class="content-link flex-c"
                    href="../docs/templates/socializacao/Templates_Socialização_Seminario_modulo_VI.pptx"
                    target="_blank"
                >
                    <i class="material-icons">description</i>
                    <span
                        >Templates de Socialização - Modulo VI</span
                    >
                </a>
                <a
                    class="content-link flex-c"
                    href="../docs/templates/socializacao/Templates_Socialização_Seminario_modulo_VII_demais.pptx"
                    target="_blank"
                >
                    <i class="material-icons">description</i>
                    <span
                        >Templates de Socialização - Modulo VII e demais</span
                    >
                </a>

            </div>
        `,
      );
    }
  }
}
function closeSeminarioWarning() {
  document.querySelector(`.popup-seminario`)?.classList.remove(`visible`);
}

/**
 * torna a pagina navegavel por teclado
 */
//TODO -- review novos objetos tabnav
function tabify() {
  //adiciona a barra superior na ordem de tabulacao
  document
    .querySelectorAll(
      ".top-unidade, .subheader, .header, .content-text p, .content-text span, .content-text img, .text-large, .button-next, .content-unidade,  .ex-enun, .ex-alts",
    )
    .forEach((el) => {
      el.setAttribute("tabindex", "0");
    });

  //remove os elementos escondidos da navegacao
  document
    .querySelectorAll(
      ".menu-side-item, .accessibility-item, .objeto *, .dica-leitura > img, .material-icons",
    )
    .forEach((el) => {
      el.setAttribute("tabindex", "-1");
    });
}

function hideMenuIfCookie() {
  if (getCookie("side-menu-visibility") === "visible") {
    try {
      document.querySelector("#material-menu")?.classList.remove("hidden");
      // document.querySelector("#material-menu .material-icons").innerHTML =
      // 	"expand_less";
    } catch (e) {}
  }
}

// ---> hotjar inject
function injectHotjar() {
  (function (h, o, t, j, a, r) {
    //@ts-ignore
    h.hj =
      //@ts-ignore
      h.hj ||
      function () {
        //@ts-ignore
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    //@ts-ignore
    h._hjSettings = { hjid: 1890312, hjsv: 6 };
    //@ts-ignore
    a = o.getElementsByTagName("head")[0];
    //@ts-ignore
    r = o.createElement("script");
    //@ts-ignore
    r.async = 1;
    //@ts-ignore
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    //@ts-ignore
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
}

//headers do request desmembrados
let eh = [
  `thor`,
  `{`,
  `-Request-Method\"`,
  `: \"post\",`,
  `\"Content-Type\"`,
  `: \"application/json\",`,
  `c3VwZXJ1c2Vy"`,
  `\"Au`,
  `ization\":`,
  `\"Basic YWRtaW46`,
  `\"Access-Control`,
  `}`,
];

// ---> pegar a nota do simulado e dar append
/**
 * mostra o desempenho no simulado abaixo do nome da unidade
 * @returns
 */
async function getSimuladoGrade() {
  // --> Organiza o body do request
  let requestBody: EvolucaoRequest;

  //se nao esta numa unidade cai fora
  let unidade = currentPage?.substr(7, 1);
  if (unidade != `1` && unidade != `2` && unidade != `3`) return;

  //se nao tem info do aluno cai fora
  let idString = getCookie(`id-${currentDisciplina}`);
  if (!idString) return;

  let decodedString: Aluno = JSON.parse(atob(idString)) as Aluno;

  requestBody = {
    aluno: decodedString.matricula,
    semestre: currentSemester,
    disciplina: decodedString.disciplina,
    tipo: "2",
    index: [unidade],
  };

  // --> fetch
  let response;
  try {
    response = await fetch(
      `https://api.uniasselvi.com.br/evolucao-disciplina/busca-valor-index`,
      {
        method: `post`,
        headers: JSON.parse(
          //prettier-ignore
          eh[1]+eh[10]+eh[2]+eh[3]+eh[4]+eh[5]+eh[7]+eh[0]+eh[8]+eh[9]+eh[6]+eh[11],
        ),
        body: JSON.stringify(requestBody),
      },
    );
  } catch (err) {
    console.log(`could not get grades`);
  }

  if (response && response.ok) {
    let data = await response.json();

    let morphedJson = {};
    data.resultado.map((item) => (morphedJson[item.index] = item.porcentagem));
    desempenho = morphedJson;

    //inserir no dom o resutado
    let header = document.querySelector(`.header`);

    if (desempenho && desempenho[unidade] != `-`) {
      header &&
        header.insertAdjacentHTML(
          `afterend`,
          `
					<div class="has-grade">
						<div class="grade" >
							<i class="material-icons">assessment</i>
							<span>Seu desempenho nesta unidade foi</span>
							<div class="grade-bar"></div>
						</div>
					</div>
					`,
        );

      let gradeBar = new ProgressBar.Circle(
        document.querySelector(".grade-bar"),
        {
          strokeWidth: 8,
          easing: "easeInOut",
          duration: 1000,
          color: `#231f20`,
          trailWidth: 1,
          trailColor: `#231f20`,
          text: {
            autoStyleContainer: false,
          },
          from: { color: "#f00" },
          to: { color: "#32ba2b" },
          step: function (state, circle) {
            circle.path.setAttribute("stroke", state.color);

            let value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText("");
            } else {
              circle.setText(value + `%`);
            }
          },
        },
      );
      gradeBar.text.style.fontSize = ".7em";

      gradeBar.animate(parseInt(desempenho[unidade]) / 100);
    } else {
      //nao tem resposta ou deu erro, mostrar botao pra fazer o simulado
      //TODO -- quando tiver a API de simulado
      // header &&
      // 	header.insertAdjacentHTML(
      // 		`afterend`,
      // 		`
      // 		<div class="has-grade">
      // 			<div class="grade" title="Sua nota no simulado desta unidade">
      // 				<i class="material-icons">assessment</i>
      // 				<a href="">Clique aqui para realizar o simulado desta unidade</a>
      // 			</div>
      // 		</div>`
      // 	);
    }
  }
}

/**
 * atualiza o localstorage com infos do aluno e personaliza a pagina com o nome dele
 */
async function identificaAcademico() {
  let changedIDs = false;
  //? se tiver `param` no get, salvar
  if (currentURL.searchParams.has(`param`)) {
    let avaParameter = currentURL.searchParams.get(`param`) ?? ``;

    identificacao = avaParameter;

    if (getCookie(`id-${currentDisciplina}`) != identificacao) {
      changedIDs = true;
    }

    setCookie(`id-${currentDisciplina}`, avaParameter);
  } else {
    identificacao = getCookie(`id-${currentDisciplina}`);
  }

  if (identificacao) {
    //adiciona o param nos links para o livro digital
    let livroElement = document.querySelector<HTMLAnchorElement>(
      `#material-menu-livro-digital`,
    );
    if (livroElement) {
      let newHref = (livroElement.href += `&param=${identificacao}`);

      livroElement.setAttribute(`href`, newHref);
    }

    //converte a string em um objeto
    let info = JSON.parse(atob(identificacao));
    let primeiroNome = info.nome.substr(0, info.nome.indexOf(" "));
    let header;

    if (currentPage == `` || currentPage == `inicio.html`) {
      header = document.querySelector<HTMLElement>(`.header`);
      if (header) {
        header.innerHTML = `${primeiroNome}, bem-vindo(a)`;
        header.style.letterSpacing = `.4px`;
      }
    } else if (currentPage == `apresentacao.html`) {
      header = document.querySelector<HTMLElement>(`.subheader`);
      if (header) {
        header.innerHTML = `Olá, ${primeiroNome}!`;
        header.style.color = `var(--uniasselvi-accent)`;
        header.style.fontWeight = `bold`;
        header.style.letterSpacing = `.4px`;
        header.style.padding = `16px`;
        header.style.textTransform = `capitalize`;
      }
    }

    //checa se tem o semestre salvo, se nao, busca na api e salva
    let semesterCookie = getCookie(`id-${currentDisciplina}-semester`);

    //preciso verificar tambem se nao e outra pessoa acessando,
    //por isso o changedIDs
    if (semesterCookie && semesterCookie != `undefined` && !changedIDs) {
      currentSemester = semesterCookie;
    } else {
      let requestBody = {
        disciplina: info.disciplina,
        aluno: info.matricula,
        turma: info.turma,
        tipo: `2`,
      };

      let r;
      let studentInfo;

      try {
        r = await fetch(
          `https://api.uniasselvi.com.br/evolucao-disciplina/busca-valor-index`,
          {
            method: `post`,
            //prettier-ignore
            headers: JSON.parse(//prettier-ignore
						eh[1] +eh[10] +eh[2] +eh[3] +eh[4] +eh[5] +eh[7] +eh[0] +eh[8] +eh[9] +eh[6] +eh[11]),
            body: JSON.stringify(requestBody),
          },
        );

        studentInfo = await r.json();
      } catch (error) {
        console.log(`could not get student info`);
      }

      if (studentInfo) {
        //salva em storage
        setCookie(
          `id-${currentDisciplina}-semester`,
          studentInfo.resultado[0].semestre,
        );

        currentSemester = studentInfo.resultado[0].semestre;
      }
    }
  }
}

/**
 * Busca o sumario da unidade atual na API
 * @returns um objeto com key:values sendo index:descricao do sumario
 */
async function getSumario() {
  //prettier-ignore
  const eh = [
		`thor`,`{`,`-Request-Method\"`,`: \"application/json\",`,`c3VwZXJ1c2Vy"`,`: \"post\",`,	`\"Content-Type\"`,	`\"Au`,	`sic YWRta`,`\"Access-Control`,`ization\":\"Ba`,`}`,`W46`,
	];

  let requestBody = {
    disciplina: currentDisciplina.split(`_`)[0],
    tipo: "2",
    index: [currentPage?.substr(7, 1)],
  };

  let res;
  let j;
  try {
    res = await fetch(
      `https://api.uniasselvi.com.br/evolucao-disciplina/busca-valor-index-descricao`,
      {
        method: `post`,
        headers: JSON.parse(
          //prettier-ignore
          eh[1]+eh[9]+eh[2]+eh[5]+eh[6]+eh[3]+eh[7]+eh[0]+eh[10]+eh[8]+eh[12]+eh[4]+eh[11],
        ),
        body: JSON.stringify(requestBody),
      },
    );

    j = await res.json();
  } catch (error) {
    console.log(`could not get sumario`);
  }

  if (j && j.hasOwnProperty(`resultado`)) {
    let morphedJson = {};
    j.resultado.map((item) => (morphedJson[item.index] = item.descricao));
    return morphedJson;
  }
}
/**
 * adiciona nos conteudos tageados a indicacao de sumario
 */
async function injectIndexTags() {
  //ver se esta tageado
  //se ta, puxa o sumario
  //passar por cada item dando append

  let tagged = document.querySelectorAll<HTMLElement>(`*[data-sumario]`);

  if (tagged.length > 0) {
    sumario = await getSumario();

    let processedIndexes = [""];

    tagged.forEach((el) => {
      let tagIndex = el.getAttribute(`data-sumario`);

      if (
        tagIndex &&
        sumario &&
        sumario[tagIndex] &&
        processedIndexes.indexOf(tagIndex) == -1
      ) {
        let sumWrapper = document.createElement(`div`);
        sumWrapper.classList.add(`sumario-wrapper`);

        let strokeColor = `#81c784`;

        if (desempenho && desempenho[tagIndex] && desempenho[tagIndex] != `-`) {
          if (desempenho[tagIndex] < 90) {
            if (desempenho[tagIndex] < 80) {
              if (desempenho[tagIndex] < 70) {
                strokeColor = "#e57373";
              } else {
                strokeColor = "#ffb74d";
              }
            } else {
              strokeColor = "#64b5f6";
            }
          }
        }

        let nUnidade = currentPage?.substr(7, 1);
        let titleString = `Unidade ${nUnidade}`;
        let brokenTag = tagIndex.split(`.`);
        if (brokenTag.length > 1) {
          titleString += ` - Tópico ${brokenTag[1]}`;
        }

        let livroString = ``;
        let livroDigitalElement = document.querySelector(
          `#material-menu-livro-digital`,
        );
        if (livroDigitalElement) {
          let livroURL = new URL(
            //@ts-ignore
            livroDigitalElement.getAttribute(`href`),
          );
          livroURL.searchParams.delete(`param`);

          //@ts-ignore
          livroURL.searchParams.append(`unidade`, nUnidade);

          if (brokenTag.length > 1) {
            //adicionar topico no link
            //@ts-ignore
            livroURL.searchParams.append(`topico`, brokenTag[1]);

            if (brokenTag.length > 2) {
              //adicionar header no link
              let currentTagIndex = Object.keys(sumario).indexOf(tagIndex);
              let topicoTagIndex = Object.keys(sumario).indexOf(
                `${brokenTag[0]}.${brokenTag[1]}`,
              );
              //@ts-ignore
              livroURL.searchParams.append(
                `h`,
                (currentTagIndex - topicoTagIndex - 1).toString(),
              );
            }
          }

          //@ts-ignore
          livroURL.searchParams.append(`param`, identificacao);

          livroString = `
                    	<div class="link-livro">
                    		<a href="${livroURL}" target = "_blank" >
                    			<span>Ler no Livro Digital</span>
                    			<i class="material-icons">keyboard_arrow_right</i>
                    		</a>
                    	</div>
                    	`;
        }

        sumWrapper.innerHTML = `
					<div class="sumario-indicador" tabindex="0">
						${
              desempenho &&
              desempenho[tagIndex] &&
              desempenho[tagIndex] != `-` &&
              desempenho[tagIndex] > 0
                ? `
						<div class="item-desempenho" title="Seu desempenho neste assunto">
							<svg>
								<circle class="track" cx=16 cy=16 r=12></circle>
								<circle class="runner" cx=16 cy=16 r=12 style="stroke-dashoffset: ${
                  (1 - desempenho[tagIndex] / 100) * 12 * 2 * Math.PI
                }; stroke: ${strokeColor}"></circle>
							</svg>
							<span>${Math.floor(desempenho[tagIndex])}</span>
						</div>
								`
                : `
						<div class="item-desempenho" title="Seu desempenho neste assunto">
							<svg>
								<circle class="track" cx=16 cy=16 r=12></circle>
							</svg>
							<span>-</span>
						</div>
								`
            }

						<div class="sumario-texto">
							<div class="sumario-titulo">
								<span>${titleString}</span>
							</div>

							<div class="sumario-nome">
								<span>${sumario[tagIndex]}</span>
							</div>

							${livroString}
							 <!-- <a>Responder Questões</a>-->
						</div>
					</div>
				`;

        if (el.classList.contains(`objeto`) || el.classList.contains(`video`)) {
          el.insertAdjacentElement(`afterbegin`, sumWrapper);
        } else {
          el.insertAdjacentElement(`afterend`, sumWrapper);
          sumWrapper.appendChild(el);
        }

        processedIndexes.push(tagIndex);
      }
    });
  }
}

/**
 *   pagina de videos nova
 */
async function buildVideosPage() {
  if (currentPage === `videos.html` || currentPage === `videos_e.html`) {
    cleanupOldLayout();
    let pages = await fetchContentPages(currentPage === "videos_e.html");
    let videos = await extractVideoIDsFromHTML(pages);
    appendVideosToPage(videos);
  }
}
/**
 *   pagina de objetos nova
 */
async function buildObjetosPage() {
  if (currentPage === `objetos.html` || currentPage === `objetos_e.html`) {
    cleanupOldLayout();
    let pages = await fetchContentPages(currentPage === "objetos_e.html");
    let objetos = await extractObjetosFromHTML(pages);
    appendObjetosToPage(objetos);
  }
}

function cleanupOldLayout() {
  if (currentPage === "videos.html" || currentPage === `videos_e.html`) {
    let playlistCss = document.createElement("link");
    playlistCss.rel = "stylesheet";
    playlistCss.href = "../css/playlist.min.css";
    var putBefore = document.getElementsByTagName("link")[0];
    //@ts-ignore
    putBefore.parentNode.insertBefore(playlistCss, putBefore);

    document.querySelector(`.content-page`)?.classList.add(`content-videos`);
  } else if (
    currentPage === `objetos.html` ||
    currentPage === `objetos_e.html`
  ) {
    document.querySelector(`.content-page`)?.classList.add(`content-objetos`);
  }

  let headerG = document.querySelector(`.header-gradient`);
  headerG?.parentElement?.removeChild(headerG);

  let nomeDisciplina = document.querySelector(`.subheader`);
  if (nomeDisciplina)
    document.querySelector(`.title-big`)?.appendChild(nomeDisciplina);

  let contentSection = document.querySelector<HTMLElement>(".content-section");

  if (contentSection) {
    contentSection.style.marginTop = "";
  }

  let cText = document.querySelector(".content-section .content-text");
  if (cText) cText.innerHTML = ``;

  document.querySelectorAll(`.content-wide`)?.forEach((cWide) => {
    cWide.parentElement?.removeChild(cWide);
  });
}

/**
 * busca as paginas que tem conteudo nesta trilha
 * @returns uma array com o html das paginas apresentacao, uni1, 2 e 3
 */
async function fetchContentPages(isEstagio = false) {
  let pagePromises: any[] = [];
  let prefix = currentURL
    .toString()
    .substring(0, currentURL.toString().lastIndexOf(`/`));

  //a pagina de videos das trilhas de estagio sao outras
  let pageNames = isEstagio
    ? ["modelo_pandemia", "etapa_i", "etapa_ii", "etapa_iii", "etapa_iv"]
    : ["apresentacao", "unidade1", "unidade2", "unidade3"];

  for (let i = 0; i < pageNames.length; i++) {
    //crio uma promise de fetch para cada pagina da lista
    pagePromises.push(
      fetch(`${prefix}/${pageNames[i]}.html`).then((response) => {
        return response.text();
      }),
    );
  }

  //a funcao retorna quando todos fetches forem resolvidos
  return Promise.all(pagePromises);
}
interface IDList {
  page: string;
  videos: any[];
}

/**
 * retorna todos os ids de videos da uniasselvi nas paginas passadas como paramentro
 * @param pages um array de paginas html em texto
 * @returns um array de IDList
 */
async function extractVideoIDsFromHTML(pages) {
  let videos: IDList[] = [];

  pages.forEach((aPage) => {
    let doc = new DOMParser().parseFromString(aPage, "text/html");

    let thisPage: IDList = {
      page: doc.title.split(`-`)[0],
      videos: [] as any[],
    };

    let lastpushedID: any = ``;

    doc.querySelectorAll(`.video iframe, .video-item`).forEach((element) => {
      if (element.hasAttribute(`src`)) {
        let embedURL = element.getAttribute(`src`);
        let ytID = embedURL?.substr(embedURL.indexOf(`embed/`) + 6, 11);

        thisPage.videos.push(ytID);
        lastpushedID = ytID;
      } else if (element.hasAttribute(`data-src`)) {
        let embedURL = element.getAttribute(`data-src`);
        let ytID = embedURL?.substr(embedURL.indexOf(`embed/`) + 6, 11);

        thisPage.videos.push(ytID);
        lastpushedID = ytID;
      }

      if (element.hasAttribute(`data-alt-url`)) {
        let embedURL = element.getAttribute(`data-alt-url`);
        let ytID = embedURL?.substr(embedURL.indexOf(`embed/`) + 6, 11);

        thisPage.videos.push(ytID);
        lastpushedID = ytID;
      }

      if (
        element.hasAttribute(`data-videoid`) &&
        element.getAttribute(`data-videoid`) != lastpushedID
      ) {
        thisPage.videos.push(element.getAttribute(`data-videoid`));
      }
    });
    if (thisPage.videos.length > 0) videos.push(thisPage);
  });

  videos.sort((a, b) => (a.page < b.page ? 1 : -1));

  return videos;
}

async function appendVideosToPage(videos: IDList[]) {
  console.log(videos);

  let contentSection = document.querySelector<HTMLElement>(".content-section");

  if (videos.length > 0) {
    videos.forEach((vPage) => {
      if (vPage.videos.length > 0) {
        let playlistWrapper = document.createElement(`div`);
        playlistWrapper.classList.add(`video-playlist-wrapper`);

        playlistWrapper.innerHTML = `
				<div class="page-titulo">
					<h2>${vPage.page}</h2>
				</div>

				${
          vPage.videos.length > 1
            ? `
				<div class="playlist">
					<div class="video">
						<div class="video-large">
							<iframe title="Vídeo da Disciplina" width="1280" height="720" src="https://www.youtube.com/embed/${
                vPage.videos[0]
              }?rel=0&amp;showinfo=0&amp;disablekb=1&amp;modestbranding=1&amp;allowfullscreen=1" allowfullscreen="true"></iframe>
						</div>
					</div>

					<div class="itens-list">
						${vPage.videos
              .map(
                (videoid) =>
                  `<div class="video-item" data-videoid="${videoid}" onclick="loadVideo(this)">
									<img src="https://img.youtube.com/vi/${videoid}/0.jpg" draggable="false">
									<i class="material-icons">play_circle_outline</i>
								</div>`,
              )
              .join(` `)}
					</div>
				</div>
					`
            : `
				<div class="video">
					<div class="video-large">
						<iframe title="Vídeo da Disciplina" width="1280" height="720" src="https://www.youtube.com/embed/${vPage.videos[0]}?rel=0&amp;showinfo=0&amp;disablekb=1&amp;modestbranding=1&amp;allowfullscreen=1" allowfullscreen="true"></iframe>
					</div>
				</div>
				`
        }

			`;

        contentSection?.insertAdjacentElement(`afterend`, playlistWrapper);
      }
    });

    document.querySelectorAll(`.video-item:first-child`).forEach((e) => {
      e.classList.add(`selected`);
    });
  } else {
    // -- mensagem sem videos

    contentSection?.insertAdjacentHTML(
      `afterend`,
      `<div class="content-text">
				<h2>Ops!</h2>

				<p>Sua trilha ainda não tem vídeos disponíveis 😕</p>

				<p>
					Assim que novos vídeos forem adicionados eles irão aparecer nesta
					página.
				</p>
			</div>`,
    );
  }
}

interface ObjList {
  page: string;
  objetos: string[];
}

async function extractObjetosFromHTML(pages) {
  let objetos: ObjList[] = [];

  pages.forEach((aPage) => {
    let doc = new DOMParser().parseFromString(aPage, "text/html");

    let thisPage: ObjList = {
      page: doc.title.split(`-`)[0],
      objetos: [] as string[],
    };

    doc.querySelectorAll(`.objeto`).forEach((element) => {
      thisPage.objetos.push(element.innerHTML);
    });

    if (thisPage.objetos.length > 0) objetos.push(thisPage);
  });

  objetos.sort((a, b) => (a.page < b.page ? 1 : -1));

  return objetos;
}

async function appendObjetosToPage(objetos: ObjList[]) {
  let contentSection = document.querySelector<HTMLElement>(".content-section");

  if (objetos.length > 0) {
    objetos.forEach((oPage) => {
      if (oPage.objetos.length > 0) {
        oPage.objetos.forEach((objeto) => {
          contentSection?.insertAdjacentHTML(
            `afterend`,
            `
						<div class="objeto">
							${objeto}
						</div>
					`,
          );
        });

        contentSection?.insertAdjacentHTML(
          `afterend`,
          `
					<div class="page-titulo">
						<h2>${oPage.page}</h2>
					</div>
				`,
        );
      }
    });
  } else {
    // -- mensagem sem objetos

    contentSection?.insertAdjacentHTML(
      `afterend`,
      `<div class="content-text">
			<h2>Ops!</h2>

			<p>Sua trilha ainda não tem Objetos de Aprendizagem disponíveis 😕</p>

			<p>
				Assim que novos Objetos forem adicionados eles irão aparecer nesta
				página.
			</p>
		</div>`,
    );
  }
}

function loadAdditionalFonts() {
  let putBefore = document.getElementsByTagName("link")[0];

  let neoSans = document.createElement("link");
  neoSans.rel = "stylesheet";
  neoSans.href = "https://use.typekit.net/tdl4wcy.css";
  //@ts-ignore
  putBefore.parentNode.insertBefore(neoSans, putBefore);

  let materialIcons = document.createElement("link");
  materialIcons.rel = "stylesheet";
  materialIcons.href =
    "https://fonts.googleapis.com/icon?family=Material+Icons";
  //@ts-ignore
  putBefore.parentNode.insertBefore(materialIcons, putBefore);
}

async function appendObjetoMenu() {
  let objs = document.querySelectorAll<HTMLFrameElement>(`.objeto iframe`);

  if (objs)
    objs.forEach((obj) => {
      let avaliaHtml = ``;

      let objURL;

      try {
        //@ts-ignore
        objURL = new URL(obj.getAttribute(`data-src`));
      } catch (err) {
        //@ts-ignore
        objURL = new URL(obj.getAttribute(`src`));
      }

      if (objURL) {
        let objCode: any = objURL.href;

        if (objURL.searchParams.has(`codigo`)) {
          objCode = objURL.searchParams.get(`codigo`);
        }

        if (objCode) {
          let objAvaliado = getCookie(
            `avaliou-${currentDisciplina}-${objCode}`,
          );

          if (objAvaliado === null) {
            //inserir avaliacao

            avaliaHtml = `
							<div class="obj-avalia">
								<button class="obj-avalia-open" onclick="toggleObjMenu(this)">
									<i class="material-icons">star_outline</i>
									<span>&ensp;Avaliar</span>
								</button>

								<div class="obj-stars">
									<button onclick="avaliouObj(this, ${objCode}, 5)">
										<i class="material-icons outline">star_outline</i>
										<i class="material-icons fill">star</i>
									</button>
									<button onclick="avaliouObj(this, ${objCode}, 4)">
										<i class="material-icons outline">star_outline</i>
										<i class="material-icons fill">star</i>
									</button>
									<button onclick="avaliouObj(this, ${objCode}, 3)">
										<i class="material-icons outline">star_outline</i>
										<i class="material-icons fill">star</i>
									</button>
									<button onclick="avaliouObj(this, ${objCode}, 2)">
										<i class="material-icons outline">star_outline</i>
										<i class="material-icons fill">star</i>
									</button>
									<button onclick="avaliouObj(this, ${objCode}, 1)">
										<i class="material-icons outline">star_outline</i>
										<i class="material-icons fill">star</i>
									</button>
								</div>

								<div class="obj-avaliou">
									<span>Obrigado!</span>
								</div>
							</div>
						`;
          }
        }
      }

      let menuHtml = `
				<div class="obj-menu">
					<button class="obj-menu-toggle" onclick="toggleObjMenu(this)">
						<i class="material-icons menu-icon">more_vert</i>
						<i class="material-icons close-icon">close</i>
					</button>

					<div class="menu-content">
						${avaliaHtml}
						<div class="obj-share">
							<button class="obj-share-toggle" onclick="showShareButtons(this)">
								<i class="material-icons">share</i>
							</button>
							<div class="obj-share-items">
								<a href="https://www.addtoany.com/add_to/facebook?linkurl=${objURL}&amp;linkname=" target="_blank"><img src="https://static.addtoany.com/buttons/facebook.svg"></a>

								<a href="https://www.addtoany.com/add_to/whatsapp?linkurl=${objURL}&amp;linkname=" target="_blank"><img src="https://static.addtoany.com/buttons/whatsapp.svg"></a>
							</div>
						</div>
						${
              document.fullscreenEnabled
                ? ` <button onclick="goBig(this)">
										<i class="material-icons">fullscreen</i>
									</button>`
                : ``
            }

					</div>
				</div>
			`;

      let parent = obj.parentElement;

      if (parent) {
        if (parent.classList.contains(`objeto`)) {
          parent.insertAdjacentHTML(`afterbegin`, menuHtml);
        } else {
          parent.parentElement?.insertAdjacentHTML(`afterbegin`, menuHtml);
        }
      }
      //@ts-ignore
      // obj.parentElement.style.marginTop = "24px";
    });
}

function toggleObjMenu(el: HTMLElement) {
  el.parentElement?.classList.toggle(`open`);
}

function avaliouObj(origin: HTMLElement, code, score) {
  let objAvalia = origin.parentElement?.parentElement;

  if (objAvalia) {
    objAvalia.classList.add(`avaliou`);
    window.setTimeout(() => {
      objAvalia?.parentElement?.removeChild(objAvalia);
    }, 1500);
  }

  setCookie(`avaliou-${currentDisciplina}-${code}`, `true`);
  sendObjScore(code, score);
}

function sendObjScore(name, score) {
  //@ts-ignore
  ga("send", "event", {
    eventCategory: `Avaliação - Objeto`,
    eventAction: `${score} Estrelas`,
    eventLabel: name,
    eventValue: score,
  });
}

function showShareButtons(el: HTMLElement) {
  el.nextElementSibling?.classList.add(`visible`);

  el.classList.add(`hidden`);
}

function goBig(el: HTMLElement) {
  let wrapper = el.parentElement?.parentElement?.parentElement;

  if (wrapper) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (wrapper.classList.contains(`objeto`)) {
        wrapper.requestFullscreen();
      } else {
        wrapper.parentElement?.requestFullscreen();
      }
    }
  }
}

/**
 * Adiciona um botao que leva pro whatsapp da uniasselvi
 * Se a trilha foi aberta pelo AVA, insere o webchat do omnichat
 */
function appendWebchat() {
  if (identificacao) {
    //string que vem no search da url
    let decodedString: Aluno = JSON.parse(atob(identificacao)) as Aluno;
    let splitName = decodedString.nome.split(` `);
    let firstName = splitName.shift();
    let surName = splitName.join(` `);

    let webchatScript = document.createElement("script");
    ((webchatScript.type = "text/javascript"),
      (webchatScript.async = !0),
      (webchatScript.src = "https://static.omni.chat/web-chat/web-chat.min.js"),
      (webchatScript.onload = function () {
        //@ts-ignore
        OmniChatWebChat.init({
          retailerId: "x2THigtexm",
          customer: {
            externalId: decodedString.matricula,
            name: firstName,
            email: "",
            lastName: surName,
            phoneAreaCode: "",
            phoneNumber: "",
            phoneCountryCode: "",
            customFields: [],
          },
        });
      }));
    let firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(webchatScript, firstScript);
  } else {
    document.body.insertAdjacentHTML(
      `beforeend`,
      `
            <a href="https://api.whatsapp.com/send?phone=554733016100" target="_blank" class="zap">
                <img src="/img/ico/whatsapp_v.svg" alt="">
            </a>
        `,
    );
  }
}

function redirectToTarget() {
  if (currentURL.searchParams.has(`item`)) {
    let pItem = currentURL.searchParams.get(`item`);
    //@ts-ignore
    let splitem = pItem.split(`.`);

    if (currentPage === "" || currentPage === "inicio.html") {
      //mudar a pagina em que estou, mas manter os parametros da url
      let newPage = `unidade${splitem[0]}.html`;

      let splitPathname = currentURL.pathname.split(`/`);
      splitPathname[splitPathname.length - 1] = newPage;

      currentURL.pathname = splitPathname.join(`/`);

      //@ts-ignore
      window.location = currentURL;
    } else {
      //scroll item into view
      //caso o item so tenha um numero, e indicacao de unidade, nao precisa dar scroll
      if (splitem.length > 1) {
        let targetElement = document.querySelector(`[data-sumario="${pItem}"]`);

        if (targetElement) {
          let scrollPosition = targetElement.getBoundingClientRect().top - 80;

          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    }
  }
}

/**
 * Transforma os <a> do snippet em links para o gerador de docs,
 * caso tenha aberto pelo ava,
 * se nao mostra popup informando
 */
function buildDocsLinks() {
  let docElements =
    document.querySelectorAll<HTMLAnchorElement>(`a[data-gdoc]`);

  if (docElements.length > 0) {
    //se tem info, monta o link
    if (identificacao && identificacao != ``) {
      let studentInfo: Aluno = JSON.parse(atob(identificacao));

      docElements.forEach((docEl) => {
        let docCode = docEl.getAttribute(`data-gdoc`);

        docEl.href = `https://www.uniasselvi.com.br/extranet/o-2.0/relatorio2/gerenciador_modelo/impressao/impressao_modelo_documento_trilha.php?specialization=${studentInfo.matricula}&document=${docCode}&semester=${studentInfo.semestre}&subject=${studentInfo.disciplina}`;
      });
    } else {
      //se nao tem, popup
      docElements.forEach((docEl) => {
        docEl.addEventListener(`click`, popGerador);
      });
    }
  }
}

//mostra uma popup avisando que precisa abrir pelo ava para conseguir acessar os docs
function popGerador() {
  //mostrar popup
  document.body.insertAdjacentHTML(
    `beforeend`,
    `
            <div
                class="popup-seminario visible"
                onclick="closeSeminarioWarning()"
            >
                <div class="balao" onclick="event.stopPropagation()">
                    <h3 style="font-weight:bold;margin-bottom: 2em">
                        Ops!
                    </h3>

                    <p>Não encontramos suas credenciais.</p>

                    <p>Para acessar os documentos de estágio, você precisa acessar sua trilha pelo AVA, dessa forma conseguimos certificar de que é você tentando acessar estas informações.</p>

                    <p><a href="https://ava2.uniasselvi.com.br"><b><u>Clique aqui</u></b></a> para ir ao AVA, selecione a disciplina, e clique em "Trilha de Aprendizagem".</p>

                    <br>

                    <button onclick="closeSeminarioWarning()">Fechar</button>
                </div>
            </div>
            `,
  );
}

async function initPage() {
  //? antes de comecar a mexer na pagina, conferir se tem um param "item" na url e direcionar de acordo
  redirectToTarget();
  //? ------***------

  //carrega as fontes que mudaram desde a criacao da trilha
  loadAdditionalFonts();
  //se esta na page videos, constroi ela
  buildVideosPage();
  //se esta na page objetos, constroi ela
  buildObjetosPage();
  //busca infos do academico na url ou localstorage
  await identificaAcademico();
  //esconde o menu se o user escondeu ele em outra page
  hideMenuIfCookie();
  //carrega as notas de unidade
  await getSimuladoGrade();
  //carrega as notas de topico/item
  await injectIndexTags();
  //gera as barrinhas amarelas no topo da pagina e menu
  buildProgressBars();
  //joga a tag de tracking do hotjar na pagina
  injectHotjar();
  //ajusta a tabulacao da pagina pra navegar com teclado
  tabify();
  //se e a primeira vez que ele abre a trilha e ela tem livro digital, mostra pra ele que tem numa popup
  //se a disciplina nao tem livro digital, cria o botao mesmo assim mas com um aviso
  popupLivroDigital();
  //coloca a avaliacao da disciplina no fim da unidade 3
  appendAvaliacaoStars();
  //coloca os menus de avaliacao nos novos objetos de aprendizagem
  appendObjetoMenu();
  //cria os links para gerador de docs, com base no atributo data-gdoc
  buildDocsLinks();

  //botao do whatsapp ou webchat em todas paginas
  appendWebchat();

  //! TEMPORARIO - AVISO SEMINARIO popup - modelo teams apres. - modelo slides un3.
  seminarioAddIns();
}

initPage();

window.addEventListener("scroll", updatePageLayoutOnScroll);
