<template>
    <div id="middleImage">
        <section id="prev">
            <img src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
        </section>
        <section id="BD_show">
        </section>
        <section id="next">
            <img src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
        </section>
    </div>
</template>

<script>
export default {
  name: 'middle-image',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

var json = '{  "regions_of_interest": [\n' +
    '      {\n' +
    '        "x": 322,\n' +
    '        "y": 84,\n' +
    '        "width": 464,\n' +
    '        "height": 462\n' +
    '      },\n' +
    '    {\n' +
    '      "x": 786,\n' +
    '      "y": 84,\n' +
    '      "width": 517,\n' +
    '      "height": 462\n' +
    '    },\n' +
    '    {\n' +
    '      "x": 322,\n' +
    '      "y": 546,\n' +
    '      "width": 309,\n' +
    '      "height": 572\n' +
    '    },\n' +
    '    {\n' +
    '      "x": 631,\n' +
    '      "y": 546,\n' +
    '      "width": 323,\n' +
    '      "height": 572\n' +
    '    },\n' +
    '    {\n' +
    '      "x": 954,\n' +
    '      "y": 546,\n' +
    '      "width": 349,\n' +
    '      "height": 541\n' +
    '    },\n' +
    '    {\n' +
    '      "x": 760,\n' +
    '      "y": 1087,\n' +
    '      "width": 543,\n' +
    '      "height": 437\n' +
    '    },\n' +
    '    {\n' +
    '      "x": 322,\n' +
    '      "y": 1118,\n' +
    '      "width": 438,\n' +
    '      "height": 406\n' +
    '    }\n' +
    '  ]\n' +
    '}';
 /*
  obj = JSON.parse(json);
for (z = 0; z <= obj.regions_of_interest.length; z++)
{
    console.log("wsh");
    var newdiv = document.createElement("div");

    newdiv.setAttribute('id', 'BD_show');
    newdiv.setAttribute('class', 'bd');
    /* newdiv["number"] = z;*/
  /*  newdiv.style.marginLeft = obj.regions_of_interest[z].x + 'px';
    newdiv.style.marginTop = obj.regions_of_interest[z].y + 'px';
    newdiv.style.width = obj.regions_of_interest[z].width + 'px';
    newdiv.style.height = obj.regions_of_interest[z].height + 'px';
    newdiv.style.border = "thick solid #0000FF";
    var select = document.getElementById('demo1');
    select.appendChild(newdiv);
}*/

</script>

<style scoped>
    #next {
        width: 70px;
        height: 70px;
        position: absolute;
        z-index: 1;
        top: 50%;
        right: 67%;
        background: black;
        border-radius: 50px;
    }

    #next img {
        width: 50px;
        height: 50px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;
        border-radius: 35px;
        transform: scale(-1, 1);
    }

    #prev {
        width: 70px;
        height: 70px;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 67%;
        background: black;
        border-radius: 50px;
    }

    #prev img {
        width: 50px;
        height: 50px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;
        background: black;
        border-radius: 35px;
    }

        #BD_show img {
        top: 0;
        bottom: 0;
        width: 50%;
        height: 100%;
        margin-left: 24.5%;
        position: absolute;
    }
    .bd {
        position: absolute;
    }
</style>
