new Vue({
  el:'#menu',
  data: {
      add_selected: "not selected",
      delete_selected: "not selected",
      edit_selected: "not selected",
      move_selected: "tool_selected",
      selected: 4,
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
/*----------------------------------------------- memory undo / redo -------------------------------------------------*/

var memory = {
  undo:
    [{id: "undo"}],
  redo:
      [{id: "redo"}],
  };

function memory_f(tool){
  let div = tool.div;
  let new_memory = {id: div.id, left: div.style.left, top: div.style.top, width: div.style.width, height: div.style.height};
  console.log(memory);
  memory.undo.unshift(new_memory);
}

function undo_f(){
  let memory_div = memory.undo[0];
  if ( memory_div.id === "undo" ){
    alert("undo isn't possible");
    return
  }
  let current_div = (document.getElementById(memory_div.id));

  if(current_div){
    current_div.style.left = memory_div.left;
    current_div.style.top = memory_div.top;
    current_div.style.width = memory_div.width;
    current_div.style.height = memory_div.height;
    memory.undo.shift();
  }
  else if(!current_div){
    let undo_div = document.createElement("div")
    undo_div.style.position = "absolute";
    undo_div.style.border = "1px solid blue";
    undo_div.classList.add("square");
    undo_div.draggable = false;
    undo_div.onclick = Tool;
    undo_div.style.width = memory_div.width;
    undo_div.style.height = memory_div.height;
    undo_div.style.left = memory_div.left;
    undo_div.style.top = memory_div.top;
    undo_div.id = memory_div.id
    document.getElementById("board").appendChild(undo_div);
    memory.undo.shift();
  }
  console.log(memory.undo)
}

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
    memory_f(tool);
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

  if (e.code === "ArrowRight"){
    board.style.left = parseInt(board.style.left) + 10 + "px";
  }
  if (e.code === "ArrowLeft"){
    board.style.left = parseInt(board.style.left) - 10 + "px";
  }
  if (e.code === "ArrowUp"){
    board.style.top = parseInt(board.style.top) - 10 + "px";
  }
  if (e.code === "ArrowDown"){
    board.style.top = parseInt(board.style.top) + 10 + "px";
  }
}
/*------------------------------------------- crete all div with json ------------------------------------------------*/

$.getJSON("data.json", function(json) {
  window.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  let undo = document.createElement("button");
  undo.id = "undo";
  undo.onclick = undo_f;
  undo.style.position = "absolute";
  undo.style.top = "0px";
  undo.style.left = "350px";
  undo.style.width = "30px";
  undo.style.height = "30px";
  document.body.appendChild(undo);

  let board_create = document.createElement("div");
  board_create.id = "board";
  board_create.style.position = "absolute";
  board_create.style.top = "100px";
  board_create.style.left = "100px";
  document.onkeydown = board_move;
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

/* bonus */

$(function(){
  let game = document.createElement("button");
  game.id = "game start";
  game.onclick = game_func;
  game.style.width = "90px";
  game.style.height = "30px";
  game.style.backgroundColor = "blue";
  game.style.position = "absolute";
  game.style.top = "0px";
  game.style.left = "550px";
  document.body.appendChild(game);
})

function game_func() {
  document.body.removeChild(document.getElementById("game start"));
  document.onkeydown = move_player;
  console.log("game")
  let player = document.createElement("div");
  player.style.position = "absolute";
  player.style.width = "20px";
  player.style.height = "20px";
  player.style.top = "0px";
  player.style.left = "0px";
  player.id = "player";
  player.style.backgroundColor = "black";
  document.body.appendChild(player);
}

function move_player() {
  let e = window.event;
  console.log(e.code);
  console.log("move");
  let player = document.getElementById("player");
  if (e.code === "KeyD") {
    player.style.left = parseInt(player.style.left) + 10 + "px";
    player.style.backgroundColor = "blue";

  }
  if (e.code === "KeyA") {
    player.style.left = parseInt(player.style.left) - 10 + "px";
    player.style.backgroundColor = "yellow";
  }
  if (e.code === "KeyW") {
    player.style.top = parseInt(player.style.top) - 10 + "px";
    player.style.backgroundColor = "red";
  }
  if (e.code === "KeyS") {
    player.style.top = parseInt(player.style.top) + 10 + "px";
    player.style.backgroundColor = "green";
  }
}
