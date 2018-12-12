<template>
    <div id="menu_gauche2">
        <div id="gallery"></div>
    </div>
</template>

<style scoped>
    #menu_gauche2 {
        width: 250px;
        height: 73%;
        position: absolute;
        border-radius: 5px;
        border: 3px solid #ff4d4d;
        bottom: 10px;
        left: 10px;
        padding: 10px;
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 20px;
        margin: 2px;
    }
    ::-webkit-scrollbar-thumb {
        background: #ff4d4d;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #b30000;
    }
    #gallery {
        margin-top: 10px;
    }

    #page {
        width: 230px;
        margin-bottom: 10px;
        margin-right: 10px;
        vertical-align: middle;
    }
</style>
