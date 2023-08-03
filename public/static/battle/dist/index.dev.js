"use strict";

/* eslint-disable no-unused-vars */

/**
 * 當遊戲順利執行時，會觸發該函式
 */
function gameLoaded() {
  console.log("Game Ready!"); // window.parent.afterWEBGLLoadDone();
  // Game Load Done

  window.top.postMessage('Game Load Done', '*'); //inside the iframe
}
/**
 * 當 遊戲結束動畫 撥放完畢時，會觸發該函式
 */


function gameEnd() {
  console.log("End of Game");
}
/**
 * 開始遊戲
 * @param {number} gameLv 關卡等級 1~30
 * @param {string[]} dancers 舞者名稱陣列
 */


function startDancing() {
  play(parseInt(battleNum), crew);
}

function play(gameLv, dancers) {
  if (unity == null) {
    console.error("unity is null, please wait until webGL loaded");
    return;
  }

  var data = {
    lv: gameLv,
    ids: dancers
  };
  unity.SendMessage('GameManager', 'Play', JSON.stringify(data));
}
/**
 * 輸入遊戲結果，輸入後，動畫將會自動撥放到結束
 * @param {boolean} isPlayerWin 玩家勝利即為 true，反之為 false
 */


function end(isPlayerWin) {
  if (unity == null) {
    console.error("unity is null, please wait until webGL loaded");
    return;
  }

  unity.SendMessage('GameManager', 'OnGameResultReceive', "".concat(isPlayerWin));
}
/**
 * 重置遊戲狀態，當遊戲結束後，iframe如果要被隱藏，可以呼叫這個函式
 */


function reset() {
  if (unity == null) {
    console.error("unity is null, please wait until webGL loaded");
    return;
  }

  unity.SendMessage('GameManager', 'ResetGame');
}