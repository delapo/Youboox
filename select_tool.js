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

var x, y, prev_x, prev_y;

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
  div.addEventListener("mousedown", function() { onMousedown(e, div) });
  div.addEventListener("mousemove", function() { onMousemove(e, div) });
  div.addEventListener("mouseup", function() { onMouseup(e, div) });
  console.log("end");

  function onMousedown(e, div){
    var prev_x = x - div.offsetLeft;
    var prev_y = y - div.offsetTop;
  }

  function onMousemove(e, div){
    x = e.pageX;
    y = e.pageY;
    div.style.left = (x - prev_x) + 'px';
    div.style.top = (y - prev_y) + 'px';
  }

  function onMouseup(e, div){
    div = false;
  }
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
    region_div.draggable = true;
    region_div.onclick = Tool;
    board.appendChild(region_div);
  }
  });


