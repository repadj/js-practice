var M=Object.defineProperty;var C=(o,e,t)=>e in o?M(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var l=(o,e,t)=>C(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();class L{constructor(){l(this,"_board",[[],[],[],[],[]]);l(this,"mode","pvp");l(this,"currentPlayer","X");l(this,"movesX",0);l(this,"movesO",0);l(this,"gridCenterX",2);l(this,"gridCenterY",2);l(this,"isInGrid",(e,t)=>{let n=this.gridCenterX-1,r=this.gridCenterY-1;return e>=n&&e<n+3&&t>=r&&t<r+3});l(this,"currentPlayerMoves",()=>this.currentPlayer==="X"?this.movesX:this.movesO);l(this,"checkForWin",()=>{let e=this.winCheck("X"),t=this.winCheck("O");return e&&t?"T":e?"X":t?"O":"N"})}makeAMove(e,t){this._board[e][t]===void 0&&this.isInGrid(e,t)&&(this._board[e][t]=this.currentPlayer,this.currentPlayer==="X"?this.movesX++:this.movesO++,this.currentPlayer=this.currentPlayer==="X"?"O":"X")}removePiece(e,t){this._board[e][t]!==void 0&&this._board[e][t]===this.currentPlayer&&(this._board[e][t]=void 0,this.currentPlayer==="X"?this.movesX--:this.movesO--)}moveGrid(e){let t=this.gridCenterX,n=this.gridCenterY;switch(e){case"▲":t--;break;case"▼":t++;break;case"◄":n--;break;case"►":n++;break}return t>=1&&t<=3&&n>=1&&n<=3?(this.gridCenterX=t,this.gridCenterY=n,this.currentPlayer=this.currentPlayer==="X"?"O":"X",!0):!1}winCheck(e){const t=this.gridCenterX-1,n=this.gridCenterY-1;for(let r=t;r<t+3;r++)if(this._board[r][n]===e&&this._board[r][n+1]===e&&this._board[r][n+2]===e)return!0;for(let r=n;r<n+3;r++)if(this._board[t][r]===e&&this._board[t+1][r]===e&&this._board[t+2][r]===e)return!0;return this._board[t][n]===e&&this._board[t+1][n+1]===e&&this._board[t+2][n+2]===e||this._board[t][n+2]===e&&this._board[t+1][n+1]===e&&this._board[t+2][n]===e}randomMove(){if(this.currentPlayer!=="O")return;let e=[],t=[];for(let r=0;r<5;r++)for(let i=0;i<5;i++)this.isInGrid(r,i)&&(this._board[r][i]===void 0?e.push({x:r,y:i}):this._board[r][i]==="O"&&t.push({x:r,y:i}));let n=!1;for(;!n;){let r=Math.floor(Math.random()*3);if(r===0&&this.movesO<3&&e.length>0){let i=e[Math.floor(Math.random()*e.length)];this.makeAMove(i.x,i.y),n=!0}else if(r===1&&t.length>0&&e.length>0&&this.movesO>=2){let i=t[Math.floor(Math.random()*t.length)],a=e[Math.floor(Math.random()*e.length)];this.removePiece(i.x,i.y),this.makeAMove(a.x,a.y),n=!0}else if(r===2&&this.movesO>=2){let a=["▲","▼","◄","►"].filter(s=>this.canMoveGrid(s));if(a.length>0){let s=a[Math.floor(Math.random()*a.length)];this.moveGrid(s),n=!0}}}}canMoveGrid(e){let t=this.gridCenterX,n=this.gridCenterY;switch(e){case"▲":t--;break;case"▼":t++;break;case"◄":n--;break;case"►":n++;break}return t>=1&&t<=3&&n>=1&&n<=3}get board(){return this._board}}function E(o){let e=document.createElement("div");e.id="menu";let t=document.createElement("h1");t.innerHTML="TIC TAC TWO MENU",e.appendChild(t);let n=document.createElement("div");n.id="modeMenu";let r=document.createElement("select");r.id="mode",r.classList.add("menuButton");let i=document.createElement("option");i.value="pvp",i.innerHTML="PvP",r.appendChild(i);let a=document.createElement("option");a.value="pvc",a.innerHTML="PvC",r.appendChild(a),e.appendChild(r);let s=document.createElement("button");s.innerHTML="Start Game",s.classList.add("menuButton"),s.addEventListener("click",()=>{o(r.options[r.selectedIndex].value)}),e.appendChild(s);let u=document.createElement("button");return u.innerHTML="Rules",u.classList.add("menuButton"),u.addEventListener("click",()=>{window.location.href="https://gamescrafters.berkeley.edu/games.php?game=tictactwo"}),e.appendChild(u),e}function f(o,e,t){let n=document.createElement("div");n.id="board";for(let r=0;r<5;r++){let i=document.createElement("div");i.classList.add("row");for(let a=0;a<5;a++){let s=document.createElement("div");s.classList.add("square"),t(r,a)&&s.classList.add("grid"),s.addEventListener("click",u=>{e(r,a,u)}),s.innerHTML=o()[r][a]||"&nbsp;",i.appendChild(s)}n.appendChild(i)}return n}function P(o,e,t){let n=document.createElement("div");return n.id="buttons",["▲","▼","◄","►"].forEach(i=>{let a=document.createElement("button");a.innerHTML=i,a.classList.add("gridButton"),n.appendChild(a),a.addEventListener("click",()=>{e()>=2&&t()==="N"&&(console.log(`Moving grid in direction: ${i}`),o(i))})}),n}let c=document.createElement("div");c.id="box";document.body.appendChild(c);let b="menu",d=new L,h=document.createElement("div");h.id="info";function v(){let o=document.createElement("h1");o.innerHTML="TIC TAC TWO",c.appendChild(o);let e=f(()=>d.board,p,d.isInGrid);c.appendChild(e);let t=P(O,d.currentPlayerMoves,d.checkForWin);c.appendChild(t),m();let n=document.createElement("div");n.id="infobox",c.append(n),n.appendChild(h);let r=document.createElement("button");r.innerHTML="RESTART",r.id="reset",r.addEventListener("click",()=>location.reload()),c.appendChild(r)}if(b==="menu"){let o=E(e=>{T(e),c.innerHTML="",v()});c.appendChild(o)}else v();function T(o){b="game",d.mode=o}function g(){setTimeout(()=>{d.randomMove();const o=f(()=>d.board,p,d.isInGrid);m();const e=document.getElementById("board");e&&c.replaceChild(o,e)},1e3)}function p(o,e,t){if(d.checkForWin()!=="N")return;const n=t.target;d.board[o][e]&&d.board[o][e]===d.currentPlayer&&d.currentPlayerMoves()>=2?(d.removePiece(o,e),n.innerHTML="&nbsp;"):d.currentPlayerMoves()<3?(d.makeAMove(o,e),n.innerHTML=d.board[o][e]||"&nbsp;",m()):h.innerHTML=`Out of pieces! ${d.currentPlayer}'s turn`,d.mode==="pvc"&&d.currentPlayer==="O"&&d.checkForWin()==="N"&&g()}function O(o){if(d.moveGrid(o)){const e=f(()=>d.board,p,d.isInGrid),t=document.getElementById("board");t&&c.replaceChild(e,t),m(),d.mode==="pvc"&&d.currentPlayer==="O"&&d.checkForWin()==="N"&&g()}else h.innerHTML="Invalid move"}function m(){const o=d.checkForWin();o==="X"||o==="O"||o==="T"?h.innerHTML=o==="T"?"TIE!":`${o} WON!!`:h.innerHTML=`${d.currentPlayer}'s turn`}
