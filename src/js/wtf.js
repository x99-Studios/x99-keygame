let keys = ["A", "S", "D"];
let life = 3;
let win = 0;
let maxwin = 5

let slidePlaces = document.querySelectorAll(".letter");

function sil() {
  for (var i = 0; i < slidePlaces.length; i++) {
    slidePlaces[i].innerHTML = " ";
    slidePlaces[i].classList.remove("letter-anim");
    slidePlaces[i].style.animationPlayState = "running";
    slidePlaces[i].style.display = 'block'
  }
}

function game() {
  sil();
  setTimeout(() => {
    let devammi = true;
    let keydevam = true

    const randomKeyNumForKey = Math.floor(Math.random() * 3);
    const randomKeyNumForPlace = Math.floor(Math.random() * 3);

    slidePlaces[randomKeyNumForPlace].innerHTML = keys[randomKeyNumForKey];
    slidePlaces[randomKeyNumForPlace].classList.add("letter-anim");

    document.addEventListener("keypress", (e) => {
      // console.log('aaaaaaa')
      devammi = false;
      if(keydevam){
        keydevam = false
        const whatThePress = e.code.substring(3, 4);

      if (whatThePress === keys[randomKeyNumForKey]) {
        var place = slidePlaces[randomKeyNumForPlace].getBoundingClientRect();
        if (place.top < 683 && place.top > 506) {
          win += 1;
          // console.log(win);
          if(win === maxwin){
            console.log('kaznadiniz')
            return
          }else {
            game()
            return
          }
        } else if(place.top > 683) {
          life -= 1;
          if (life === 0) {
            console.log("yenildin");
            return;
          } else {
            game();
            return
          }
        }else if (place.top < 506){
          life -= 1;
          if (life === 0) {
            console.log("yenildin");
            return;
          } else {
            game();
            return
          }
        }
      } else {
        life -= 1;
        if (life === 0) {
          console.log("yenildin");
          return;
        } else {
          game();
          return
        }
      }
      }
    });
    setTimeout(() => {
      // console.log(devammi)
      if (devammi) {
        life -= 1;
        if (life === 0) {
          console.log("yenildin");
          return;
        } else {
          game();
        }
      }
    }, 1500);
  }, 10);
}

game();































let letter = ["A", "S", "D", "F"],
  life = 3,
  win = 0,
  maxwin = 100,
  gameStart = false,
  key = "",
  randomLetter = 0,
  randomPlace = 0,
  rectTop = 683,
  rectBottom = 506,
  spamGuard = false,
  keyPress = 0,
  lateWork = true;

$(document).ready(() => {
  const letters = document.querySelectorAll(".letter");

  function clean() {
    for (var i = 0; i < letters.length; i++) {
      letters[i].innerHTML = " ";
      letters[i].classList.remove("letter-anim");
    }
  }

  function play() {
    clean();
    console.log("can " + life);
    console.log("kazanma " + win);
    setTimeout(() => {
      if (life > 0 && win < 5) {
        gameStart = true;
        randomLetter = Math.floor(Math.random() * letter.length);
        randomPlace = Math.floor(Math.random() * letters.length);
        letters[randomPlace].innerHTML = letter[randomLetter];
        letters[randomPlace].classList.add("letter-anim");
        key = letter[randomLetter];
      }
    }, 10);
  }
  play();

  function heart(heart) {
    if (heart === 0) {
      console.log("yenildin");
      return;
    } else {
      play();
      return;
    }
  }

  function won(won) {
    if (won === 5) {
      console.log("tebrikler");
      return;
    } else {
      play();
      return;
    }
  }

  document.addEventListener("keypress", (e) => {
    const keypressing = e.code.substring(3, 4);
    if (!spamGuard) {

      spamGuard = true;
      if (gameStart) {
        if (keypressing === key) {
          const rect = letters[randomPlace].getBoundingClientRect();
          if (rect.top > rectBottom && rect.top < rectTop) {
            gameStart = false;
            spamGuard = false;
            win += 1;
            won(win);
            return;
          } else {
            gameStart = false;
            spamGuard = false;
            life -= 1;
            heart(life);
          }
        } else {
          life -= 1;
          heart(life);
        }
      }
    }
  });
});



























let letter = ["A", "S", "D", "F"],
  life = 3,
  win = 0,
  maxwin = 100,
  gameStart = false,
  key = "",
  randomLetter = 0,
  randomPlace = 0,
  rectTop = 683,
  rectBottom = 506,
  spamGuard = false,
  lateWork = [],
  whichGame = 0,
  gameNowKey = '',
  gameNowCheckKey = ''

$(document).ready(() => {
  const letters = document.querySelectorAll(".letter");

  function clean() {
    for (var i = 0; i < letters.length; i++) {
      letters[i].innerHTML = " ";
      letters[i].classList.remove("letter-anim");
    }
  }

  function play() {
    clean();
    whichGame += 1
    console.log("can " + life);
    console.log("kazanma " + win);
    setTimeout(()=>{
      gameNowKey = `game${whichGame}`
      var newarr = []
      var objj = {[gameNowKey]:false}
      newarr.push(objj)
      lateWork.push(newarr)
    },10)
    setTimeout(() => {
      if (life > 0 && win < 5) {
        gameStart = true;
        randomLetter = Math.floor(Math.random() * letter.length);
        randomPlace = Math.floor(Math.random() * letters.length);
        letters[randomPlace].innerHTML = letter[randomLetter];
        letters[randomPlace].classList.add("letter-anim");
        key = letter[randomLetter];
        lateGame(whichGame)
      }
    }, 20);
  }
  play();

  function lateGame(num){
    setTimeout(()=>{
      if(!lateWork[num-1][1]){
        life-=1
        heart(life)
      }
    },1500)
  }

  function heart(heart) {
    gameStart = false;
    spamGuard = false;
    if (heart === 0) {
      console.log("yenildin");
      return;
    } else {
      play();
      return;
    }
  }

  function won(won) {
    gameStart = false;
    spamGuard = false;
    if (won === 5) {
      console.log("tebrikler");
      return;
    } else {
      play();
      return;
    }
  }

  document.addEventListener("keypress", (e) => {
    const keypressing = e.code.substring(3, 4);
    if (!spamGuard) {
      spamGuard = true;
      gameNowCheckKey = `game${whichGame}check`
      var objj2 = {[gameNowCheckKey]:true}
      lateWork[whichGame-1].push(objj2)        
      if (gameStart) {
        if (keypressing === key) {
          const rect = letters[randomPlace].getBoundingClientRect();
          if (rect.top > rectBottom && rect.top < rectTop) {
            win += 1;
            won(win);
            return;
          } else {
            life -= 1;
            heart(life);
          }
        } else {
          life -= 1;
          heart(life);
        }
      }
    }
  });
});







// Buradaki ayarlardan sadece letter ı değiştirebilirsiniz.
// Diğer ayarlara pls dokunmayın. Can ile maxwini değiştirecekseniz index.html deki divleri ayarlamanız gerekmekte. Koda yazsaydım kod kalabalığı olurdu ondan siz elinizle yapın.
// Dipnot: spamGuard ın false olması spam koruması yok demek değil o sürekli var. spamGuard sadece tuşa bir defa basıldığı anda true oluyor o yüzden şu an false elleşmeyin ona.
// Discord Eiben#4325
// Github Eiben
// Steam /naeiben


let letter = ["A", "S", "D"],
  life = 3,
  win = 0,
  maxwin = 5,
  gameStart = false,
  key = "",
  randomLetter = 0,
  randomPlace = 0,
  rectTop = 683,
  rectBottom = 470,
  spamGuard = false,
  lateWork = [],
  whichGame = 0,
  gameNowKey = "",
  gameNowCheckKey = "",
  redColor = false;

$(document).ready(() => {
  const letters = document.querySelectorAll(".letter");
  const heartPlace = document.querySelectorAll(".life-place div");
  const winPlace = document.querySelectorAll(".win-place div");

  function clean() {
    for (var i = 0; i < letters.length; i++) {
      letters[i].innerHTML = " ";
      letters[i].classList.remove("letter-anim");
      letters[i].style.color = "#fff";
    }
  }

  function play() {
    clean();
    whichGame += 1;
    const numForRed = Math.floor(Math.random() * 101);
    if (numForRed < 40) {
      redColor = true;
    }
    setTimeout(() => {
      gameNowKey = `game${whichGame}`;
      var newarr = [];
      var objj = { [gameNowKey]: false };
      newarr.push(objj);
      lateWork.push(newarr);
    }, 10);
    setTimeout(() => {
      if (life > 0 && win < maxwin) {
        gameStart = true;
        randomLetter = Math.floor(Math.random() * letter.length);
        randomPlace = Math.floor(Math.random() * letters.length);
        letters[randomPlace].innerHTML = letter[randomLetter];
        letters[randomPlace].classList.add("letter-anim");
        key = letter[randomLetter];
        if (redColor) {
          letters[randomPlace].style.color = "red";
        }
        lateGame(whichGame);
      }
    }, 20);
  }
  play();

  function lateGame(num) {
    setTimeout(() => {
      if (!lateWork[num - 1][1]) {
        if (redColor) {
          redColor = false;
          play();
          return;
        } else {
          life -= 1;
          heart(life);
        }
      }
    }, 1500);
  }

  function setHeart(life) {
    for (var i = 0; i < 3; i++) {
      heartPlace[i].style.background = "transparent";
    }
    setTimeout(() => {
      for (var i = 0; i < life; i++) {
        heartPlace[i].style.background = "red";
      }
    }, 10);
  }
  setHeart(life);
  function setWin(wiin) {
    for (var i = 0; i < 5; i++) {
      winPlace[i].style.background = "transparent";
    }
    setTimeout(() => {
      for (var i = 0; i < wiin; i++) {
        winPlace[i].style.background = "#35eb0c";
      }
    }, 10);
  }

  function heart(heart) {
    gameStart = false;
    spamGuard = false;
    setHeart(heart);
    if (heart === 0) {
      console.log("yenildin");
      return;
    } else {
      play();
      return;
    }
  }

  function won(won) {
    gameStart = false;
    spamGuard = false;
    setWin(won);
    if (won === maxwin) {
      console.log("tebrikler");
      return;
    } else {
      play();
      return;
    }
  }

  document.addEventListener("keypress", (e) => {
    const keypressing = e.code.substring(3, 4);
    if (!spamGuard) {
      spamGuard = true;
      gameNowCheckKey = `game${whichGame}check`;
      var objj2 = { [gameNowCheckKey]: true };
      lateWork[whichGame - 1].push(objj2);
      if (gameStart) {
        if (redColor) {
          redColor = false;
          life -= 1;
          heart(life);
        } else {
          if (keypressing === key) {
            const bodySel = document.querySelector(".container");
            const doctop = bodySel.getBoundingClientRect().bottom
            const docbot = bodySel.getBoundingClientRect().top
            rectTop = (683*doctop)/860.75
            rectBottom = (470*docbot)/78.25
            const rect = letters[randomPlace].offsetTop;
            if (rect > rectBottom && rect < rectTop) {
              win += 1;
              won(win);
              return;
            } else {
              life -= 1;
              heart(life);
            }
          } else {
            life -= 1;
            heart(life);
          }
        }
      }
    }
  });
});



// Buradaki ayarlardan sadece letter ı değiştirebilirsiniz.
// Diğer ayarlara pls dokunmayın. Can ile maxwini değiştirecekseniz index.html deki divleri ayarlamanız gerekmekte. Koda yazsaydım kod kalabalığı olurdu ondan siz elinizle yapın.
// Dipnot: spamGuard ın false olması spam koruması yok demek değil o sürekli var. spamGuard sadece tuşa bir defa basıldığı anda true oluyor o yüzden şu an false elleşmeyin ona.
// Discord Eiben#4325
// Github Eiben
// Steam /naeiben

let letter = ["A", "S", "D"],
  life = 3,
  win = 0,
  maxwin = 5,
  gameStart = false,
  key = "",
  randomLetter = 0,
  randomPlace = 0,
  rectTop = 683,
  rectBottom = 470,
  rectFark = 213,
  rectTopNow = 683,
  rectBottomNow = 470,
  rectFarkNow = 213,
  spamGuard = false,
  lateWork = [],
  whichGame = 0,
  gameNowKey = "",
  gameNowCheckKey = "",
  redColor = false,
  oncekiRedMi = false,
  kacS = 4,
  kacMs = 4000

$(document).ready(() => {
  const letters = document.querySelectorAll(".letter");
  const heartPlace = document.querySelectorAll(".life-place div");
  const winPlace = document.querySelectorAll(".win-place div");

  function clean() {
    for (var i = 0; i < letters.length; i++) {
      letters[i].innerHTML = " ";
      letters[i].classList.remove("letter-anim");
      letters[i].style.color = "#fff";
      letters[i].style.animation = " ";
    }
  }
  
  function play() {
    clean();
    whichGame += 1;
    const numForRed = Math.floor(Math.random() * 101);
    if (numForRed < 40) {
      if(!oncekiRedMi){
        redColor = true
        oncekiRedMi = true
      }
    }
    const numForPlace = Math.floor(Math.random() * 550) + 150;

    if (numForPlace < 470) {
      rectBottomNow = numForPlace;
      rectFarkNow = 470 - rectBottomNow;
      rectTopNow = 683 - rectFarkNow;
    } else if (683 < numForPlace) {
      rectTopNow = numForPlace;
      rectFarkNow = numForPlace - 683;
      rectBottomNow = 470 + rectFarkNow;
    } else{
      rectTopNow = numForPlace;
      rectFarkNow = 683 - rectTopNow;
      rectBottomNow = 470 - rectFarkNow;
    }
    setTimeout(() => {
      gameNowKey = `game${whichGame}`;
      var newarr = [];
      var objj = { [gameNowKey]: false };
      newarr.push(objj);
      lateWork.push(newarr);
    }, 10);
    setTimeout(() => {
      if (life > 0 && win < maxwin) {
        gameStart = true;
        randomLetter = Math.floor(Math.random() * letter.length);
        randomPlace = Math.floor(Math.random() * letters.length);
        letters[randomPlace].innerHTML = letter[randomLetter];
        letters[randomPlace].classList.add("letter-anim");
        $('.letter-anim').css('animation', `top-to-bot ${kacS}s linear`)
        key = letter[randomLetter];
        if (redColor) {
          letters[randomPlace].style.color = "red";
        }else {
        letters[randomPlace].style.color = "white";
        }
        const bodySel = document.querySelector(".container");
        const doctop = bodySel.getBoundingClientRect().bottom;
        const docbot = bodySel.getBoundingClientRect().top;
        rectTop = (rectTopNow * doctop) / 860.75;
        rectBottom = (rectBottomNow * docbot) / 78.25;
        const myInterval = setInterval(() => {
          const rectOffset = letters[randomPlace].offsetTop;
          if (rectOffset < rectTop && rectOffset > rectBottom) {
            letters[randomPlace].style.color = "green";
          } else if (rectOffset > rectTop) {
            if(redColor){
              letters[randomPlace].style.color = "red";
            }else{
              oncekiRedMi = false
              letters[randomPlace].style.color = "white";
            }
            clearInterval(myInterval);
          }
        }, 5);
        lateGame(whichGame);
      }
    }, 20);
  }
  play();

  function lateGame(num) {
    setTimeout(() => {
      if (!lateWork[num - 1][1]) {
        if (redColor) {
          redColor = false;
          play();
          return;
        } else {
          life -= 1;
          heart(life);
        }
      }
    }, kacMs);
  }

  function setHeart(life) {
    for (var i = 0; i < 3; i++) {
      heartPlace[i].style.background = "transparent";
    }
    setTimeout(() => {
      for (var i = 0; i < life; i++) {
        heartPlace[i].style.background = "red";
      }
    }, 10);
  }
  setHeart(life);
  function setWin(wiin) {
    for (var i = 0; i < 5; i++) {
      winPlace[i].style.background = "transparent";
    }
    setTimeout(() => {
      for (var i = 0; i < wiin; i++) {
        winPlace[i].style.background = "#35eb0c";
      }
    }, 10);
  }

  function heart(heart) {
    gameStart = false;
    spamGuard = false;
    setHeart(heart);
    if (heart === 0) {
      console.log("yenildin");
      return;
    } else {
      play();
      return;
    }
  }

  function won(won) {
    gameStart = false;
    spamGuard = false;
    setWin(won);
    if (won === maxwin) {
      console.log("tebrikler");
      return;
    } else {
      play();
      return;
    }
  }

  document.addEventListener("keypress", (e) => {
    const keypressing = e.code.substring(3, 4);
    if (!spamGuard) {
      spamGuard = true;
      gameNowCheckKey = `game${whichGame}check`;
      var objj2 = { [gameNowCheckKey]: true };
      lateWork[whichGame - 1].push(objj2);
      if (gameStart) {
        if (redColor) {
          redColor = false;
          life -= 1;
          heart(life);
        } else {
          if (keypressing === key) {
            const rect = letters[randomPlace].offsetTop;
            if (rect > rectBottom && rect < rectTop) {
              win += 1;
              won(win);
              return;
            } else {
              life -= 1;
              heart(life);
            }
          } else {
            life -= 1;
            heart(life);
          }
        }
      }
    }
  });
});
