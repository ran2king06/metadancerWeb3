function gameLoaded() {
    console.log(`Game Ready!`);
    window.top.postMessage('Game Load Done', '*')
}
function gameEnd() {
    console.log(`End of Game`);
}

function startDancing() {
    play(parseInt(battleNum), crew);
}

function play(gameLv, dancers) {
    if (unity == null) {
        console.error(`unity is null, please wait until webGL loaded`);
        return;
    }
    const data = {
        lv: gameLv,
        ids: dancers
    }
    unity.SendMessage('GameManager', 'Play', JSON.stringify(data));
}

function end(isPlayerWin) {
    if (unity == null) {
        console.error(`unity is null, please wait until webGL loaded`);
        return;
    }

    unity.SendMessage('GameManager', 'OnGameResultReceive', `${isPlayerWin}`);
}

function reset() {
    if (unity == null) {
        console.error(`unity is null, please wait until webGL loaded`);
        return;
    }

    unity.SendMessage('GameManager', 'ResetGame');
}
