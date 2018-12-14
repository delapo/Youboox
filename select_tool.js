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
      if ( int == this.selected ){
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

function Tool(e){
  let tools = ['_add', 'del', 'move', 'edit'].map(name => ({
    name,
    img_but: document.getElementById(name).firstChild,
    div: e.path[0],
  }));
  console.log(tools)
  const tool = tools.find(x => x.img_but.classList.contains("tool_selected"));
  if ( tool ){
    window[tool.name](tool, e);
  }else{
    console.log("no tool");
  }
}

function _add(tool, e){
  console.log("function _add");
}
function del(tool, e){
  let div = tool.div;
  div.parentNode.removeChild(div);
}

function move(tool, e){
  let div = tool.div;
  div.draggable = true;
  let div_top = parseInt(div.style.top);
  let div_left = parseInt(div.style.left);
  div.parentNode.addEventListener("dragstart", function() { onDragstart(e, div) });
  div.parentNode.addEventListener("drag", function() { ondragover(e, div, div_top, div_left) })
  div.parentNode.addEventListener("dragend", function() { ondragend(e, div, div_top, div_left) });
  console.log("end");

  function onDragstart(e, div){
    console.log("dragstart");
  }
  function ondragover(e, div, div_top, div_left) {
    e = window.event;
    /* calc position of mouse refer to parent node */
    let cursor_left = (e.pageX - div.parentNode.offsetLeft);
    let cursor_top = (e.pageY - div.parentNode.offsetTop);
    /* calc diff btw div origin position and cursor current position */
    let dif_left = cursor_left - div_left;
    let dif_top = cursor_top - div_top;
    /* calc div origin with current mouse position */
    let left = cursor_left - dif_left;
    let top = cursor_top - dif_top;
    /* replace mouse position */
    div.style.left = left + "px";
    div.style.top = top + "px";

  }
  function ondragend(e, div, div_top, div_left){
    e = window.event;
    /* calc position of mouse refer to parent node */
    let cursor_left = (e.pageX - div.parentNode.offsetLeft);
    let cursor_top = (e.pageY - div.parentNode.offsetTop);
    /* calc diff btw div origin position and cursor current position */
    let dif_left = cursor_left - div_left;
    let dif_top = cursor_top - div_top;
    /* calc div origin with current mouse position */
    let left = cursor_left - dif_left;
    let top = cursor_top - dif_top;
    /* replace mouse position */
    div.style.left = left;
    div.style.top = top;

    div.draggable = false;
    console.log("dragend");
  }



  /* function onMousemove(e, div){
    function test(){
    let x = e.clientX;
    let y = e.clientY;
    console.log("div", div.style.left, div.style.top);
    console.log("mouse", x, y);
    }test();
  } */
}

function edit(tool, e){
  console.log("function edit");
}

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


