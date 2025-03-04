let tiles = [1,2,3,4,5,6,7,8,0]; // 0代表空白格
let board = document.getElementById("board");


 // 初始化拼图
function init() {
    board.innerHTML = '';
    tiles.forEach((num, index) => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.setAttribute('data-value', num);
        
        // 计算原始图片位置
        let originalRow = Math.floor((num - 1) / 3);
        let originalCol = (num - 1) % 3;
        if(num === 0) {
            originalRow = 2;
            originalCol = 2;
            tile.style.backgroundImage = 'none'; // 空白格无背景
        }
        
        // 定位当前显示位置
        tile.style.left = (index % 3) * 100 + "px";
        tile.style.top = Math.floor(index / 3) * 100 + "px";
        tile.style.backgroundPosition = `-${originalCol * 100}px -${originalRow * 100}px`;
        
        if(num !== 0) tile.addEventListener("click", () => move(num));
        board.appendChild(tile);
    });
}

//移动
function move(num) {
    const blankIndex = tiles.indexOf(0);
    const numIndex = tiles.indexOf(num);
    
    if (Math.abs(blankIndex - numIndex) === 3 || 
       (Math.abs(blankIndex - numIndex) === 1 && Math.floor(blankIndex/3) === Math.floor(numIndex/3))) {
        [tiles[blankIndex], tiles[numIndex]] = [tiles[numIndex], tiles[blankIndex]];
        init();
        checkVictory();
    }
}

// 洗牌（随机打乱）
function shuffle() {
    for(let i=0; i<100; i++) { 
        let blankIndex = tiles.indexOf(0);
        let moves = [];
        // 右
        if(blankIndex % 3 !== 2) moves.push(blankIndex +1); 
        // 左
        if(blankIndex % 3 !== 0) moves.push(blankIndex -1); 
        // 下
        if(blankIndex < 6) moves.push(blankIndex +3); 
        // 上（修正条件！）
        if(blankIndex >= 3) moves.push(blankIndex -3); 
        
        // 随机选一个方向移动
        let randomMove = moves[Math.floor(Math.random()*moves.length)];
        [tiles[blankIndex], tiles[randomMove]] = [tiles[randomMove], tiles[blankIndex]];
    }
    init();
}

// 胜利检测
function checkVictory() {
    if(tiles.slice(0,8).every((v,i) => v === i+1)) {
        document.getElementById("victory").style.display = "block";
        board.style.borderColor = "#00ff00";
    }
}

// 开局洗牌！
shuffle();

