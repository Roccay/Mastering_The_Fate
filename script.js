//--------------------sound effects--------------------------------
var bgm = new Audio("SE/bgm.mp3");
function playAduio() {
  bgm.play();
}
var attackSE = new Audio("SE/attackSE.mp3");
var GLSE = new Audio("SE/ghostLickSE.mp3");
var healSE = new Audio("./SE/healSE.mp3");
var prohibit = new Audio("SE/prohibited.mp3");
var strSE = new Audio("SE/strengthenSE.mp3");
var fail = new Audio("SE/failSE.mp3");
///-------------------variables----------------------
var dice;
var playerTurn = true;
var enemyTurn = false;
var playerControl = true;
var playerName;

//player's data
const player = {
  HP: 50,
  ATK: 8,
  strAtk: null,
  DEF: 6,
  curDEF: 0,
  currentHP: null,
};
player.currentHP = player.HP;
//enemy's data
const enemy = {
  HP: 70,
  ATK: 12,
  strAtk: null,
  DEF: 5,
  curDEF: 0,
  currentHP: null,
};
enemy.currentHP = enemy.HP;
enemyPreMove();

const pHP = document.getElementById("pHP");
pHP.innerHTML = player.currentHP + " / " + player.HP;
const eHP = document.getElementById("eHP");
eHP.innerHTML = enemy.currentHP + " / " + enemy.HP;
var pDEF = document.getElementById("pDEF");
pDEF.innerHTML = "<span>DEF</span> " + player.DEF;
var pATK = document.getElementById("pATK");
pATK.innerHTML = "<span>ATK</span> " + player.ATK + " ~ " + player.ATK * 1.5;
///--------------on hover effect for buttons--------------
const mainLine = document.getElementById("dialogueBox");

const ATKbut = document.getElementById("attack");
const DEFbut = document.getElementById("defend");

document.addEventListener("mouseover", function (evt) {
  if (evt.target.tagName == "BUTTON") {
    const button = evt.target;
    if (playerControl == true) {
      button.style.backgroundColor = "orange";
    } else {
      button.style.backgroundColor = "grey";
    }
  }
});
document.addEventListener("mouseout", function (evt) {
  if (evt.target.tagName == "BUTTON")
    evt.target.style.backgroundColor = "#1D1D1F";
});

///--------------on hover effect for buttons END--------------

///------------------buttons behaviors------------------------
document.getElementById("initBut").addEventListener("click", function () {
  playerName = document.querySelector("input").value;
  document.getElementById("playerName").innerHTML = playerName;
  document.querySelector(".wrapper").classList.remove("inactive");

  document.querySelectorAll(".init").forEach(function (element) {
    element.classList.add("inactive");
    setTimeout(playAduio, 1000);
  });
});

ATKbut.addEventListener("click", function () {
  if (ATKbranched == true && playerControl == true) {
    isAttack = true;
    isDefend = false;
    rollingAnim();
    ATKbutReset();
    playerControl = false;
  } else if (playerControl == false) {
    prohibit.play();
  } else {
    showingATKBranch();
  }
});
DEFbut.addEventListener("click", function () {
  if (DEFbranched == true && playerControl == true) {
    strengthened = false;
    isAttack = false;
    isDefend = true;
    rollingAnim();
    DEFbutReset();
  } else if (playerControl == false) {
    prohibit.play();
  } else {
    showingDEFBranch();
  }
});

var strengthened = false;
document.addEventListener("click", function (evt) {
  if (playerControl == true) {
    if (evt.target.id == "strength") {
      strSE.play();
      strengthened = true;
      player.strAtk = Math.floor(player.ATK * 2);
      pATK.innerHTML = "ATK " + "<strong>" + player.strAtk + "</strong>";
      setTimeout(EnemyTurn, 1000);
      playerControl = false;
      ATKbutReset();
    }
    if (evt.target.id == "healing") {
      if (player.currentHP < player.HP) {
        player.currentHP =
          player.currentHP + Math.floor(Math.random() * (12 - 5)) + 5;
        pHP.innerHTML = player.currentHP + " / " + player.HP;
        setTimeout(EnemyTurn, 1000);
        playerControl = false;
        DEFbutReset();
        pHP.style.color = "#13E206";
        $("#pHP").animate(
          {
            color: "#fff",
          },
          1700
        );
        healSE.play();
      } else {
        pEl = document.createElement("p");
        pEl.innerHTML = "Your HP is full!";
        mainLine.append(pEl);
      }
    }
  }
});

var ATKbranched = false;
var DEFbranched = false;
var STRbut;
var healBut;

function showingATKBranch() {
  if (ATKbranched == false) {
    document.getElementById("attackPic").style.display = "none";
    ATKbut.style.height = "50%";
    STRbut = document.createElement("button");
    STRbut.setAttribute("id", "strength");
    STRbut.innerHTML = "STRENGTHEN";
    document.querySelector(".botRight1").append(STRbut);
    ATKbranched = true;
  }
  if (DEFbranched == true) {
    DEFbutReset();
  }
}
function showingDEFBranch() {
  if (DEFbranched == false) {
    document.getElementById("defendPic").style.display = "none";
    DEFbut.style.height = "50%";
    healBut = document.createElement("button");
    healBut.setAttribute("id", "healing");
    healBut.innerHTML = "HEAL";

    document.querySelector(".botRight2").append(healBut);
    DEFbranched = true;
  }
  if (ATKbranched == true) {
    ATKbutReset();
  }
}
function ATKbutReset() {
  document.getElementById("attackPic").style.display = "inline";
  STRbut.parentNode.removeChild(STRbut);
  ATKbut.style.height = "100%";
  ATKbranched = false;
}
function DEFbutReset() {
  document.getElementById("defendPic").style.display = "inline";
  healBut.parentNode.removeChild(healBut);
  DEFbut.style.height = "100%";
  DEFbranched = false;
}
///------------------buttons behaviors end------------------------

///-------------dice function----------------
var isAttack = false;
var isDefend = false;
function rollingAnim() {
  if (playerTurn == true && strengthened == false) {
    pATK.innerHTML =
      "<span>ATK</span> " + player.ATK + " ~ " + player.ATK * 1.5;
    playerControl = false;
    for (var i = 0; i <= 5; i++) {
      setTimeout(rollDice, i * 100);
    }
    setTimeout(compareDice, 1000);
  } else if (strengthened == true) {
    dice = 20;

    setTimeout(compareDice, 1000);
  } else {
    prohibit.play();
  }
}

function rollDice() {
  dice = Math.floor(Math.random() * 20) + 1;
  document.getElementById("dice").innerHTML = dice;
}
function compareDice() {
  pEl = document.createElement("p");
  if (playerTurn == true) {
    if (isAttack == true) {
      //attack conditions
      if (dice <= 20 && dice >= 17) {
        attackSE.play();
        pEl.innerHTML = "you gave enemy a <strong>critical hit</strong>!";
        player.strAtk = Math.floor(player.ATK * 2);
        pATK.innerHTML = "ATK " + "<strong>" + player.strAtk + "</strong>";
        setTimeout(healthCount, 1000);
      }
      if (dice < 17 && dice >= 10) {
        attackSE.play();
        pEl.innerHTML = "you successfully <span >attacked</span> the enemy!";
        player.strAtk =
          Math.floor(Math.random() * (player.ATK * 1.5 - player.ATK)) +
          player.ATK;
        setTimeout(healthCount, 1000);
      }
      if (dice < 10 && dice >= 4) {
        fail.play();
        pEl.innerHTML = "you <strong>FAILED<strong> to attack the enemy!";
      }
      if (dice < 4 && dice >= 1) {
        fail.play();
        pEl.innerHTML = "you accidently <strong>hit yourself</strong>, HP-3!";
        player.currentHP = player.currentHP - 3;
        pHP.innerHTML = player.currentHP + " / " + player.HP;
      }
    }
    if (isDefend == true) {
      //defend conditions
      if (dice <= 20 && dice >= 17) {
        pEl.innerHTML = "you gained <strong>extra defence</strong>!";
        player.curDEF = player.DEF * 1.5;
        pDEF.innerHTML = "DEF " + "<strong>" + player.curDEF + "</strong>";
        setTimeout(healthCount, 1000);
      }
      if (dice < 17 && dice >= 10) {
        pEl.innerHTML = "you successfully <span >defended</span>!";
        player.curDEF = player.DEF;
        setTimeout(healthCount, 1000);
      }
      if (dice < 10 && dice >= 1) {
        fail.play();
        pEl.innerHTML = "you <strong>FAILED</strong> to defend!";
      }
    }
    strengthened = false;

    setTimeout(EnemyTurn, 3000);
  }

  if (enemyTurn == true) {
    if (dice <= 20 && dice >= 17) {
      GLSE.play();
      pEl.innerHTML = "And it gave you a <strong>critical hit</strong>";
      enemy.strAtk = Math.floor(enemy.ATK * 1.2);
      setTimeout(healthCount, 1000);
    }
    if (dice < 17 && dice >= 10) {
      GLSE.play();
      pEl.innerHTML = "It attacked you with <em><b>GHOST LICK</b></em>!";
      enemy.strAtk = enemy.ATK;
      setTimeout(healthCount, 1000);
    }
    if (dice < 10 && dice >= 4) {
      fail.play();
      pEl.innerHTML = "but it <strong>FAILED</strong>";
    }
    if (dice < 4 && dice >= 1) {
      fail.play();
      pEl.innerHTML = "but it accidentally attacked itself!";
      enemy.currentHP = enemy.currentHP - 5;
      eHP.innerHTML = enemy.currentHP + " / " + enemy.HP;
    }
    if (enemyTurn == true) {
      setTimeout(PlayerTurn, 3000);
    }
  }
  EndGame();
  mainLine.append(pEl);
}
//-------------dice function END----------------

//-------------Health Bar behavior----------------
function healthCount() {
  if (isAttack) {
    pEl = document.createElement("p");
    if (playerTurn == true) {
      pEl.innerHTML =
        "Enemy's HP: " +
        enemy.currentHP +
        " ==> " +
        (enemy.currentHP - (player.strAtk - enemy.curDEF));
      eHP.style.color = "#aa0000";
      $("#eHP").animate(
        {
          color: "#fff",
        },
        1700
      );
      pEl.style.color = "grey";
      pEl.style.fontFamily = "Kdam Thmor Pro";
      enemy.currentHP = enemy.currentHP - (player.strAtk - enemy.curDEF);
      eHP.innerHTML = enemy.currentHP + " / " + enemy.HP;
      mainLine.append(pEl);
    }
  }
  if (enemyTurn == true) {
    pEl.innerHTML =
      "Your HP: " +
      player.currentHP +
      " ==> " +
      (player.currentHP - (enemy.strAtk - player.curDEF));
    pHP.style.color = "#aa0000";
    $("#pHP").animate(
      {
        color: "#fff",
      },
      1700
    );
    pEl.style.color = "grey";
    pEl.style.fontFamily = "Kdam Thmor Pro";
    player.currentHP = player.currentHP - (enemy.strAtk - player.curDEF);
    pHP.innerHTML = player.currentHP + " / " + player.HP;
    mainLine.append(pEl);
  }

  EndGame();
}
///-------------Health Bar behavior end----------------

///---------------enemy behaviors---------------
var behave;
function enemyPreMove() {
  enemy.curDEF = 0;
  var icon = document.getElementById("eIcon");
  behave = Math.floor(Math.random() * 3) + 1;
  if (behave == 1 || behave == 3) {
    icon.src = "img/ATKicon.png";
  } else if (behave == 2) {
    icon.src = "img/DEFicon.png";
  }
}

function enemyMove() {
  if (enemyTurn == true) {
    if (behave == 1 || behave == 3) {
      //enemy attack
      pEl = document.createElement("p");
      pEl.innerHTML = "Enemy is attacking!!";
      mainLine.append(pEl);
      for (var i = 0; i <= 5; i++) {
        setTimeout(rollDice, i * 100);
      }
      setTimeout(compareDice, 2000);
    } else if (behave == 2) {
      //enemy defence
      enemy.curDEF = enemy.DEF;
      pEl = document.createElement("p");
      pEl.innerHTML = "Enemy is defending!!";
      mainLine.append(pEl);
      setTimeout(PlayerTurn, 2000);
    }

    return;
  }
}
///---------------enemy behaviors---------------

///--------------turn basic function--------------
var turn = document.getElementById("turn");

function EnemyTurn() {
  playerTurn = false;
  if (end == false) {
    turn.innerHTML = "Enemy's Turn";
    enemyTurn = true;

    //css
    pEl = document.createElement("p");
    pEl.style.color = "grey";
    pEl.style.fontFamily = "Kdam Thmor Pro";
    pEl.innerHTML = "Enemy's turn";
    mainLine.append(pEl);

    setTimeout(enemyMove, 2000);
  }
}

function PlayerTurn() {
  player.curDEF = 0;
  if (end == false) {
    pDEF.innerHTML = "<span>DEF</span> " + player.DEF;
    enemyPreMove();
    turn.innerHTML = "Your Turn";
    //css
    pEl = document.createElement("p");
    pEl.style.color = "grey";
    pEl.style.fontFamily = "Kdam Thmor Pro";
    pEl.innerHTML = "Your turn: What are you going to do...?";
    mainLine.append(pEl);

    playerTurn = true;
    enemyTurn = false;
    playerControl = true;
  }
}
var end = false;
function EndGame() {
  if (player.currentHP <= 0) {
    pEl = document.createElement("p");
    pEl.innerHTML = "<strong>You are defeated....</strong>";
    mainLine.append(pEl);
    playerControl = false;
    end = true;
    restart();
  }
  if (enemy.currentHP <= 0) {
    pEl = document.createElement("p");
    pEl.innerHTML = "<strong>You defeated the enemy!!</strong>";
    mainLine.append(pEl);
    playerControl = false;
    end = true;
    restart();
  }
}
function restart() {
  var restart = document.createElement("button");
  restart.setAttribute("onclick", "location.reload()");
  restart.innerHTML = "restart";
  mainLine.append(restart);
}
///--------------turn basic function end--------------
