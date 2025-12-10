function startBoot(isShutdown = false) {
    const boot = document.getElementById("bootScreen");
    const black = document.getElementById("blackScreen");

    black.style.display = "none";

    boot.classList.remove("hidden", "boot-normal", "boot-shutdown");

    if (isShutdown) {
        boot.classList.add("boot-shutdown");
    } else {
        boot.classList.add("boot-normal");
    }

    boot.style.display = "flex";
    boot.style.opacity = "1";

    // 종료 부팅일 경우 > 검은화면 유지됨
    if (isShutdown) {
        setTimeout(() => {
            black.style.display = "block";
        }, 4500);
    } else {
    // 정상 부팅일 경우 > 사이트 들어가짐
        setTimeout(() => {
            boot.style.display = "none";
        }, 4500);
    }
}

// 페이지 첫 부팅
window.addEventListener("load", () => startBoot(false));


// 시작 메뉴 
const startBtn = document.getElementById("startButton");
const startImg = document.getElementById("startImg");
const startMenu = document.getElementById("startMenu");

let startOpen = false;

// 시작 버튼 클릭
startBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    startOpen = !startOpen;

    // 안 눌림 : start.png
    // 눌림 : start2.png
    if (startOpen) {
        startImg.src = "./img/start2.png";
        startMenu.classList.remove("hidden");
    } else {
        startImg.src = "./img/start.png";
        startMenu.classList.add("hidden");
    }
});

// 시작 메뉴 내부 클릭 시 닫힘 방지
startMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

// 바탕화면 클릭 시 시작모달창 닫힘
document.addEventListener("click", () => {
    if (startOpen) {
        startMenu.classList.add("hidden");
        startImg.src = "./img/start.png";
        startOpen = false;
    }
});




/* --------------------------------------------- 프로그램 모달창 ------------------------------------------------ */

/* --------- 내 컴퓨터 모달창 ----------- */
const myComputer = document.getElementById("myComputer");
const computerWindow = document.getElementById("computerWindow");
const closeComputer = document.getElementById("closeComputer");

myComputer.addEventListener("click", () => {
    computerWindow.classList.remove("hidden");
    randomizePosition(computerWindow);
    // 모달창이 같은 곳에서 생성되는 문제 때문에 가려져서 안 보임
    // 랜덤하게 생성되는 코드
    playBGM(); 
});

closeComputer.addEventListener("click", () => {
    computerWindow.classList.add("hidden");
    stopBGM();
});



/* -------------------- 선택형 게임 -------------------- */

const clickSound = document.getElementById("clickSound");
const bgm = document.getElementById("bgmSound");

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playBGM() {
    bgm.volume = 0.2; // 볼륨 조절
    bgm.play();
}

function stopBGM() {
    bgm.pause();
    bgm.currentTime = 0;
}

document.addEventListener("click", (e) => {
    if (e.target.tagName === "P" || e.target.classList.contains("nextBtn")) {
        playClick();
    }
});

let score = 0;

function resetGame() {
    score = 0;
    choiceBox.innerHTML = "";
    gameText.onclick = null;
    showStart();
}

// 실행 시 바로 스타트 화면
showStart();

function showStart() {
    gameText.textContent = "START!";
    choiceBox.innerHTML = "";
    gameText.onclick = () => step1();
}

/* ---------------------- 1단계 ---------------------- */
function step1() {
    gameText.textContent = "( 어? 유진이다!!! )";
    choiceBox.innerHTML = `
        <p onclick="score+=10; step1_1()">1. 인사한다</p>
        <p onclick="fail()">2. 모른 척 지나간다</p>
        <p onclick="step1_2()">3. 쳐다보기만 한다</p>
    `;
}

function step1_1() {
    gameText.textContent = "유진 : 안녕!!";
    next(() => step2());
}

function step1_2() {
    gameText.textContent = "유진 : (...)";
    next(() => step2());
}

/* ---------------------- 2단계 ---------------------- */
function step2() {
    gameText.textContent = "( 어.... 무슨 얘기를 하지? )";
    choiceBox.innerHTML = `
        <p onclick="score+=10; step2_1()">1. 오다가 쿠키 샀는데 먹을래?</p>
        <p onclick="score-=10; step2_2()">2. 너 과제는 다 끝냈어?</p>
        <p onclick="score+=30; step2_3()">3. 나 너가 추천해 준 만화 봤어! 재밌던데.</p>
    `;
}

function step2_1() {
    gameText.textContent = "유진 : 헐 고마워";
    next(() => step3());
}

function step2_2() {
    gameText.textContent = "유진 : (...)";
    next(() => step3());
}

function step2_3() {
    gameText.textContent = "유진 : (사귀자는건가?)";
    next(() => step3());
}

/* ---------------------- 3단계 ---------------------- */
function step3() {
    gameText.textContent = "유진 : 배고픈데 밥이나 같이 먹을래? 뭐 먹을까?";
    choiceBox.innerHTML = `
        <p onclick="score+=10; step4()">1. 육회초밥</p>
        <p onclick="step4()">2. 학식</p>
        <p onclick="score-=10; step4()">3. 파스타</p>
    `;
}

/* ---------------------- 4단계 ---------------------- */
function step4() {
    gameText.textContent = "유진 : 밥 먹으니까 디저트 땡기지 않냐?";
    choiceBox.innerHTML = `
        <p onclick="score+=10; step5()">1. 헐...아이스크림 어때?</p>
        <p onclick="fail()">2. 배부르지도 않니? 그만좀 먹어.</p>
        <p onclick="step5()">3. 나는 그닥..</p>
    `;
}

/* ---------------------- 5단계 ---------------------- */
function step5() {
    gameText.textContent = "유진 : 있잖아.. 나 달라진거 없어?";
    choiceBox.innerHTML = `
        <p onclick="score-=10; ending()">1. 머리 잘랐네</p>
        <p onclick="score+=10; ending()">2. 블러셔 바꿨나?</p>
        <p onclick="score+=20; ending()">3. 가방에 달린 키링이 다른 캐릭터로 바뀌었어.</p>
    `;
}

/* ---------------------- 엔딩 ---------------------- */
function ending() {
    let txt = "";
    if (score < 30) txt = "⊗ 최악 배드엔딩... ⊗";
    else if (score < 80) txt = "،،̲ 그럭저럭... ،،̲";
    else txt = "❤︎ ❤︎ 초초초 해피엔딩!!! ❤︎ ❤︎";

    gameText.textContent = txt;
    choiceBox.innerHTML = `<p onclick="resetGame()">다시시작</p>`;
}

/* ---------------------- 실패 ---------------------- */
function fail() {
    gameText.textContent = "⚠︎ 게임 실패! ⚠︎";
    choiceBox.innerHTML = `<p onclick="resetGame()">다시시작</p>`;
}

/* ---------------------- > 버튼 생성 ---------------------- */
function next(stepFunc) {
    choiceBox.innerHTML = `<p class="nextBtn"> > </p>`;
    document.querySelector(".nextBtn").onclick = stepFunc;
}

// 프로그램 창 X 버튼 누르면 다 리셋되는 거
document.getElementById("closeComputer").addEventListener("click", () => {
    resetGame();
    document.getElementById("computerWindow").classList.add("hidden");
});





/* ------------------------------------- 피아노 모달창 ------------------------------------- */

const myPiano = document.getElementById("myPiano");
const pianoWindow = document.getElementById("pianoWindow");
const closePiano = document.getElementById("closePiano");

myPiano.addEventListener("click", () => {
    pianoWindow.classList.remove("hidden");
    randomizePosition(pianoWindow);
});

closePiano.addEventListener("click", () => {
    pianoWindow.classList.add("hidden");
});

const pianoKeys = document.querySelectorAll(".key");
const noteLayer = document.getElementById("noteLayer");

const soundMap = {
    a: "sisi.mp3",
    s: "do.mp3",
    d: "re.mp3",
    f: "mi.mp3",
    g: "fa.mp3",
    h: "sol.mp3",
    j: "la.mp3",
    k: "si.mp3",
    l: "dodo.mp3",
    e: "do2.mp3",
    r: "re2.mp3",
    y: "fa2.mp3",
    u: "sol2.mp3",
    i: "la2.mp3",
    p: "si2.mp3"
    // mp3파일명에 #을 넣었더니 소리가 나오지 않았음 
};

function playSound(key) {

    if (!soundMap[key]) return;

    const audio = new Audio(`./piano/${soundMap[key]}`);
    audio.currentTime = 0;
    audio.play();

    const elem = document.querySelector(`.key[data-key="${key}"]`);
    if (elem) {
        elem.classList.add("active");
        setTimeout(() => elem.classList.remove("active"), 120);

        spawnNoteAtElement(elem, "♪");
    }
}

// 마우스 클릭
pianoKeys.forEach(k =>
    k.addEventListener("mousedown", () => playSound(k.dataset.key))
);

// 키보드 입력
document.addEventListener("keydown", e => playSound(e.key));


const pianoNotesSvg = document.getElementById("pianoNotes");


// elem: 건반
// char: ♪
function spawnNoteAtElement(elem, char = "♪") {
    if (!pianoNotesSvg || !elem) return;

    const svgRect = pianoNotesSvg.getBoundingClientRect();
    const keyRect = elem.getBoundingClientRect();


    const x = (keyRect.left - svgRect.left) + (keyRect.width / 2);
    const y = (keyRect.top - svgRect.top) + (keyRect.height * 0.75);

    // text 생성
    const ns = "http://www.w3.org/2000/svg";
    const t = document.createElementNS(ns, "text");
    t.setAttribute("class", "note");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    t.textContent = char;

    pianoNotesSvg.appendChild(t);

    t.getBoundingClientRect();

    t.classList.add("animate");

    // 애니메이션 끝나면 제거
    setTimeout(() => {
        t.remove();
    }, 1300);
}






/* ------------------------------------- 음악 모달창 ------------------------------------- */
const myMusic = document.getElementById("myMusic");
const musicWindow = document.getElementById("musicWindow");
const closeMusic = document.getElementById("closeMusic");

myMusic.addEventListener("click", () => {
    musicWindow.classList.remove("hidden");
    randomizePosition(musicWindow);
});

closeMusic.addEventListener("click", () => {
    musicWindow.classList.add("hidden");
});

const audio = document.getElementById("audioPlayer");
const select = document.getElementById("musicSelect");
const albumImg = document.getElementById("albumImage");
const slider = document.getElementById("musicSlider");

// 모달창 열릴 때 첫 화면으로 무조건 music1
function initMusic() {
    const num = select.value; // 기본값 1
    albumImg.src = `./img/music${num}.png`;
    audio.src = `./music/music${num}.mp3`;
    audio.pause();
    audio.currentTime = 0;
}
initMusic(); // 모달창 열릴 때 실행될 수 있도록

// 드롭다운 선택 시 앨범 사진 바뀜
select.addEventListener("change", () => {
    const num = select.value;
    albumImg.src = `./img/music${num}.png`;
    audio.src = `./music/music${num}.mp3`;
    audio.pause();
    audio.currentTime = 0;
});

// 재생바 연동
audio.addEventListener("timeupdate", () => {
    if (audio.duration) slider.value = (audio.currentTime / audio.duration) * 100;
});

// 슬라이더로 이동
slider.addEventListener("input", () => {
    audio.currentTime = (slider.value / 100) * audio.duration;
});

// 재생 / 일시정지 / 정지
document.getElementById("playBtn").onclick = () => audio.play();
document.getElementById("pauseBtn").onclick = () => audio.pause();
document.getElementById("stopBtn").onclick = () => {
    audio.pause();
    audio.currentTime = 0;
};

// X버튼 누르면 모든 음악 정지되고 초기화
document.getElementById("closeMusic").onclick = () => {
    audio.pause();
    audio.currentTime = 0;
    slider.value = 0;
    document.getElementById("musicWindow").classList.add("hidden");
};






/* ------------------------------------- 만화 모달창 ------------------------------------- */
const myComics = document.getElementById("myComics");
const comicsWindow = document.getElementById("comicsWindow");
const closeComics = document.getElementById("closeComics");

myComics.addEventListener("click", () => {
    comicsWindow.classList.remove("hidden");
    randomizePosition(comicsWindow);
});

closeComics.addEventListener("click", () => {
    comicsWindow.classList.add("hidden");
});

document.querySelectorAll(".comic-btn").forEach(btn => {
    btn.onclick = () => {
        const page = btn.dataset.page;
        document.querySelectorAll(".comic-page").forEach(p => p.classList.remove("active"));
        document.getElementById("comicPage" + page).classList.add("active");
    }
});






/* ------------------------------------- 농구 모달창 ------------------------------------- */
const myBall = document.getElementById("myBall");
const ballWindow = document.getElementById("ballWindow");
const closeBall = document.getElementById("closeBall");

myBall.addEventListener("click", () => {
    ballWindow.classList.remove("hidden");
    randomizePosition(ballWindow);
});

closeBall.addEventListener("click", () => {
    ballWindow.classList.add("hidden");
});

/* ----------- 농구공 생성 -------------- */
let svg;
let balls = []; // 생성된 공들 저장
let animationRunning = false;

document.getElementById("myBall").addEventListener("click", () => {
    ballWindow.classList.remove("hidden");

    if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "550");
        svg.setAttribute("height", "400");
        svg.style.background = "#c0c0c0";
        svg.style.borderWidth = "2px"
        svg.style.border = "solid"
        svg.style.borderColor = "#000 #fff #fff #000"
        svg.style.cursor = "pointer";
        svg.style.display = "block";
        svg.style.margin = "10px auto";

        ballWindow.querySelector(".window-body").appendChild(svg);

        // 클릭하면 공 생성
        svg.addEventListener("click", (e) => {
            const rect = svg.getBoundingClientRect();
            const x = e.clientX - rect.left - 20;
            const y = e.clientY - rect.top - 20;
            createBall(x, y);
        });
    }

    if (!animationRunning) {
        animationRunning = true;
        animateBalls();
    }
});

// 공 생성
function createBall(x, y) {
    const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttribute("href", "./img/ball2.png");
    img.setAttribute("x", x);
    img.setAttribute("y", y);
    img.setAttribute("width", 40);
    img.setAttribute("height", 40);

    svg.appendChild(img);

    balls.push({
        element: img,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: 20
    });
}

// 애니메이션
function animateBalls() {
    balls.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 0 || b.x > 550 - 40) b.vx *= -1;
        if (b.y < 0 || b.y > 400 - 40) b.vy *= -1;

        b.element.setAttribute("x", b.x);
        b.element.setAttribute("y", b.y);
    });

    requestAnimationFrame(animateBalls);
}

// X 버튼 누르면 공 전부 삭제되면서 모달창도 닫힘
closeBall.addEventListener("click", () => {
    // 모든 공 제거
    if (svg) {
        balls.forEach((b) => b.element.remove());
    }
    balls = [];

    // 모달창 닫기
    ballWindow.classList.add("hidden");
});




/* ------------------------------------- 사이트로딩중 모달창 ------------------------------------- */
const myLoading = document.getElementById("myLoading");
const loadingWindow = document.getElementById("loadingWindow");
const closeLoading = document.getElementById("closeLoading");


closeLoading.addEventListener("click", () => {
    loadingWindow.classList.add("hidden");
});



/* ------------------------------------- 환영 모달창 ------------------------------------- */
const myOpen = document.getElementById("myOpen");
const openWindow = document.getElementById("openWindow");
const closeOpen = document.getElementById("closeOpen");


closeOpen.addEventListener("click", () => {
    openWindow.classList.add("hidden");
});





/* ------------------------------------- 내 프로필 모달창 ------------------------------------- */
const programWindow = document.getElementById("programWindow");
const openProgram = document.getElementById("openProgram");
const closeProgram = document.getElementById("closeProgram");

if (openProgram) {
    openProgram.addEventListener("click", () => {
        programWindow.classList.remove("hidden");
    });
}

closeProgram.addEventListener("click", () => {
    programWindow.classList.add("hidden");
});



/* ------------------------------------- 시스템종료 모달창 ------------------------------------- */
const systemWindow = document.getElementById("systemWindow");
const openSystem = document.getElementById("openSystem");
const closeSystem = document.getElementById("closeSystem");
const systemYes = document.getElementById("systemYes"); 
const systemNo = document.getElementById("systemNo"); 

if (openSystem) {
    openSystem.addEventListener("click", () => {
        systemWindow.classList.remove("hidden");
    });
}

closeSystem.addEventListener("click", () => {
    systemWindow.classList.add("hidden");
});

/* -------- 부팅 애니메이션 재생 -------- */
systemYes.addEventListener("click", () => {
    systemWindow.classList.add("hidden");
    startBoot(true); 
});



// 취소 버튼 
systemNo.addEventListener("click", () => {
    systemWindow.classList.add("hidden");
});

// 예 버튼
systemYes.addEventListener("click", () => {
    systemWindow.classList.add("hidden");
    startBoot(true);

});








/* -------- 모달 창 드래그 기능 -------- */
function makeDraggable(titleBar, windowBox) {
    let offsetX = 0,
        offsetY = 0;
    let dragging = false;

    titleBar.addEventListener("mousedown", (e) => {
        dragging = true;
        offsetX = e.clientX - windowBox.offsetLeft;
        offsetY = e.clientY - windowBox.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (dragging) {
            windowBox.style.left = `${e.clientX - offsetX}px`;
            windowBox.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
    });
}

makeDraggable(pianoTitle, pianoWindow);
makeDraggable(musicTitle, musicWindow);
makeDraggable(comicsTitle, comicsWindow);
makeDraggable(ballTitle, ballWindow);
makeDraggable(loadingTitle, loadingWindow);
makeDraggable(openTitle, openWindow);
makeDraggable(systemTitle, systemWindow);
makeDraggable(document.getElementById("computerTitle"), computerWindow);
makeDraggable(document.getElementById("programTitle"), programWindow);




// 모달창 랜덤하게 뜨는 거
function randomizePosition(windowBox) {
    const maxX = window.innerWidth - windowBox.offsetWidth - 20;
    const maxY = window.innerHeight - windowBox.offsetHeight - 60;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    windowBox.style.left = `${randomX}px`;
    windowBox.style.top = `${randomY}px`;
}