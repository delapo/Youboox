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
        border-right: 3px solid #ff4d4d;
        border-left: 3px solid #ff4d4d;
        border-top: 2px solid #ff4d4d;
        border-bottom: 2px solid #ff4d4d;
        bottom: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.02);
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
</style>
