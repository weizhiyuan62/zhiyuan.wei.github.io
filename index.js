// 生日祝福页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化彩纸效果
    createConfetti();
    
    // 绑定按钮事件
    initializeButtons();
    
    // 自动播放欢迎动画
    setTimeout(() => {
        showWelcomeMessage();
    }, 3000);
});

// 创建彩纸效果
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#ff69b4'];
    
    function createSingleConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // 移除动画完成的彩纸
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
    
    // 定期创建彩纸
    setInterval(createSingleConfetti, 300);
}

// 初始化按钮功能
function initializeButtons() {
    const blowCandlesBtn = document.getElementById('blow-candles');
    const playMusicBtn = document.getElementById('play-music');
    const surpriseBtn = document.getElementById('surprise');
    
    // 吹灭蜡烛功能
    blowCandlesBtn.addEventListener('click', function() {
        blowCandles();
        this.textContent = '蜡烛已吹灭 ✨';
        this.disabled = true;
        setTimeout(() => {
            this.textContent = '吹灭蜡烛 🕯️';
            this.disabled = false;
            restoreCandles();
        }, 3000);
    });
    
    // 播放音乐功能
    playMusicBtn.addEventListener('click', function() {
        playBirthdaySong();
        this.textContent = '正在播放... 🎵';
    });
    
    // 惊喜功能
    surpriseBtn.addEventListener('click', function() {
        showSurprise();
    });
}

// 吹灭蜡烛效果
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = 'none';
        flame.style.opacity = '0';
        flame.style.transform = 'translateX(-50%) scale(0)';
    });
    
    // 添加吹气效果
    const cake = document.getElementById('birthday-cake');
    cake.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        cake.style.animation = '';
    }, 500);
}

// 恢复蜡烛
function restoreCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = 'flicker 1s ease-in-out infinite alternate';
        flame.style.opacity = '1';
        flame.style.transform = 'translateX(-50%) scale(1)';
    });
}

// 播放生日歌
function playBirthdaySong() {
    const audio = new Audio('images/bir.mp3');
    
    // 设置音量
    audio.volume = 0.7;
    
    // 播放音频
    audio.play().then(() => {
        console.log('生日歌开始播放');
        // 添加音乐播放视觉效果
        document.body.style.animation = 'musicPulse 0.6s ease-in-out infinite';
        
        // 音乐结束时停止视觉效果
        audio.addEventListener('ended', () => {
            document.body.style.animation = '';
            const playMusicBtn = document.getElementById('play-music');
            playMusicBtn.textContent = '播放生日歌 🎵';
        });
        
    }).catch(error => {
        console.error('音频播放失败:', error);
        alert('音频文件加载失败，请确保 images/bir.mp3 文件存在');
        const playMusicBtn = document.getElementById('play-music');
        playMusicBtn.textContent = '播放生日歌 🎵';
    });
}

// 惊喜效果
function showSurprise() {
    // 创建惊喜弹窗
    const surpriseModal = document.createElement('div');
    surpriseModal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.5s ease-out;
        ">
            <div style="
                background: linear-gradient(45deg, #ff9a9e, #fecfef);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                color: white;
                font-size: 1.5rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: bounceIn 0.8s ease-out;
                max-width: 400px;
                margin: 20px;
            ">
                <div style="font-size: 3rem; margin-bottom: 20px;">🎁</div>
                <h2 style="margin-bottom: 20px;">特别惊喜！</h2>
                <p style="margin-bottom: 20px;">黄梓涵，愿你的20岁充满惊喜和快乐！</p>
                <p style="font-size: 2rem;">🌟✨🎊🎉🎈</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 20px;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 25px;
                    background: white;
                    color: #ff6b6b;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1rem;
                ">关闭</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(surpriseModal);
    
    // 增强彩纸效果
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSpecialConfetti();
        }, i * 50);
    }
}

// 创建特殊彩纸效果
function createSpecialConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#ff69b4'];
    const shapes = ['◆', '●', '▲', '★', '♥', '♠'];
    
    const confetti = document.createElement('div');
    confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    confetti.style.position = 'absolute';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
    confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
    confetti.style.zIndex = '1001';
    
    confettiContainer.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 5000);
}

// 显示欢迎消息
function showWelcomeMessage() {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #6c5ce7, #a29bfe);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideInRight 1s ease-out, fadeOut 1s ease-out 4s forwards;
            z-index: 100;
            max-width: 250px;
        ">
            <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 5px;">🎉 生日快乐！</div>
            <div style="font-size: 0.9rem;">点击按钮体验更多惊喜~</div>
        </div>
    `;
    
    document.body.appendChild(welcomeMsg);
    
    setTimeout(() => {
        if (welcomeMsg.parentNode) {
            welcomeMsg.parentNode.removeChild(welcomeMsg);
        }
    }, 5000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes musicPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px);
        }
        50% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;

document.head.appendChild(style);
