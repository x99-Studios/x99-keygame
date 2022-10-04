// $(document).ready(function() {

//   window.addEventListener('message', function(event) {
//       switch (event.data.action) {
//           case "startKeyGame":
//             console.log("js geldik yolu ac")
//             play();
//           break;
//   }})
// });
// 40 - 700

let onGame = false;

function game(
  letter1,
  letter2,
  letter3,
  deger4,
  deger5,
  deger6,
  deger7,
  deger8
) {
  if (!onGame) {
    onGame = true
    $("#napim").show();
    $(".life-place").hide();
    let progressTime = deger8,
      progressTimeMs = progressTime * 1000;
    const prog = document.querySelector(".progress");
    $(".progress-bar").show();
    $(".slide-game").hide();
    prog.attributeStyleMap.clear();
    setTimeout(() => {
      prog.style.animation = `loader ${progressTime}s ease`;
    }, 10);
    setTimeout(() => {
      let letter = [letter1, letter2, letter3],
        life = deger4,
        maxlife = deger4,
        win = 0,
        maxwin = deger5,
        yellowSpeed = deger6 / 2,
        yellowMs = yellowSpeed * 1000,
        normalSpeed = deger7 / 2,
        normalMs = normalSpeed * 1000,
        gameStart = false,
        key = "",
        randomLetter = 0,
        randomPlace = 0,
        rectTop = 0,
        rectBottom = 0,
        rectTopNow = 0,
        rectBottomNow = 0,
        rectFarkNow = 350, // yeşilin uzunluğu
        rectAralik = 50,
        rectAralik2 = 350, // max değer (700 - rectFarkNow)
        spamGuard = false,
        lateWork = [],
        whichGame = 0,
        gameNowKey = "",
        gameNowCheckKey = "",
        redColor = false,
        oncekiRedMi = false;
      $(".life-place").show();
      const heartPlace = document.querySelector(".life-place");
      heartPlace.innerHTML = " ";
      for (var i = 0; i < maxlife; i++) {
        var el = document.createElement("div");
        heartPlace.appendChild(el);
      }
      const winPlace = document.querySelector(".win-place");
      winPlace.innerHTML = " ";
      for (var i = 0; i < maxwin; i++) {
        var el = document.createElement("div");
        winPlace.appendChild(el);
      }
      $(".progress-bar").hide();
      $(".slide-game").show();
      const letters = document.querySelectorAll(".letter");

      function clean() {
        for (var i = 0; i < letters.length; i++) {
          letters[i].innerHTML = " ";
          letters[i].attributeStyleMap.clear();
          letters[i].style.color = "#fff";
        }
      }

      function play() {
        redColor = false;
        clean();
        whichGame += 1;
        const numForRed = Math.floor(Math.random() * 100);
        // console.log(whichGame);
        if (numForRed < 40) {
          if (!oncekiRedMi && whichGame !== 1) {
            redColor = true;
            oncekiRedMi = true;
          }
        }
        const numForPlaceRandom = (min, max) =>
          Math.floor(Math.random() * (max - min)) + min;
        const numForPlace = numForPlaceRandom(rectAralik, rectAralik2);
        rectBottomNow = numForPlace;
        rectTopNow = numForPlace + rectFarkNow;
        setTimeout(() => {
          gameNowKey = `game${whichGame}`;
          var newarr = [];
          var objj = { [gameNowKey]: false };
          newarr.push(objj);
          lateWork.push(newarr);
        }, 5);
        setTimeout(() => {
          if (life > 0 && win < maxwin) {
            gameStart = true;
            randomLetter = Math.floor(Math.random() * letter.length);
            randomPlace = Math.floor(Math.random() * letters.length);
            letters[randomPlace].innerHTML = letter[randomLetter];
            if (whichGame === 1) {
              letters[
                randomPlace
              ].style.animation = `top-to-bot ${yellowSpeed}s linear`;
            } else {
              letters[
                randomPlace
              ].style.animation = `top-to-bot ${normalSpeed}s linear`;
            }
            key = letter[randomLetter];
            if (redColor && whichGame !== 1) {
              letters[randomPlace].style.color = "red";
            } else if (whichGame === 1) {
              letters[randomPlace].style.color = "yellow";
            } else {
              letters[randomPlace].style.color = "white";
            }
            const bodySel = document.querySelector(".container");
            const doctop = bodySel.getBoundingClientRect().bottom;
            const docbot = bodySel.getBoundingClientRect().top;
            rectTop = (rectTopNow * doctop) / 845.093755;
            rectBottom = (rectBottomNow * docbot) / 93.90625;
            if (whichGame === 1) {
              const myOtherInterval = setInterval(() => {
                const rectOffset = letters[randomPlace].offsetTop;
                if (rectOffset < rectTop && rectOffset > rectBottom) {
                  letters[randomPlace].style.color = "green";
                } else if (rectOffset < rectBottom) {
                  letters[randomPlace].style.color = "#fcf003"; // sari
                  /**! setTimeout(()=>{
                            letters[randomPlace].style.color = '#fc0303'
                          },20)
                          setTimeout(()=>{
                            letters[randomPlace].style.color = '#fcf803'
                          },40)
                          setTimeout(()=>{
                            letters[randomPlace].style.color = '#0384fc'
                          },60)
                          setTimeout(()=>{
                            letters[randomPlace].style.color = '#df03fc'
                          },80) **/
                } else {
                  letters[randomPlace].style.color = "#000";
                  clearInterval(myOtherInterval);
                }
              }, 100);
            } else {
              const myInterval = setInterval(() => {
                const rectOffset = letters[randomPlace].offsetTop;
                if (rectOffset < rectTop && rectOffset > rectBottom) {
                  if (!redColor) {
                    letters[randomPlace].style.color = "green";
                  }
                } else if (rectOffset > rectTop) {
                  if (redColor) {
                    letters[randomPlace].style.color = "red";
                  } else {
                    letters[randomPlace].style.color = "white";
                  }
                  clearInterval(myInterval);
                }
              }, 2);
            }
            lateGame(whichGame);
          }
        }, 10);
      }
      play();

      function lateGame(num) {
        if (num === 1) {
          setTimeout(() => {
            heart(life);
          }, yellowMs);
        } else {
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
          }, normalMs);
        }
      }

      function setHeart(alife) {
        const heartPlaceDiv = document.querySelectorAll(".life-place div");
        for (var i = 0; i < maxlife; i++) {
          heartPlaceDiv[i].style.background = "transparent";
        }
        setTimeout(() => {
          for (var i = 0; i < alife; i++) {
            // console.log(heartPlaceDiv[i]);
            heartPlaceDiv[i].style.background = "red";
          }
        }, 10);
      }
      setHeart(life);

      function setWin(wiin) {
        const winPlaceDiv = document.querySelectorAll(".win-place div");
        for (var i = 0; i < maxlife; i++) {
          if (winPlaceDiv[i]) {
            winPlaceDiv[i].style.background = "transparent";
          }
        }
        setTimeout(() => {
          const winPlaceDiv = document.querySelectorAll(".win-place div");
          for (var i = 0; i < wiin; i++) {
            winPlaceDiv[i].style.background = "#35eb0c";
          }
        }, 10);
      }

      function heart(heart) {
        gameStart = false;
        spamGuard = false;
        setHeart(heart);
        if (heart === 0) {
          $("#napim").hide();
          onGame = false
          $.post(
            "http://x-99keygame/keygameStop",
            JSON.stringify({
              result: false,
            })
          );
          location.reload();
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
          $("#napim").hide();
          onGame = false
          $.post(
            "http://x99keygame/keygameStop",
            JSON.stringify({
              result: true,
            })
          );
          location.reload();
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
          const rect = letters[randomPlace].offsetTop;
          // console.log(rect);
          lateWork[whichGame - 1].push(objj2);
          if (gameStart) {
            if (redColor) {
              redColor = false;
              life -= 1;
              heart(life);
            } else {
              oncekiRedMi = false;
              if (keypressing === key) {
                if (rect > rectBottom && rect < rectTop) {
                  if (whichGame === 1) {
                    win = maxwin;
                    won(maxwin);
                    return;
                  }
                  win += 1;
                  won(win);
                  return;
                } else {
                  if (whichGame !== 1) {
                    life -= 1;
                    heart(life);
                  }
                }
              } else {
                if (whichGame !== 1) {
                  life -= 1;
                  heart(life);
                }
              }
            }
          }
        }
      });
    }, progressTimeMs);
  }
}

$(document).ready(() => {
  window.addEventListener("message", function (event) {
    switch (event.data.action) {
      case "startKeyGame":
        // console.log("AAAA++")
        // console.log(event.data);
        // console.log(JSON.stringify(event.data))
        game(
          event.data.harfler[0],
          event.data.harfler[1],
          event.data.harfler[2],
          event.data.cansayisi,
          event.data.maxwin,
          event.data.yellowspeed,
          event.data.normalspeed,
          event.data.progressTime
        );
        break;
    }
  });
});