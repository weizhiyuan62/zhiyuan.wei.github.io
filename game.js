let gameOn = false;
let score = 0;
let intervalId;
let butterfly;
let startTime;
let timeoutId;
let finallevel;

function startGame() {
    if (!gameOn) {
        const timeLimit = parseInt(prompt('请输入游戏时间限制（秒）：'));
        if (isNaN(timeLimit) || timeLimit <= 0) {
            alert('请输入一个正整数！');
            return;
        }
        gameOn = true;
        startTime = Date.now();
        butterfly = document.querySelector('.butterfly');
        butterfly.addEventListener('click', catchButterfly);
        intervalId = setInterval(moveButterfly, 1000);
        timeoutId = setTimeout(() => {
            stopGame();
        }, timeLimit * 1000);
    }
}

function stopGame() {
    if (gameOn) {
        gameOn = false;
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        butterfly.removeEventListener('click', catchButterfly);
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const scorePerSecond = 1.5 * score / elapsedTime;
        if (scorePerSecond >= 5) {
            finallevel = 5;
            triggerEasterEgg(); // 触发彩蛋
        } else if (scorePerSecond >= 4) {
            finallevel = 4;
        } else if (scorePerSecond >= 3) {
            finallevel = 3;
        } else if (scorePerSecond >= 2) {
            finallevel = 2;
        } else {
            finallevel = 1;
        }
        if(finallevel == 5){
            alert('恭喜你达到了最高等级，触发彩蛋！\n世界将为你闪烁并欢呼10s！');
        }
        alert('游戏结束，得分：' + score + '，用时：' + elapsedTime + '秒' + '，总分/时间后换算等级分：' + finallevel);
        
        score = 0;
        document.getElementById('score').textContent = score;
    }
}

function triggerEasterEgg() {
    
    // 飞出一个爱心
    const heart = document.createElement('div');
    heart.className = 'heart';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000); // 7秒后移除爱心

    // 背景不断变色
    let hue = 0;
    const colorInterval = setInterval(() => {
        document.body.style.backgroundColor = `hsl(${hue}, 100%, 80%)`;
        hue = (hue + 1) % 360;
    }, 50);

    setTimeout(() => {
        clearInterval(colorInterval);
        document.body.style.backgroundColor = ''; // 恢复默认背景
    }, 10000); // 10秒后停止变色
}

function moveButterfly() {
    let x = Math.floor(Math.random() * 450 + 25);
    let y = Math.floor(Math.random() * 450 + 25);
    butterfly.style.top = y + 'px';
    butterfly.style.left = x + 'px';
}

function catchButterfly() {
    score++;
    document.getElementById('score').textContent = score;
}

function showGameRules() {
    alert('游戏规则：点击蝴蝶得分，尽可能多地捕捉蝴蝶！\n '+'游戏会依照总分与用时评价你的最后等级，因此不一定时间越长越好哦!\n');
}

function showAbout() {
    alert('关于：这是一个简单的捕捉蝴蝶游戏，祝您玩得愉快！');
}

alert('欢迎来到捉蝴蝶小游戏！\n版本信息：v1.0\n作者：Zhiyuan Wei\n日期：2025年3月24日');

document.querySelector('.start-button').addEventListener('click', startGame);
