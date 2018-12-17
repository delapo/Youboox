<template>
    <div id="menu_gauche2">
        <div id="gallery"></div>
    </div>
</template>

<style scoped>
    #menu_gauche2 {
        width: 200px;
        height: 58%;
        position: fixed;
        border-radius: 8px;
        border-right: 3px solid #c54343;
        border-left: 3px solid #c54343;
        border-top: 2px solid #c54343;
        border-bottom: 2px solid #c54343;
        bottom: 10px;
        right: 2.5%;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.02);
        padding: 10px;
        overflow-y: scroll;
    }

    ::-webkit-scrollbar {
        width: 20px;
        margin: 2px;
    }

    ::-webkit-scrollbar-thumb {
        background: #c54343;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #c54343;
    }
</style>
