new Vue({
  el:'#menu',
  data: {
      add_selected: "not selected",
      delete_selected: "not selected",
      edit_selected: "not selected",
      move_selected: "not selected",
      selected: 0,
    },
  methods: {
    check(int){
      if ( int === this.selected ){
        this.selected = 0
        switch (int) {
          case 1:
            this.add_selected = "not selected";
            break;
          case 2:
            this.delete_selected = "not selected";
            break;
          case 3:
            this.edit_selected = "not selected";
            break;
          case 4:
            this.move_selected = "not selected";
            break;
        }
      }
      else {
        switch (int) {
          case 1:
            this.selected = 1;
            this.add_selected = "tool_selected";
            this.delete_selected = "not selected";
            this.edit_selected = "not selected";
            this.move_selected = "not selected";
            break;
          case 2:
            this.selected = 2;
            this.add_selected = "not selected";
            this.delete_selected = "tool_selected";
            this.edit_selected = "not selected";
            this.move_selected = "not selected";
            break;
          case 3:
            this.selected = 3;
            this.add_selected = "not selected";
            this.delete_selected = "not selected";
            this.edit_selected = "tool_selected";
            this.move_selected = "not selected";
            break;
          case 4:
            this.selected = 4;
            this.add_selected = "not selected";
            this.delete_selected = "not selected";
            this.edit_selected = "not selected";
            this.move_selected = "tool_selected";

            break;
        }
      }
    },
  }
});

/*----------------------------------------- function Call when click on tool -----------------------------------------*/

function Tool(e) {
  document.getElementById("board").ondragover = function (){};
  let tools = ['_add', 'del', 'move', 'edit'].map(name => ({
    name,
    img_but: document.getElementById(name).firstChild,
    div: e.path[0],
  }));
  let cursor = ["cursor"].map(name => ({
    name,
    left: e.pageX - tools[0].div.parentNode.offsetLeft,
    top: e.pageY - tools[0].div.parentNode.offsetTop,
  }));
  let start_div = ["start_div"].map(name => ({
    name,
    left: parseInt(tools[0].div.style.left),
    top: parseInt(tools[0].div.style.top),
    dif_left: cursor[0].left - parseInt(tools[0].div.style.left),
    dif_top: cursor[0].top - parseInt(tools[0].div.style.top),
    width: parseInt(tools[0].div.style.width),
    height: parseInt(tools[0].div.style.height),
  }));
  const tool = tools.find(x => x.img_but.classList.contains("tool_selected"));
  let squares = document.getElementsByClassName("square");
  let selected;
  for (x in squares) {
    if (typeof(squares[x]) === "object") {
      if (squares[x].style.border === "2px solid red") {
        selected = squares[x];
      }
    }
  }
  if (selected !== undefined) {
    selected.draggable = false;
    selected.style.border = "1px solid blue";
    selected.ondragover = function() {};
  }
  if (tool !== undefined) {
    tool.div.style.border = "2px solid red";
    window[tool.name](tool, e, cursor, start_div);
  } else {
    console.log("no tool");
  }
}
  /*------------------------------------------------- function _add ----------------------------------------------------*/

  function _add (tool, e, cursor, start_div) {
    tool.div.style.border = "1px solid blue";

    let board = document.getElementById("board");

    let new_div = document.createElement("div");
    new_div.style.position = "absolute";
    new_div.className = "square add";

    new_div.style.left = cursor[0].left - 50 + "px";
    new_div.style.top = cursor[0].top - 50 + "px";

    new_div.style.width = "100px";
    new_div.style.height = "100px";

    new_div.style.border = "1px solid blue";

    new_div.draggable = false;
    new_div.ondblclick = Tool;

    board.appendChild(new_div);
  }

  /*------------------------------------------------- function del -----------------------------------------------------*/

  function del (tool, e, cursor, start_div) {
    console.log("del");
    tool.div.parentNode.removeChild(tool.div);
  }

  /*------------------------------------------------- function move ----------------------------------------------------*/

  function move (tool, e, cursor, start_div) {
    tool.div.draggable = true;
    tool.div.parentNode.ondragstart = ondragstart_move;
    tool.div.parentNode.ondragover = function (e) {ondragover_move(e, tool, cursor, start_div)};
    tool.div.parentNode.ondragend = ondragend_move;
  }
  function ondragstart_move () {
    console.log("dragstart");
  }

  function ondragover_move (e, tool, cursor, start_div) {
    e = window.event;
    let div = tool.div;
    /* calc position of mouse refer to parent node */


    let curr_left = (e.pageX - div.parentNode.offsetLeft);
    let curr_top = (e.pageY - div.parentNode.offsetTop);

    /* calc new div position */

    let x = curr_left - start_div[0].dif_left;
    let y = curr_top - start_div[0].dif_top;

    /* applie new position */

    div.style.left = x + "px";
    div.style.top = y + "px";
  }

  function ondragend_move () {
    console.log("dragend");
  }

  /*------------------------------------------------- function edit ----------------------------------------------------*/

  function edit (tool, e, cursor, start_div) {
    const div_resize_tl = document.getElementById("tl_resize");
    const div_resize_br = document.getElementById("br_resize");
    if (!div_resize_tl) {
      let div_resize_tl = document.createElement("div");
      div_resize_tl.style.left = tool.div.style.left;
      div_resize_tl.style.top = tool.div.style.top;
      div_resize_tl.id = "tl_resize";
      div_resize_tl.draggable = true;
      div_resize_tl.ondragstart = ondragstart_edit;
      div_resize_tl.ondragover = function (e){ ondragover_edit_tl(e, tool, cursor, start_div)};
      div_resize_tl.ondragend = function (e){ ondragend_edit_tl(e, tool, start_div)};
      tool.div.parentNode.appendChild(div_resize_tl);

      let div_resize_br = document.createElement("div");
      console.log(tool.div.style.left + tool.div.style.width);
      div_resize_br.style.left = parseInt(tool.div.style.left) + parseInt(tool.div.style.width) + "px";
      div_resize_br.style.top = parseInt(tool.div.style.top) + parseInt(tool.div.style.height) + "px";
      div_resize_br.id = "br_resize";
      div_resize_br.draggable = true;
      div_resize_br.ondragstart = ondragstart_edit;
      div_resize_br.ondragover = function (e){ ondragover_edit_br(e, tool, cursor, start_div)};
      div_resize_br.ondragend = function (e){ ondragend_edit_br(e, tool, start_div)};
      tool.div.parentNode.appendChild(div_resize_br);
    } else if (div_resize_tl) {

      div_resize_tl.style.left = tool.div.style.left;
      div_resize_tl.style.top = tool.div.style.top;
      div_resize_tl.ondragstart = ondragstart_edit;
      div_resize_tl.ondragover = function (e){ ondragover_edit_tl(e, tool, cursor, start_div)};
      div_resize_tl.ondragend = function (e){ ondragend_edit_tl(e, tool, start_div)};

      div_resize_br.style.left = parseInt(tool.div.style.left) + parseInt(tool.div.style.width) + "px";
      div_resize_br.style.top = parseInt(tool.div.style.top) + parseInt(tool.div.style.height) + "px";
      div_resize_br.ondragstart = ondragstart_edit;
      div_resize_br.ondragover = function (e){ ondragover_edit_br(e, tool, cursor, start_div)};
      div_resize_br.ondragend = function (e){ ondragend_edit_br(e, tool, start_div)};
    }
  }
  function ondragstart_edit(){
    console.log("drag start tl");
  }

  function ondragover_edit_tl (e, tool, cursor, start_div) {
    e = window.event;
    let div = tool.div;
    let div_resize = document.getElementById("tl_resize");

    /* calc position of mouse refer to parent node */

    let curr_left = (e.pageX - div.parentNode.offsetLeft);
    let curr_top = (e.pageY - div.parentNode.offsetTop);

    div_resize.style.left = curr_left - 6 + "px";
    div_resize.style.top = curr_top - 6  + "px";


    /* calc dif btw origin and current mouse position */

    let dif_left = parseInt(start_div[0].left) - curr_left;
    let dif_top = parseInt(start_div[0].top) - curr_top;



    /* calc new dif height and width */

    let new_width = parseInt(start_div[0].width) + dif_left + "px";
    let new_height = parseInt(start_div[0].height) + dif_top + "px"


    /* applie new position */

    tool.div.style.width = new_width;
    tool.div.style.height = new_height;

    tool.div.style.left = curr_left + "px";
    tool.div.style.top = curr_top + "px";

  }

function ondragover_edit_br (e, tool, cursor, start_div) {
    e = window.event;
    let div = tool.div;
    let div_resize = document.getElementById("br_resize");


    /* calc position of mouse refer to parent node */

    let curr_left = (e.pageX - div.parentNode.offsetLeft);
    let curr_top = (e.pageY - div.parentNode.offsetTop);

    console.log(curr_left, curr_top);

    div_resize.style.left = curr_left - 6 + "px";
    div_resize.style.top = curr_top - 6 + "px";

    /* calc dif btw origin and current mouse position */

    let dif_left = start_div[0].left - curr_left;
    let dif_top = start_div[0].top - curr_top;

   /* calc new dif height and width */

    let new_width = - dif_left;
   let new_height = - dif_top;


   /* applie new position */

   tool.div.style.width = new_width + "px";
   tool.div.style.height = new_height + "px";

}
function ondragend_edit_tl (e, tool, start_div) {
  console.log("dragend");
  let div = tool.div;
  start_div[0].width = parseInt(div.style.width);
  start_div[0].height = parseInt(div.style.height);
  start_div[0].left = parseInt(div.style.left);
  start_div[0].top = parseInt(div.style.top);
}

  function ondragend_edit_br (e, tool, start_div) {
    console.log("dragend");
    let div = tool.div;
    console.log("curr start size", start_div[0].width, start_div[0].height);
    start_div[0].width = parseInt(div.style.width);
    start_div[0].height = parseInt(div.style.height);
    console.log("new start size", start_div[0].width, start_div[0].height);
  }
/*--------------------------------------------------- move board -----------------------------------------------------*/

function board_move(){
  let board = document.getElementById("board");
  let e = window.event;
  board.draggable = true;
  board.ondragstart = board_dragstart;
  board.ondragover = function (e){ board_dragover(e, board) };
  board.ondragend = board_dragend;
}
function board_dragstart(){
  console.log("dragstart");
}
function board_dragover(e, board){
  e = window.event;

  console.log("board", board.style.left, board.style.top, board);

  let cursor_left = e.clientX - parseInt(board.style.left);
  let cursor_top = e.clientY - parseInt(board.style.top);

  console.log("cursor", cursor_left, cursor_top);


  board.style.left = cursor_left + "px";
  board.style.top = cursor_top + "px";

  console.log("new board", board.offsetLeft, board.offsetTop);
}
function board_dragend(){
  console.log("dragend");
  document.getElementById("board").draggable = false;

}
/*------------------------------------------- crete all div with json ------------------------------------------------*/

$.getJSON("data.json", function(json) {
  let board_create = document.createElement("div");
  board_create.id = "board";
  board_create.style.position = "absolute";
  board_create.style.top = "0px";
  board_create.style.left = "267px";
  board_create.ondblclick = board_move;
  board_create.draggable = false;
  document.body.appendChild(board_create);

  var regions = json.regions_of_interest;
  console.log(regions);
  var board = document.getElementById('board');
  for (var region in regions) {
    var region_div = document.createElement("div");
    region_div.id = "square" + region;
    region_div.classList.add("square");
    region_div.style.height = (regions[region].height)/2 + "px";
    region_div.style.width = (regions[region].width)/2 + "px";
    region_div.style.position = "absolute";
    region_div.style.top = (regions[region].y)/2 + "px";
    region_div.style.left = (regions[region].x)/2 + "px";
    region_div.style.border = "1px solid blue";
    region_div.draggable = false;
    region_div.ondblclick = Tool;
    board.appendChild(region_div);
  }
  });