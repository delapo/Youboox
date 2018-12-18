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
  let start_div = ["div"].map(name => ({
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
    console.log("selected defined");
    selected.draggable = false;
    if (selected.firstChild) {
      console.log("firstChild exist");
      selected.draggable = false;
      selected.style.border = "1px solid blue";
      selected.parentNode.removeEventListener("dragstart", _funcs_edit);
      selected.parentNode.removeEventListener("dragover", m_move);
      selected.parentNode.removeEventListener("dragend", _funce_edit)
      selected.removeChild(document.getElementById("tl_resize"));
    } else if (!selected.firstChild) {
      console.log("no firstChild", selected);
      selected.draggable = false;
      selected.style.border = "1px solid blue";
      selected.parentNode.removeEventListener("dragstart", _funcs_edit);
      selected.parentNode.removeEventListener("dragover", m_edit);
      selected.parentNode.removeEventListener("dragend", _funce_edit);
      console.log("no more listener");
    }
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
    tool.div.parentNode.addEventListener("dragstart", _funcs_move);
    tool.div.parentNode.addEventListener("dragover", function m_move(e) {_funco_move(e, tool, cursor, start_div)});
    tool.div.parentNode.addEventListener("dragend", _funce_move);
  }

  function _funcs_move () {
    ondragstart_move()
  }

  function _funco_move (e, tool, cursor, start_div) {
    ondragover_move(e, tool, cursor, start_div)
  }

  function _funce_move () {
    ondragend_move()
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

    const div_resize = document.getElementById("tl_resize");
    if (!div_resize) {
      console.log("no resize div");

      let div_resize_tl = document.createElement("div");
      div_resize_tl.id = "tl_resize";
      div_resize_tl.draggable = true;
      tool.div.appendChild(div_resize_tl);

    } else if (div_resize) {
      tool.div.appendChild(document.getElementById("tl_resize"));
    }
    tool.div.parentNode.addEventListener("dragstart", _funcs_edit);
    tool.div.parentNode.addEventListener("dragover", function m_edit(e){ _funco_edit(e, tool, cursor, start_div)});
    tool.div.parentNode.addEventListener("dragend", _funce_edit);
  }

  function _funcs_edit () {
    ondragstart_edit()
  }

  function _funco_edit (e, tool, cursor, start_div){
    ondragover_edit(e, tool, cursor, start_div)
  }

  function _funce_edit () {
    ondragend_edit()
  }

  function ondragstart_edit () {
    console.log("dragstart");
  }

  function ondragover_edit (e, tool, cursor, start_div) {
    e = window.event;
    let div = tool.div;
    /* calc position of mouse refer to parent node */

    let curr_left = (e.pageX - tool.div.parentNode.offsetLeft);
    let curr_top = (e.pageY - tool.div.parentNode.offsetTop);

    /* calc dif btw origin and current mouse position */

    let dif_left = start_div[0].left - curr_left;
    let dif_top = start_div[0].top - curr_top;

    /* calc new dif height and width */

    let new_width = start_div[0].width + dif_left;
    let new_height = start_div[0].height + dif_top;

    /* applie new position */

    tool.div.style.width = new_width + "px";
    tool.div.style.height = new_height + "px";

    tool.div.style.left = curr_left + "px";
    tool.div.style.top = curr_top + "px";
  }

  function ondragend_edit () {
    console.log("dragend");
  }

/*------------------------------------------- crete all div with json ------------------------------------------------*/

$.getJSON("data.json", function(json) {
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
