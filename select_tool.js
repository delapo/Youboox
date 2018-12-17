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

function Tool(e){
  let tools = ['_add', 'del', 'move', 'edit'].map(name => ({
    name,
    img_but: document.getElementById(name).firstChild,
    div: e.path[0],
  }));
  console.log(tools)
  const tool = tools.find(x => x.img_but.classList.contains("tool_selected"));
  console.log(tool);
  if ( tool !== undefined){
    window[tool.name](tool, e);
  }else{
    console.log("no tool");
  }
}

/*------------------------------------------------- function _add ----------------------------------------------------*/

function _add(tool, e){
  let div = tool.div;
  div.draggable = true;
  let cursor_left = e.pageX - div.parentNode.offsetLeft;
  let cursor_top = e.pageY - div.parentNode.offsetTop;
  div.parentNode.addEventListener("dragstart", _funcs_add);
  function _funcs_add(){onDragstart_add(cursor_left, cursor_top)}
  div.parentNode.addEventListener("dragover", _funco_add)
  function _funco_add(){ondragover_add(e, div)}
  div.parentNode.addEventListener("dragend", _funce_add);
  function _funce_add(){ondragend_add(e, div)}

  function onDragstart_add(cursor_left, cursor_top){
    let board = document.getElementById("board");
    let new_div = document.createElement("div");
    new_div.style.position = "absolute";
    new_div.className = "square_add";
    new_div.style.left = cursor_left + "px";
    new_div.style.top = cursor_top + "px";
    console.log("left", cursor_left, "top", cursor_top);
    new_div.style.width = "100px";
    new_div.style.height = "100px";
    new_div.style.border = "1px solid blue";
    new_div.draggable = false;
    new_div.onclick = Tool;
    board.appendChild(new_div);
    console.log("dragstart");
  }

    function ondragover_add(e, div) {
    }
    function ondragend_add(e, div) {
      div.parentNode.removeEventListener("dragstart", _funcs_add);
      div.parentNode.removeEventListener("dragover", _funco_add);
      div.parentNode.removeEventListener("dragend", _funce_add)
      console.log("dragend");
    }
}

/*------------------------------------------------- function del -----------------------------------------------------*/

function del(tool, e){
  console.log("del");
  let div = tool.div;
  div.parentNode.removeChild(div);
}

/*------------------------------------------------- function move ----------------------------------------------------*/

function move(tool, e){
  let div = tool.div;
  div.draggable = true;
  let div_top = parseInt(div.style.top);
  let div_left = parseInt(div.style.left);
  let cursor_left = e.pageX - div.parentNode.offsetLeft;
  let cursor_top = e.pageY - div.parentNode.offsetTop;
  div.parentNode.addEventListener("dragstart", _funcs_move);
  function _funcs_move(){onDragstart_move(e, div)}
  div.parentNode.addEventListener("dragover", _funco_move)
  function _funco_move(){ondragover_move(e, div, div_top, div_left, cursor_left, cursor_top)}
  div.parentNode.addEventListener("dragend", _funce_move);
  function _funce_move(){ondragend_move(e, div)}

  function onDragstart_move(e, div){
    console.log("dragstart");
  }

  function ondragover_move(e, div, div_top, div_left, cursor_left, cursor_top) {;
    console.log("div", div_left, div_top, "cursor", cursor_left, cursor_top);
    e = window.event;

    /* calc position of mouse refer to parent node */

    let curr_left = (e.pageX - div.parentNode.offsetLeft);
    let curr_top = (e.pageY - div.parentNode.offsetTop);

    /* calc diff btw div origin position and cursor start position */

    let dif_left = cursor_left - div_left;
    let dif_top = cursor_top - div_top;

    /* calc new div position */

    let x = curr_left - dif_left;
    let y = curr_top - dif_top;

    /* applie new position */

    div.style.left = x + "px";
    div.style.top = y + "px";
  }
  function ondragend_move(e, div){
    div.draggable = false;
    div.parentNode.removeEventListener("dragstart", _funcs_move);
    div.parentNode.removeEventListener("dragover", _funco_move);
    div.parentNode.removeEventListener("dragend", _funce_move)
    console.log("dragend");
  }
}

/*------------------------------------------------- function edit ----------------------------------------------------*/

function edit(tool, e) {
  let div = tool.div;

  let div_resize = document.getElementById("tl_resize");
  if (!div_resize) {
    console.log("no resize div");

    let div_resize_tl = document.createElement("div");
    div_resize_tl.id = "tl_resize";
    div_resize_tl.draggable = true;
    div.appendChild(div_resize_tl);

  }else if(div_resize){
    div.appendChild(document.getElementById("tl_resize"));
  }

  /* commun part */

  let cursor_left = e.pageX - div.parentNode.offsetLeft;
  let cursor_top = e.pageY - div.parentNode.offsetTop;

  let curr_width = parseInt(div.style.width);
  let curr_height = parseInt(div.style.height);

  let div_top = parseInt(div.style.top);
  let div_left = parseInt(div.style.left);

  /* part tl */

  div.parentNode.addEventListener("dragstart", _funcs_edit);
  function _funcs_edit(){onDragstart_edit(e, div)}
  div.parentNode.addEventListener("dragover", _funco_edit)
  function _funco_edit(){ondragover_edit(e, div, cursor_left, cursor_top, curr_width, curr_height, div_left, div_top)}
  div.parentNode.addEventListener("dragend", _funce_edit);
  function _funce_edit(){ondragend_edit(e, div)}

  function onDragstart_edit(e, div){
    console.log("dragstart");
  }

  function ondragover_edit(e, div, cursor_left, cursor_top, curr_width, curr_height, div_left, div_top) {;
    console.log("cursor", cursor_left, cursor_top);
    e = window.event;

    /* calc position of mouse refer to parent node */


    let curr_left = (e.pageX - div.parentNode.offsetLeft);
    let curr_top = (e.pageY - div.parentNode.offsetTop);

    let left_dif = cursor_left - div_left;
    let top_dif = cursor_top - div_top;



    /* calc diff height and width */

    let diff_left = cursor_left - curr_left;
    let diff_top = cursor_top - curr_top;

    /* calc new dif height and width */

    console.log("width", curr_width, "height", curr_height);

    let new_width = curr_width + diff_left;
    let new_height = curr_height + diff_top;

    /* applie new position */

    div.style.width = new_width + "px";
    div.style.height = new_height + "px";

    div.style.left = curr_left - left_dif + "px";
    div.style.top = curr_top - top_dif + "px";
  }
  function ondragend_edit(e, div){
    div.draggable = false;
    div.parentNode.removeEventListener("dragstart", _funcs_edit);
    div.parentNode.removeEventListener("dragover", _funco_edit);
    div.parentNode.removeEventListener("dragend", _funce_edit)
    div.removeChild(document.getElementById("tl_resize"));
    console.log("dragend");
  }

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
    region_div.onclick = Tool;
    board.appendChild(region_div);
  }
  });


