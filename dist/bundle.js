/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayBall = __webpack_require__(/*! ./play_ball */ "./src/play_ball.js");
const Target = __webpack_require__(/*! ./target */ "./src/target.js");
const Obstacle = __webpack_require__(/*! ./obstacle */ "./src/obstacle.js");
const Spark = __webpack_require__(/*! ./spark */ "./src/spark.js");

class Game {
  constructor(options) {
    this.pb = new PlayBall({pos: [30,30], vel: [0,0], radius: 5, color: "#55aacc"});
    this.target = new Target({pos: [300, 300]});
    this.obstacles = [];
    this.sparks = [];
    this.dist = this.pb.getDistance(this.target);
    this.clicks = 0;

    this.addObstacles();
  }

  addObstacles() {
    const obs1 = new Obstacle(
      { pos: [400, 300], height: 300, width: 20, angle: 0, color: "#F739A3"}
    );
    const obs2 = new Obstacle(
      { pos: [150, 300], height: 300, width: 20, angle: 0, color: "#F739A3" }
    );
    this.obstacles.push(obs1);
    this.obstacles.push(obs2);
  }

  addClick() {
    this.clicks += 1;
  }

  draw(canvasEl, ctx) {
    ctx.clearRect(0,0,canvasEl.width, canvasEl.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvasEl.width, canvasEl.height);

    this.obstacles.forEach(ob => {
      ob.draw(ctx);
    })

    this.sparks.forEach(spark => {
      spark.draw(ctx);
    })

    this.target.draw(ctx);
    this.pb.draw(ctx);
    ctx.textAlign="end";
    ctx.font = '18px Bangers';
    ctx.fillStyle ="#404040";
    ctx.fillText(`distance: ${this.dist}`, 685, 25);
    ctx.fillText(`clicks: ${this.clicks}`, 685, 60);
  }

  checkCollisions(canvasEl,ctx) {
    this.pb.hitBoundary(canvasEl);
    this.obstacles.forEach(ob => {
      this.pb.checkCollisions(ob);
    })
  }

  calcDist() {
    this.dist = this.pb.getDistance(this.target);
  }
}

module.exports = Game;

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx, canvasEl) {
    this.ctx = ctx;
    this.game = game;
    this.canvasEl = canvasEl;
    this.playGame = this.playGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  start() {
    this.playGame();
  }

  handleClick(e) {
    this.game.addClick();
    let rect = e.target.getBoundingClientRect();
    this.game.pb.determineMovement(e.clientX - rect.left, e.clientY - rect.top);
    this.canvasEl.removeEventListener('click', this.handleClick);
  }

  playGame() {
    this.game.checkCollisions(this.canvasEl, this.ctx);
    this.game.calcDist();
    this.game.draw(this.canvasEl, this.ctx);

    if (this.game.pb.move()){
      this.canvasEl.addEventListener('click', this.handleClick);
    };

    requestAnimationFrame(this.playGame);
  }
}

module.exports = GameView;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");

document.addEventListener("DOMContentLoaded", () => {
  let start = document.getElementById("start-button");
  let about = document.getElementById("about-button");
  start.addEventListener('click', startGame);
  about.addEventListener('click', showAbout);
})

const startGame = () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];

  let startMenu = document.getElementById("start-menu");
  startMenu.style.display = "none";
  canvasEl.style.display = "inline";
  canvasEl.height = 700;
  canvasEl.width = 700;
  let ctx = canvasEl.getContext("2d");

  let game = new Game();
  new GameView(game, ctx, canvasEl).start();
}

const showAbout = () => {
  let startMenu = document.getElementById("start-menu");
  let aboutMenu = document.getElementById("about-menu");
  let aboutButton = document.getElementById("close-button");
  startMenu.style.display = "none";
  aboutMenu.style.display = "flex";
  aboutButton.addEventListener('click', hideAbout);
}

const hideAbout = () => {
  let aboutMenu = document.getElementById("about-menu");
  let startMenu = document.getElementById("start-menu");
  let aboutButton = document.getElementById("close-button");
  aboutMenu.style.display = "none";
  startMenu.style.display = "flex";
  aboutButton.removeEventListener("click", hideAbout);
}

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.prevPos = options.pos;
    this.friction = .93
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  move() {
    this.prevPos = this.pos;
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.vel = [this.vel[0]*this.friction, this.vel[1]*this.friction];
    if (Math.sqrt(Math.pow(this.vel[0],2) * Math.pow(this.vel[1], 2)) < .1) {
      this.vel[0] = 0;
      this.vel[1] = 0;
    }
    return this.vel[0] === 0 && this.vel[1] === 0;
  }

  hitBoundary(canvasEl) {
    if (this.pos[0] + this.vel[0] > canvasEl.width || this.pos[0] + this.vel[0] < 0) {
      this.vel[0] = -this.vel[0];
      return [];
    }
    if (this.pos[1] + this.vel[1] > canvasEl.width || this.pos[1] + this.vel[1] < 0) {
      this.vel[1] = -this.vel[1];
      return [];
    }
  }

  collisionLeft(ob) {

    let slope = this.vel[1] / this.vel[0];

    if (ob.angle === 0) {
      let wallDim = ob.pos[0] - ob.width / 2;
      let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);
      let yLowerBound = ob.pos[1] - ob.height / 2;
      let yUpperBound = ob.pos[1] + ob.height / 2;
      if (this.prevPos[0] < wallDim) {
        if (this.pos[0] > wallDim) {
          if (intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
            this.pos[0] = wallDim;
            this.pos[1] = intersectionPT;
            this.vel[0] = -this.vel[0]
            return true;
          }
        }
      }
      return false;
    } else {
      let wallSlope = (ob.ytopLeftPt - ob.ybottomLeftPt) / (ob.xtopLeftPt - ob.xbottomLeftPt);
      let intersectionX = ((slope * this.pos[0] - this.pos[1]) - (wallSlope * ob.xbottomLeftPt - ob.ybottomLeftPt)) / (slope - wallSlope);
      let intersectionY = slope * intersectionX - (slope * this.pos[0] - this.pos[1]);
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;
      let yPrevDiff = this.prevPos[1] - intersectionY;
      let yCurrDiff = this.pos[1] - intersectionY;

      // if (intersectionY > ob.ytopLeftPt && intersectionY < ob.ybottomLeftPt && xPrevDiff*xCurrDiff <= 0 && yPrevDiff*yCurrDiff <= 0) {
      if (intersectionY > ob.ytopLeftPt && intersectionY < ob.ybottomLeftPt && xPrevDiff * xCurrDiff <= 0 && yPrevDiff * yCurrDiff <= 0) {
        debugger;
        let xAngle = 180 - 2 * ob.angle;
        let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
        let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

        let yAngle = 90 - 2 * ob.angle;
        let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
        let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

        this.vel[0] = xComp1 + yComp1;
        this.vel[1] = xComp2 + yComp2;
        this.pos[0] = intersectionX + this.vel[0] * 0.01;
        this.pos[1] = intersectionY + this.vel[1] * 0.01;
        return true;

      }
      return false;
    }
  }

  collisionRight(ob) {

    let slope = this.vel[1] / this.vel[0];

    if (ob.angle === 0) {
      let wallDim = ob.pos[0] + ob.width / 2;
      let intersectionPT = this.prevPos[1] + slope * (wallDim - this.prevPos[0]);
      let yLowerBound = ob.pos[1] - ob.height / 2;
      let yUpperBound = ob.pos[1] + ob.height / 2;
      if (this.prevPos[0] > wallDim) {
        if (this.pos[0] < wallDim) {
          if (intersectionPT > yLowerBound && intersectionPT < yUpperBound) {
            this.pos[0] = wallDim;
            this.pos[1] = intersectionPT;
            this.vel[0] = -this.vel[0]
            return true;
          }
        }
      }
      return false;
    } else {
      let wallSlope = (ob.ytopRightPt - ob.ybottomRightPt) / (ob.xtopRightPt - ob.xbottomRightPt);
      let intersectionX = ((slope * this.pos[0] - this.pos[1]) - (wallSlope * ob.xbottomRightPt - ob.ybottomRightPt)) / (slope - wallSlope);
      let intersectionY = slope * intersectionX - (slope * this.pos[0] - this.pos[1]);
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;


      // if (intersectionY > ob.ytopRightPt && intersectionY < ob.ybottomRightPt && this.prevPos[0] > intersectionX && this.pos[0] < intersectionX) {
      if (intersectionY > ob.ytopRightPt && intersectionY < ob.ybottomRightPt && xPrevDiff * xCurrDiff <= 0) {
        let yPrevDiff = this.prevPos[1] - intersectionY;
        let yCurrDiff = this.pos[1] - intersectionY;
        if (yPrevDiff * yCurrDiff <= 0) {
          debugger;
          let xAngle = 180 - 2 * ob.angle;
          let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
          let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

          let yAngle = 90 - 2 * ob.angle;
          let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
          let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

          this.vel[0] = xComp1 + yComp1;
          this.vel[1] = xComp2 + yComp2;
          this.pos[0] = intersectionX + this.vel[0] * 0.01;
          this.pos[1] = intersectionY + this.vel[1] * 0.01;
          return true;
        }
      }
      return false;
    }
  }

  collisionTop(ob) {

    if (ob.angle === 0) {
      let invSlope = this.vel[0] / this.vel[1];
      let wallDim = ob.pos[1] - ob.height / 2;
      let intersectionPT = this.prevPos[0] + invSlope * (wallDim - this.prevPos[1]);
      let xLowerBound = ob.pos[0] - ob.width / 2;
      let xUpperBound = ob.pos[0] + ob.width / 2;
      if (this.prevPos[1] < wallDim) {
        if (this.pos[1] > wallDim) {
          if (intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
            this.pos[0] = intersectionPT;
            this.pos[1] = wallDim;
            this.vel[1] = -this.vel[1]
            return true;
          }
        }
      }
      return false;
    } else {
      let slope = this.vel[1] / this.vel[0]
      let wallSlope = (ob.ytopRightPt - ob.ytopLeftPt) / (ob.xtopRightPt - ob.xtopLeftPt);
      let intersectionX = ((slope * this.pos[0] - this.pos[1]) - (wallSlope * ob.xtopLeftPt - ob.ytopLeftPt)) / (slope - wallSlope);
      let intersectionY = slope * intersectionX - (slope * this.pos[0] - this.pos[1]);
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;

      if (intersectionY > ob.ytopRightPt && intersectionY < ob.ytopLeftPt && xPrevDiff * xCurrDiff <= 0) {
        let yPrevDiff = this.prevPos[1] - intersectionY;
        let yCurrDiff = this.pos[1] - intersectionY;
        if (yPrevDiff * yCurrDiff <= 0) {
          let xAngle = -2 * ob.angle;
          let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
          let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

          let yAngle = 270 - 2 * ob.angle;
          let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
          let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

          this.vel[0] = xComp1 + yComp1;
          this.vel[1] = xComp2 + yComp2;
          this.pos[0] = intersectionX + this.vel[0] * 0.01;
          this.pos[1] = intersectionY + this.vel[1] * 0.01;
          return true;
        }
      }
      return false;
    }
  }

  collisionBot(ob) {

    if (ob.angle === 0) {
      let invSlope = this.vel[0] / this.vel[1];
      let wallDim = ob.pos[1] + ob.height / 2;
      let intersectionPT = this.prevPos[0] + invSlope * (wallDim - this.prevPos[1]);
      let xLowerBound = ob.pos[0] - ob.width / 2;
      let xUpperBound = ob.pos[0] + ob.width / 2;
      if (this.prevPos[1] > wallDim) {
        if (this.pos[1] < wallDim) {
          if (intersectionPT > xLowerBound && intersectionPT < xUpperBound) {
            this.pos[0] = intersectionPT;
            this.pos[1] = wallDim;
            this.vel[1] = -this.vel[1]
            return true;
          }
        }
      }
      return false;
    } else {
      let slope = this.vel[1] / this.vel[0]
      let wallSlope = (ob.ybottomRightPt - ob.ybottomLeftPt) / (ob.xbottomRightPt - ob.xbottomLeftPt);
      let intersectionX = ((slope * this.pos[0] - this.pos[1]) - (wallSlope * ob.xbottomLeftPt - ob.ybottomLeftPt)) / (slope - wallSlope);
      let intersectionY = slope * intersectionX - (slope * this.pos[0] - this.pos[1]);
      let xPrevDiff = this.prevPos[0] - intersectionX;
      let xCurrDiff = this.pos[0] - intersectionX;

      if (intersectionY > ob.ybottomRightPt && intersectionY < ob.ybottomLeftPt && xPrevDiff * xCurrDiff <= 0) {
        let yPrevDiff = this.prevPos[1] - intersectionY;
        let yCurrDiff = this.pos[1] - intersectionY;
        if (yPrevDiff * yCurrDiff <= 0) {
          let xAngle = -2 * ob.angle;
          let xComp1 = this.vel[0] * Math.cos(this.getRadians(xAngle));
          let xComp2 = this.vel[0] * Math.sin(this.getRadians(xAngle));

          let yAngle = 270 - 2 * ob.angle;
          let yComp1 = this.vel[1] * Math.cos(this.getRadians(yAngle));
          let yComp2 = this.vel[1] * Math.sin(this.getRadians(yAngle));

          this.vel[0] = xComp1 + yComp1;
          this.vel[1] = xComp2 + yComp2;
          this.pos[0] = intersectionX + this.vel[0] * 0.01;
          this.pos[1] = intersectionY + this.vel[1] * 0.01;
          return true;
        }
      }
      return false;
    }
  }

  checkCollisions(obstacle) {
    if (this.collisionLeft(obstacle) || this.collisionRight(obstacle) || this.collisionTop(obstacle) || this.collisionBot(obstacle)) {
      // this.makeBounceSound();
      return [];
    }
    return false;
  }

  // makeBounceSound() {
  //   let audio = document.getElementById("audio-player")
  //   audio.src = "./assets/sound/bounce.wav";
  //   audio.play();
  // }

  getRadians(angle) {
    return angle * Math.PI / 180
  }
}

module.exports = MovingObject;

/***/ }),

/***/ "./src/obstacle.js":
/*!*************************!*\
  !*** ./src/obstacle.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Obstacle {
  constructor(options) {
    this.pos = options.pos;
    this.height = options.height;
    this.width = options.width;
    this.angle = options.angle;
    this.color = options.color;
    this.xmidLeftPt = this.pos[0] - this.width / 2 * Math.cos(this.getRadians(this.angle));
    this.ymidLeftPt = this.pos[1] + this.width / 2 * Math.sin(this.getRadians(this.angle));
    this.xbottomLeftPt = this.xmidLeftPt + this.height / 2 * Math.sin(this.getRadians(this.angle));
    this.ybottomLeftPt = this.ymidLeftPt + this.height / 2 * Math.cos(this.getRadians(this.angle));
    this.xtopLeftPt = this.xmidLeftPt - this.height / 2 * Math.sin(this.getRadians(this.angle));
    this.ytopLeftPt = this.ymidLeftPt - this.height / 2 * Math.cos(this.getRadians(this.angle));
    this.xmidRightPt = this.pos[0] + this.width / 2 * Math.cos(this.getRadians(this.angle));
    this.ymidRightPt = this.pos[1] - this.width / 2 * Math.sin(this.getRadians(this.angle));
    this.xbottomRightPt = this.xmidRightPt + this.height / 2 * Math.sin(this.getRadians(this.angle));
    this.ybottomRightPt = this.ymidRightPt + this.height / 2 * Math.cos(this.getRadians(this.angle));
    this.xtopRightPt = this.xmidRightPt - this.height / 2 * Math.sin(this.getRadians(this.angle));
    this.ytopRightPt = this.ymidRightPt - this.height / 2 * Math.cos(this.getRadians(this.angle));
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-this.getRadians());
    ctx.translate(-this.pos[0], -this.pos[1]);
    ctx.fillRect(this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.getRadians());
    ctx.translate(-this.pos[0], -this.pos[1]);
  }

  getRadians() {
    return this.angle * Math.PI/180
  }
} 

module.exports = Obstacle;

/***/ }),

/***/ "./src/play_ball.js":
/*!**************************!*\
  !*** ./src/play_ball.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");

class PlayBall extends MovingObject {
  constructor(options) {
    super(options)
    this.determineMovement = this.determineMovement.bind(this);
    this.minClickDist = 0;
  } 

  determineMovement(xClick, yClick) {
    let xDiff = this.pos[0] - xClick;
    let yDiff = this.pos[1] - yClick;

    if (Math.abs(xDiff) < this.minClickDist) {
      xDiff = xDiff / Math.abs(xDiff)*this.minClickDist;
    }

    if (Math.abs(yDiff) < this.minClickDist) {
      yDiff = yDiff / Math.abs(yDiff) * this.minClickDist;
    }

    let mag = 1/(Math.pow(xDiff,2) + Math.pow(yDiff,2));
    let unitDir = [xDiff, yDiff];
    this.vel[0] = unitDir[0] * mag * 850;
    this.vel[1] = unitDir[1] * mag * 850;
  }

  getDistance(target) {
    let xDiff = Math.abs(this.pos[0] - target.pos[0]);
    let yDiff = Math.abs(this.pos[1] - target.pos[1]);
    return Math.sqrt(xDiff*xDiff + yDiff*yDiff).toFixed(3);
  }
}

module.exports = PlayBall;

/***/ }),

/***/ "./src/spark.js":
/*!**********************!*\
  !*** ./src/spark.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");

class Spark extends MovingObject {
  constructor(options) {
    this.colorSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    this
    setInterval(this.changeColor, 500);
  }

  changeColor() {
    let colorStr = "#";

    while (colorStr.length < 6) {
      colorStr += this.colorSet[Math.floor(Math.random() * this.colorSet.length)];
    }

    this.color = colorStr;
  }
}

module.exports = Spark;

/***/ }),

/***/ "./src/target.js":
/*!***********************!*\
  !*** ./src/target.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Target {
  constructor(options) {
    this.pos = options.pos;
    this.vel = [0, 0];
    this.radius = 8;
    this.color = "#ffffff";
    this.draw = this.draw.bind(this);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
}

module.exports = Target;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5X2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwYXJrLmpzIiwid2VicGFjazovLy8uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3RDLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQSw0QkFBNEIsc0RBQXNEO0FBQ2xGLDhCQUE4QixnQkFBZ0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsVUFBVTtBQUN4Qyw0QkFBNEIsWUFBWTtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQjs7Ozs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDakNBLGFBQWEsbUJBQU8sQ0FBQyw2QkFBUTtBQUM3QixpQkFBaUIsbUJBQU8sQ0FBQyx1Q0FBYTs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7Ozs7O0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUNyQ0EscUJBQXFCLG1CQUFPLENBQUMsK0NBQWlCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUNsQ0EscUJBQXFCLG1CQUFPLENBQUMsK0NBQWlCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCOzs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgUGxheUJhbGwgPSByZXF1aXJlKFwiLi9wbGF5X2JhbGxcIik7XG5jb25zdCBUYXJnZXQgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XG5jb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoXCIuL29ic3RhY2xlXCIpO1xuY29uc3QgU3BhcmsgPSByZXF1aXJlKFwiLi9zcGFya1wiKTtcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnBiID0gbmV3IFBsYXlCYWxsKHtwb3M6IFszMCwzMF0sIHZlbDogWzAsMF0sIHJhZGl1czogNSwgY29sb3I6IFwiIzU1YWFjY1wifSk7XG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVGFyZ2V0KHtwb3M6IFszMDAsIDMwMF19KTtcbiAgICB0aGlzLm9ic3RhY2xlcyA9IFtdO1xuICAgIHRoaXMuc3BhcmtzID0gW107XG4gICAgdGhpcy5kaXN0ID0gdGhpcy5wYi5nZXREaXN0YW5jZSh0aGlzLnRhcmdldCk7XG4gICAgdGhpcy5jbGlja3MgPSAwO1xuXG4gICAgdGhpcy5hZGRPYnN0YWNsZXMoKTtcbiAgfVxuXG4gIGFkZE9ic3RhY2xlcygpIHtcbiAgICBjb25zdCBvYnMxID0gbmV3IE9ic3RhY2xlKFxuICAgICAgeyBwb3M6IFs0MDAsIDMwMF0sIGhlaWdodDogMzAwLCB3aWR0aDogMjAsIGFuZ2xlOiAwLCBjb2xvcjogXCIjRjczOUEzXCJ9XG4gICAgKTtcbiAgICBjb25zdCBvYnMyID0gbmV3IE9ic3RhY2xlKFxuICAgICAgeyBwb3M6IFsxNTAsIDMwMF0sIGhlaWdodDogMzAwLCB3aWR0aDogMjAsIGFuZ2xlOiAwLCBjb2xvcjogXCIjRjczOUEzXCIgfVxuICAgICk7XG4gICAgdGhpcy5vYnN0YWNsZXMucHVzaChvYnMxKTtcbiAgICB0aGlzLm9ic3RhY2xlcy5wdXNoKG9iczIpO1xuICB9XG5cbiAgYWRkQ2xpY2soKSB7XG4gICAgdGhpcy5jbGlja3MgKz0gMTtcbiAgfVxuXG4gIGRyYXcoY2FudmFzRWwsIGN0eCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwwLGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwwLGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xuXG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XG4gICAgICBvYi5kcmF3KGN0eCk7XG4gICAgfSlcblxuICAgIHRoaXMuc3BhcmtzLmZvckVhY2goc3BhcmsgPT4ge1xuICAgICAgc3BhcmsuZHJhdyhjdHgpO1xuICAgIH0pXG5cbiAgICB0aGlzLnRhcmdldC5kcmF3KGN0eCk7XG4gICAgdGhpcy5wYi5kcmF3KGN0eCk7XG4gICAgY3R4LnRleHRBbGlnbj1cImVuZFwiO1xuICAgIGN0eC5mb250ID0gJzE4cHggQmFuZ2Vycyc7XG4gICAgY3R4LmZpbGxTdHlsZSA9XCIjNDA0MDQwXCI7XG4gICAgY3R4LmZpbGxUZXh0KGBkaXN0YW5jZTogJHt0aGlzLmRpc3R9YCwgNjg1LCAyNSk7XG4gICAgY3R4LmZpbGxUZXh0KGBjbGlja3M6ICR7dGhpcy5jbGlja3N9YCwgNjg1LCA2MCk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbnMoY2FudmFzRWwsY3R4KSB7XG4gICAgdGhpcy5wYi5oaXRCb3VuZGFyeShjYW52YXNFbCk7XG4gICAgdGhpcy5vYnN0YWNsZXMuZm9yRWFjaChvYiA9PiB7XG4gICAgICB0aGlzLnBiLmNoZWNrQ29sbGlzaW9ucyhvYik7XG4gICAgfSlcbiAgfVxuXG4gIGNhbGNEaXN0KCkge1xuICAgIHRoaXMuZGlzdCA9IHRoaXMucGIuZ2V0RGlzdGFuY2UodGhpcy50YXJnZXQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjbGFzcyBHYW1lVmlldyB7XG4gIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCwgY2FudmFzRWwpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMuY2FudmFzRWwgPSBjYW52YXNFbDtcbiAgICB0aGlzLnBsYXlHYW1lID0gdGhpcy5wbGF5R2FtZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnBsYXlHYW1lKCk7XG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdGhpcy5nYW1lLmFkZENsaWNrKCk7XG4gICAgbGV0IHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLmdhbWUucGIuZGV0ZXJtaW5lTW92ZW1lbnQoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XG4gICAgdGhpcy5jYW52YXNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICB9XG5cbiAgcGxheUdhbWUoKSB7XG4gICAgdGhpcy5nYW1lLmNoZWNrQ29sbGlzaW9ucyh0aGlzLmNhbnZhc0VsLCB0aGlzLmN0eCk7XG4gICAgdGhpcy5nYW1lLmNhbGNEaXN0KCk7XG4gICAgdGhpcy5nYW1lLmRyYXcodGhpcy5jYW52YXNFbCwgdGhpcy5jdHgpO1xuXG4gICAgaWYgKHRoaXMuZ2FtZS5wYi5tb3ZlKCkpe1xuICAgICAgdGhpcy5jYW52YXNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIH07XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5wbGF5R2FtZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldzsiLCJjb25zdCBHYW1lID0gcmVxdWlyZShcIi4vZ2FtZVwiKTtcbmNvbnN0IEdhbWVWaWV3ID0gcmVxdWlyZShcIi4vZ2FtZV92aWV3XCIpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGxldCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnV0dG9uXCIpO1xuICBsZXQgYWJvdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0LWJ1dHRvblwiKTtcbiAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuICBhYm91dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dBYm91dCk7XG59KVxuXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpWzBdO1xuXG4gIGxldCBzdGFydE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LW1lbnVcIik7XG4gIHN0YXJ0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGNhbnZhc0VsLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICBjYW52YXNFbC5oZWlnaHQgPSA3MDA7XG4gIGNhbnZhc0VsLndpZHRoID0gNzAwO1xuICBsZXQgY3R4ID0gY2FudmFzRWwuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgbmV3IEdhbWVWaWV3KGdhbWUsIGN0eCwgY2FudmFzRWwpLnN0YXJ0KCk7XG59XG5cbmNvbnN0IHNob3dBYm91dCA9ICgpID0+IHtcbiAgbGV0IHN0YXJ0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtbWVudVwiKTtcbiAgbGV0IGFib3V0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXQtbWVudVwiKTtcbiAgbGV0IGFib3V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1idXR0b25cIik7XG4gIHN0YXJ0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGFib3V0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGFib3V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZUFib3V0KTtcbn1cblxuY29uc3QgaGlkZUFib3V0ID0gKCkgPT4ge1xuICBsZXQgYWJvdXRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dC1tZW51XCIpO1xuICBsZXQgc3RhcnRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1tZW51XCIpO1xuICBsZXQgYWJvdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWJ1dHRvblwiKTtcbiAgYWJvdXRNZW51LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgc3RhcnRNZW51LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgYWJvdXRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVBYm91dCk7XG59IiwiY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgdGhpcy52ZWwgPSBvcHRpb25zLnZlbDtcbiAgICB0aGlzLnJhZGl1cyA9IG9wdGlvbnMucmFkaXVzO1xuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xuICAgIHRoaXMubW92ZSA9IHRoaXMubW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucHJldlBvcyA9IG9wdGlvbnMucG9zO1xuICAgIHRoaXMuZnJpY3Rpb24gPSAuOTNcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoXG4gICAgICB0aGlzLnBvc1swXSxcbiAgICAgIHRoaXMucG9zWzFdLFxuICAgICAgdGhpcy5yYWRpdXMsXG4gICAgICAwLFxuICAgICAgMiAqIE1hdGguUEksXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICBjdHguZmlsbCgpO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICB0aGlzLnByZXZQb3MgPSB0aGlzLnBvcztcbiAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdLCB0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdXTtcbiAgICB0aGlzLnZlbCA9IFt0aGlzLnZlbFswXSp0aGlzLmZyaWN0aW9uLCB0aGlzLnZlbFsxXSp0aGlzLmZyaWN0aW9uXTtcbiAgICBpZiAoTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMudmVsWzBdLDIpICogTWF0aC5wb3codGhpcy52ZWxbMV0sIDIpKSA8IC4xKSB7XG4gICAgICB0aGlzLnZlbFswXSA9IDA7XG4gICAgICB0aGlzLnZlbFsxXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZlbFswXSA9PT0gMCAmJiB0aGlzLnZlbFsxXSA9PT0gMDtcbiAgfVxuXG4gIGhpdEJvdW5kYXJ5KGNhbnZhc0VsKSB7XG4gICAgaWYgKHRoaXMucG9zWzBdICsgdGhpcy52ZWxbMF0gPiBjYW52YXNFbC53aWR0aCB8fCB0aGlzLnBvc1swXSArIHRoaXMudmVsWzBdIDwgMCkge1xuICAgICAgdGhpcy52ZWxbMF0gPSAtdGhpcy52ZWxbMF07XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmICh0aGlzLnBvc1sxXSArIHRoaXMudmVsWzFdID4gY2FudmFzRWwud2lkdGggfHwgdGhpcy5wb3NbMV0gKyB0aGlzLnZlbFsxXSA8IDApIHtcbiAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxpc2lvbkxlZnQob2IpIHtcblxuICAgIGxldCBzbG9wZSA9IHRoaXMudmVsWzFdIC8gdGhpcy52ZWxbMF07XG5cbiAgICBpZiAob2IuYW5nbGUgPT09IDApIHtcbiAgICAgIGxldCB3YWxsRGltID0gb2IucG9zWzBdIC0gb2Iud2lkdGggLyAyO1xuICAgICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzFdICsgc2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1swXSk7XG4gICAgICBsZXQgeUxvd2VyQm91bmQgPSBvYi5wb3NbMV0gLSBvYi5oZWlnaHQgLyAyO1xuICAgICAgbGV0IHlVcHBlckJvdW5kID0gb2IucG9zWzFdICsgb2IuaGVpZ2h0IC8gMjtcbiAgICAgIGlmICh0aGlzLnByZXZQb3NbMF0gPCB3YWxsRGltKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc1swXSA+IHdhbGxEaW0pIHtcbiAgICAgICAgICBpZiAoaW50ZXJzZWN0aW9uUFQgPiB5TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHlVcHBlckJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnBvc1swXSA9IHdhbGxEaW07XG4gICAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblBUO1xuICAgICAgICAgICAgdGhpcy52ZWxbMF0gPSAtdGhpcy52ZWxbMF1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgd2FsbFNsb3BlID0gKG9iLnl0b3BMZWZ0UHQgLSBvYi55Ym90dG9tTGVmdFB0KSAvIChvYi54dG9wTGVmdFB0IC0gb2IueGJvdHRvbUxlZnRQdCk7XG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWCA9ICgoc2xvcGUgKiB0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKSAtICh3YWxsU2xvcGUgKiBvYi54Ym90dG9tTGVmdFB0IC0gb2IueWJvdHRvbUxlZnRQdCkpIC8gKHNsb3BlIC0gd2FsbFNsb3BlKTtcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25ZID0gc2xvcGUgKiBpbnRlcnNlY3Rpb25YIC0gKHNsb3BlICogdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSk7XG4gICAgICBsZXQgeFByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcbiAgICAgIGxldCB4Q3VyckRpZmYgPSB0aGlzLnBvc1swXSAtIGludGVyc2VjdGlvblg7XG4gICAgICBsZXQgeVByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcbiAgICAgIGxldCB5Q3VyckRpZmYgPSB0aGlzLnBvc1sxXSAtIGludGVyc2VjdGlvblk7XG5cbiAgICAgIC8vIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueXRvcExlZnRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbUxlZnRQdCAmJiB4UHJldkRpZmYqeEN1cnJEaWZmIDw9IDAgJiYgeVByZXZEaWZmKnlDdXJyRGlmZiA8PSAwKSB7XG4gICAgICBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnl0b3BMZWZ0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnlib3R0b21MZWZ0UHQgJiYgeFByZXZEaWZmICogeEN1cnJEaWZmIDw9IDAgJiYgeVByZXZEaWZmICogeUN1cnJEaWZmIDw9IDApIHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIGxldCB4QW5nbGUgPSAxODAgLSAyICogb2IuYW5nbGU7XG4gICAgICAgIGxldCB4Q29tcDEgPSB0aGlzLnZlbFswXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcbiAgICAgICAgbGV0IHhDb21wMiA9IHRoaXMudmVsWzBdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xuXG4gICAgICAgIGxldCB5QW5nbGUgPSA5MCAtIDIgKiBvYi5hbmdsZTtcbiAgICAgICAgbGV0IHlDb21wMSA9IHRoaXMudmVsWzFdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xuICAgICAgICBsZXQgeUNvbXAyID0gdGhpcy52ZWxbMV0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XG5cbiAgICAgICAgdGhpcy52ZWxbMF0gPSB4Q29tcDEgKyB5Q29tcDE7XG4gICAgICAgIHRoaXMudmVsWzFdID0geENvbXAyICsgeUNvbXAyO1xuICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblggKyB0aGlzLnZlbFswXSAqIDAuMDE7XG4gICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uWSArIHRoaXMudmVsWzFdICogMC4wMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb2xsaXNpb25SaWdodChvYikge1xuXG4gICAgbGV0IHNsb3BlID0gdGhpcy52ZWxbMV0gLyB0aGlzLnZlbFswXTtcblxuICAgIGlmIChvYi5hbmdsZSA9PT0gMCkge1xuICAgICAgbGV0IHdhbGxEaW0gPSBvYi5wb3NbMF0gKyBvYi53aWR0aCAvIDI7XG4gICAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMV0gKyBzbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzBdKTtcbiAgICAgIGxldCB5TG93ZXJCb3VuZCA9IG9iLnBvc1sxXSAtIG9iLmhlaWdodCAvIDI7XG4gICAgICBsZXQgeVVwcGVyQm91bmQgPSBvYi5wb3NbMV0gKyBvYi5oZWlnaHQgLyAyO1xuICAgICAgaWYgKHRoaXMucHJldlBvc1swXSA+IHdhbGxEaW0pIHtcbiAgICAgICAgaWYgKHRoaXMucG9zWzBdIDwgd2FsbERpbSkge1xuICAgICAgICAgIGlmIChpbnRlcnNlY3Rpb25QVCA+IHlMb3dlckJvdW5kICYmIGludGVyc2VjdGlvblBUIDwgeVVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zWzBdID0gd2FsbERpbTtcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uUFQ7XG4gICAgICAgICAgICB0aGlzLnZlbFswXSA9IC10aGlzLnZlbFswXVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB3YWxsU2xvcGUgPSAob2IueXRvcFJpZ2h0UHQgLSBvYi55Ym90dG9tUmlnaHRQdCkgLyAob2IueHRvcFJpZ2h0UHQgLSBvYi54Ym90dG9tUmlnaHRQdCk7XG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWCA9ICgoc2xvcGUgKiB0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKSAtICh3YWxsU2xvcGUgKiBvYi54Ym90dG9tUmlnaHRQdCAtIG9iLnlib3R0b21SaWdodFB0KSkgLyAoc2xvcGUgLSB3YWxsU2xvcGUpO1xuICAgICAgbGV0IGludGVyc2VjdGlvblkgPSBzbG9wZSAqIGludGVyc2VjdGlvblggLSAoc2xvcGUgKiB0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKTtcbiAgICAgIGxldCB4UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xuICAgICAgbGV0IHhDdXJyRGlmZiA9IHRoaXMucG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcblxuXG4gICAgICAvLyBpZiAoaW50ZXJzZWN0aW9uWSA+IG9iLnl0b3BSaWdodFB0ICYmIGludGVyc2VjdGlvblkgPCBvYi55Ym90dG9tUmlnaHRQdCAmJiB0aGlzLnByZXZQb3NbMF0gPiBpbnRlcnNlY3Rpb25YICYmIHRoaXMucG9zWzBdIDwgaW50ZXJzZWN0aW9uWCkge1xuICAgICAgaWYgKGludGVyc2VjdGlvblkgPiBvYi55dG9wUmlnaHRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbVJpZ2h0UHQgJiYgeFByZXZEaWZmICogeEN1cnJEaWZmIDw9IDApIHtcbiAgICAgICAgbGV0IHlQcmV2RGlmZiA9IHRoaXMucHJldlBvc1sxXSAtIGludGVyc2VjdGlvblk7XG4gICAgICAgIGxldCB5Q3VyckRpZmYgPSB0aGlzLnBvc1sxXSAtIGludGVyc2VjdGlvblk7XG4gICAgICAgIGlmICh5UHJldkRpZmYgKiB5Q3VyckRpZmYgPD0gMCkge1xuICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgIGxldCB4QW5nbGUgPSAxODAgLSAyICogb2IuYW5nbGU7XG4gICAgICAgICAgbGV0IHhDb21wMSA9IHRoaXMudmVsWzBdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xuICAgICAgICAgIGxldCB4Q29tcDIgPSB0aGlzLnZlbFswXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcblxuICAgICAgICAgIGxldCB5QW5nbGUgPSA5MCAtIDIgKiBvYi5hbmdsZTtcbiAgICAgICAgICBsZXQgeUNvbXAxID0gdGhpcy52ZWxbMV0gKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XG4gICAgICAgICAgbGV0IHlDb21wMiA9IHRoaXMudmVsWzFdICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xuXG4gICAgICAgICAgdGhpcy52ZWxbMF0gPSB4Q29tcDEgKyB5Q29tcDE7XG4gICAgICAgICAgdGhpcy52ZWxbMV0gPSB4Q29tcDIgKyB5Q29tcDI7XG4gICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25YICsgdGhpcy52ZWxbMF0gKiAwLjAxO1xuICAgICAgICAgIHRoaXMucG9zWzFdID0gaW50ZXJzZWN0aW9uWSArIHRoaXMudmVsWzFdICogMC4wMTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxpc2lvblRvcChvYikge1xuXG4gICAgaWYgKG9iLmFuZ2xlID09PSAwKSB7XG4gICAgICBsZXQgaW52U2xvcGUgPSB0aGlzLnZlbFswXSAvIHRoaXMudmVsWzFdO1xuICAgICAgbGV0IHdhbGxEaW0gPSBvYi5wb3NbMV0gLSBvYi5oZWlnaHQgLyAyO1xuICAgICAgbGV0IGludGVyc2VjdGlvblBUID0gdGhpcy5wcmV2UG9zWzBdICsgaW52U2xvcGUgKiAod2FsbERpbSAtIHRoaXMucHJldlBvc1sxXSk7XG4gICAgICBsZXQgeExvd2VyQm91bmQgPSBvYi5wb3NbMF0gLSBvYi53aWR0aCAvIDI7XG4gICAgICBsZXQgeFVwcGVyQm91bmQgPSBvYi5wb3NbMF0gKyBvYi53aWR0aCAvIDI7XG4gICAgICBpZiAodGhpcy5wcmV2UG9zWzFdIDwgd2FsbERpbSkge1xuICAgICAgICBpZiAodGhpcy5wb3NbMV0gPiB3YWxsRGltKSB7XG4gICAgICAgICAgaWYgKGludGVyc2VjdGlvblBUID4geExvd2VyQm91bmQgJiYgaW50ZXJzZWN0aW9uUFQgPCB4VXBwZXJCb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NbMF0gPSBpbnRlcnNlY3Rpb25QVDtcbiAgICAgICAgICAgIHRoaXMucG9zWzFdID0gd2FsbERpbTtcbiAgICAgICAgICAgIHRoaXMudmVsWzFdID0gLXRoaXMudmVsWzFdXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHNsb3BlID0gdGhpcy52ZWxbMV0gLyB0aGlzLnZlbFswXVxuICAgICAgbGV0IHdhbGxTbG9wZSA9IChvYi55dG9wUmlnaHRQdCAtIG9iLnl0b3BMZWZ0UHQpIC8gKG9iLnh0b3BSaWdodFB0IC0gb2IueHRvcExlZnRQdCk7XG4gICAgICBsZXQgaW50ZXJzZWN0aW9uWCA9ICgoc2xvcGUgKiB0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKSAtICh3YWxsU2xvcGUgKiBvYi54dG9wTGVmdFB0IC0gb2IueXRvcExlZnRQdCkpIC8gKHNsb3BlIC0gd2FsbFNsb3BlKTtcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25ZID0gc2xvcGUgKiBpbnRlcnNlY3Rpb25YIC0gKHNsb3BlICogdGhpcy5wb3NbMF0gLSB0aGlzLnBvc1sxXSk7XG4gICAgICBsZXQgeFByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcbiAgICAgIGxldCB4Q3VyckRpZmYgPSB0aGlzLnBvc1swXSAtIGludGVyc2VjdGlvblg7XG5cbiAgICAgIGlmIChpbnRlcnNlY3Rpb25ZID4gb2IueXRvcFJpZ2h0UHQgJiYgaW50ZXJzZWN0aW9uWSA8IG9iLnl0b3BMZWZ0UHQgJiYgeFByZXZEaWZmICogeEN1cnJEaWZmIDw9IDApIHtcbiAgICAgICAgbGV0IHlQcmV2RGlmZiA9IHRoaXMucHJldlBvc1sxXSAtIGludGVyc2VjdGlvblk7XG4gICAgICAgIGxldCB5Q3VyckRpZmYgPSB0aGlzLnBvc1sxXSAtIGludGVyc2VjdGlvblk7XG4gICAgICAgIGlmICh5UHJldkRpZmYgKiB5Q3VyckRpZmYgPD0gMCkge1xuICAgICAgICAgIGxldCB4QW5nbGUgPSAtMiAqIG9iLmFuZ2xlO1xuICAgICAgICAgIGxldCB4Q29tcDEgPSB0aGlzLnZlbFswXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcbiAgICAgICAgICBsZXQgeENvbXAyID0gdGhpcy52ZWxbMF0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeEFuZ2xlKSk7XG5cbiAgICAgICAgICBsZXQgeUFuZ2xlID0gMjcwIC0gMiAqIG9iLmFuZ2xlO1xuICAgICAgICAgIGxldCB5Q29tcDEgPSB0aGlzLnZlbFsxXSAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcbiAgICAgICAgICBsZXQgeUNvbXAyID0gdGhpcy52ZWxbMV0gKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnMoeUFuZ2xlKSk7XG5cbiAgICAgICAgICB0aGlzLnZlbFswXSA9IHhDb21wMSArIHlDb21wMTtcbiAgICAgICAgICB0aGlzLnZlbFsxXSA9IHhDb21wMiArIHlDb21wMjtcbiAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblggKyB0aGlzLnZlbFswXSAqIDAuMDE7XG4gICAgICAgICAgdGhpcy5wb3NbMV0gPSBpbnRlcnNlY3Rpb25ZICsgdGhpcy52ZWxbMV0gKiAwLjAxO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29sbGlzaW9uQm90KG9iKSB7XG5cbiAgICBpZiAob2IuYW5nbGUgPT09IDApIHtcbiAgICAgIGxldCBpbnZTbG9wZSA9IHRoaXMudmVsWzBdIC8gdGhpcy52ZWxbMV07XG4gICAgICBsZXQgd2FsbERpbSA9IG9iLnBvc1sxXSArIG9iLmhlaWdodCAvIDI7XG4gICAgICBsZXQgaW50ZXJzZWN0aW9uUFQgPSB0aGlzLnByZXZQb3NbMF0gKyBpbnZTbG9wZSAqICh3YWxsRGltIC0gdGhpcy5wcmV2UG9zWzFdKTtcbiAgICAgIGxldCB4TG93ZXJCb3VuZCA9IG9iLnBvc1swXSAtIG9iLndpZHRoIC8gMjtcbiAgICAgIGxldCB4VXBwZXJCb3VuZCA9IG9iLnBvc1swXSArIG9iLndpZHRoIC8gMjtcbiAgICAgIGlmICh0aGlzLnByZXZQb3NbMV0gPiB3YWxsRGltKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc1sxXSA8IHdhbGxEaW0pIHtcbiAgICAgICAgICBpZiAoaW50ZXJzZWN0aW9uUFQgPiB4TG93ZXJCb3VuZCAmJiBpbnRlcnNlY3Rpb25QVCA8IHhVcHBlckJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnBvc1swXSA9IGludGVyc2VjdGlvblBUO1xuICAgICAgICAgICAgdGhpcy5wb3NbMV0gPSB3YWxsRGltO1xuICAgICAgICAgICAgdGhpcy52ZWxbMV0gPSAtdGhpcy52ZWxbMV1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc2xvcGUgPSB0aGlzLnZlbFsxXSAvIHRoaXMudmVsWzBdXG4gICAgICBsZXQgd2FsbFNsb3BlID0gKG9iLnlib3R0b21SaWdodFB0IC0gb2IueWJvdHRvbUxlZnRQdCkgLyAob2IueGJvdHRvbVJpZ2h0UHQgLSBvYi54Ym90dG9tTGVmdFB0KTtcbiAgICAgIGxldCBpbnRlcnNlY3Rpb25YID0gKChzbG9wZSAqIHRoaXMucG9zWzBdIC0gdGhpcy5wb3NbMV0pIC0gKHdhbGxTbG9wZSAqIG9iLnhib3R0b21MZWZ0UHQgLSBvYi55Ym90dG9tTGVmdFB0KSkgLyAoc2xvcGUgLSB3YWxsU2xvcGUpO1xuICAgICAgbGV0IGludGVyc2VjdGlvblkgPSBzbG9wZSAqIGludGVyc2VjdGlvblggLSAoc2xvcGUgKiB0aGlzLnBvc1swXSAtIHRoaXMucG9zWzFdKTtcbiAgICAgIGxldCB4UHJldkRpZmYgPSB0aGlzLnByZXZQb3NbMF0gLSBpbnRlcnNlY3Rpb25YO1xuICAgICAgbGV0IHhDdXJyRGlmZiA9IHRoaXMucG9zWzBdIC0gaW50ZXJzZWN0aW9uWDtcblxuICAgICAgaWYgKGludGVyc2VjdGlvblkgPiBvYi55Ym90dG9tUmlnaHRQdCAmJiBpbnRlcnNlY3Rpb25ZIDwgb2IueWJvdHRvbUxlZnRQdCAmJiB4UHJldkRpZmYgKiB4Q3VyckRpZmYgPD0gMCkge1xuICAgICAgICBsZXQgeVByZXZEaWZmID0gdGhpcy5wcmV2UG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcbiAgICAgICAgbGV0IHlDdXJyRGlmZiA9IHRoaXMucG9zWzFdIC0gaW50ZXJzZWN0aW9uWTtcbiAgICAgICAgaWYgKHlQcmV2RGlmZiAqIHlDdXJyRGlmZiA8PSAwKSB7XG4gICAgICAgICAgbGV0IHhBbmdsZSA9IC0yICogb2IuYW5nbGU7XG4gICAgICAgICAgbGV0IHhDb21wMSA9IHRoaXMudmVsWzBdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHhBbmdsZSkpO1xuICAgICAgICAgIGxldCB4Q29tcDIgPSB0aGlzLnZlbFswXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh4QW5nbGUpKTtcblxuICAgICAgICAgIGxldCB5QW5nbGUgPSAyNzAgLSAyICogb2IuYW5nbGU7XG4gICAgICAgICAgbGV0IHlDb21wMSA9IHRoaXMudmVsWzFdICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHlBbmdsZSkpO1xuICAgICAgICAgIGxldCB5Q29tcDIgPSB0aGlzLnZlbFsxXSAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh5QW5nbGUpKTtcblxuICAgICAgICAgIHRoaXMudmVsWzBdID0geENvbXAxICsgeUNvbXAxO1xuICAgICAgICAgIHRoaXMudmVsWzFdID0geENvbXAyICsgeUNvbXAyO1xuICAgICAgICAgIHRoaXMucG9zWzBdID0gaW50ZXJzZWN0aW9uWCArIHRoaXMudmVsWzBdICogMC4wMTtcbiAgICAgICAgICB0aGlzLnBvc1sxXSA9IGludGVyc2VjdGlvblkgKyB0aGlzLnZlbFsxXSAqIDAuMDE7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbnMob2JzdGFjbGUpIHtcbiAgICBpZiAodGhpcy5jb2xsaXNpb25MZWZ0KG9ic3RhY2xlKSB8fCB0aGlzLmNvbGxpc2lvblJpZ2h0KG9ic3RhY2xlKSB8fCB0aGlzLmNvbGxpc2lvblRvcChvYnN0YWNsZSkgfHwgdGhpcy5jb2xsaXNpb25Cb3Qob2JzdGFjbGUpKSB7XG4gICAgICAvLyB0aGlzLm1ha2VCb3VuY2VTb3VuZCgpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBtYWtlQm91bmNlU291bmQoKSB7XG4gIC8vICAgbGV0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdWRpby1wbGF5ZXJcIilcbiAgLy8gICBhdWRpby5zcmMgPSBcIi4vYXNzZXRzL3NvdW5kL2JvdW5jZS53YXZcIjtcbiAgLy8gICBhdWRpby5wbGF5KCk7XG4gIC8vIH1cblxuICBnZXRSYWRpYW5zKGFuZ2xlKSB7XG4gICAgcmV0dXJuIGFuZ2xlICogTWF0aC5QSSAvIDE4MFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW92aW5nT2JqZWN0OyIsImNsYXNzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgdGhpcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICB0aGlzLmFuZ2xlID0gb3B0aW9ucy5hbmdsZTtcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcbiAgICB0aGlzLnhtaWRMZWZ0UHQgPSB0aGlzLnBvc1swXSAtIHRoaXMud2lkdGggLyAyICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcbiAgICB0aGlzLnltaWRMZWZ0UHQgPSB0aGlzLnBvc1sxXSArIHRoaXMud2lkdGggLyAyICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcbiAgICB0aGlzLnhib3R0b21MZWZ0UHQgPSB0aGlzLnhtaWRMZWZ0UHQgKyB0aGlzLmhlaWdodCAvIDIgKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xuICAgIHRoaXMueWJvdHRvbUxlZnRQdCA9IHRoaXMueW1pZExlZnRQdCArIHRoaXMuaGVpZ2h0IC8gMiAqIE1hdGguY29zKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XG4gICAgdGhpcy54dG9wTGVmdFB0ID0gdGhpcy54bWlkTGVmdFB0IC0gdGhpcy5oZWlnaHQgLyAyICogTWF0aC5zaW4odGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcbiAgICB0aGlzLnl0b3BMZWZ0UHQgPSB0aGlzLnltaWRMZWZ0UHQgLSB0aGlzLmhlaWdodCAvIDIgKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xuICAgIHRoaXMueG1pZFJpZ2h0UHQgPSB0aGlzLnBvc1swXSArIHRoaXMud2lkdGggLyAyICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcbiAgICB0aGlzLnltaWRSaWdodFB0ID0gdGhpcy5wb3NbMV0gLSB0aGlzLndpZHRoIC8gMiAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XG4gICAgdGhpcy54Ym90dG9tUmlnaHRQdCA9IHRoaXMueG1pZFJpZ2h0UHQgKyB0aGlzLmhlaWdodCAvIDIgKiBNYXRoLnNpbih0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xuICAgIHRoaXMueWJvdHRvbVJpZ2h0UHQgPSB0aGlzLnltaWRSaWdodFB0ICsgdGhpcy5oZWlnaHQgLyAyICogTWF0aC5jb3ModGhpcy5nZXRSYWRpYW5zKHRoaXMuYW5nbGUpKTtcbiAgICB0aGlzLnh0b3BSaWdodFB0ID0gdGhpcy54bWlkUmlnaHRQdCAtIHRoaXMuaGVpZ2h0IC8gMiAqIE1hdGguc2luKHRoaXMuZ2V0UmFkaWFucyh0aGlzLmFuZ2xlKSk7XG4gICAgdGhpcy55dG9wUmlnaHRQdCA9IHRoaXMueW1pZFJpZ2h0UHQgLSB0aGlzLmhlaWdodCAvIDIgKiBNYXRoLmNvcyh0aGlzLmdldFJhZGlhbnModGhpcy5hbmdsZSkpO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XG4gICAgY3R4LnJvdGF0ZSgtdGhpcy5nZXRSYWRpYW5zKCkpO1xuICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zWzBdLCAtdGhpcy5wb3NbMV0pO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc1swXSAtIHRoaXMud2lkdGggLyAyLCB0aGlzLnBvc1sxXSAtIHRoaXMuaGVpZ2h0IC8gMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcbiAgICBjdHgucm90YXRlKHRoaXMuZ2V0UmFkaWFucygpKTtcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnBvc1swXSwgLXRoaXMucG9zWzFdKTtcbiAgfVxuXG4gIGdldFJhZGlhbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYW5nbGUgKiBNYXRoLlBJLzE4MFxuICB9XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic3RhY2xlOyIsImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoXCIuL21vdmluZ19vYmplY3RcIik7XG5cbmNsYXNzIFBsYXlCYWxsIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5kZXRlcm1pbmVNb3ZlbWVudCA9IHRoaXMuZGV0ZXJtaW5lTW92ZW1lbnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1pbkNsaWNrRGlzdCA9IDA7XG4gIH0gXG5cbiAgZGV0ZXJtaW5lTW92ZW1lbnQoeENsaWNrLCB5Q2xpY2spIHtcbiAgICBsZXQgeERpZmYgPSB0aGlzLnBvc1swXSAtIHhDbGljaztcbiAgICBsZXQgeURpZmYgPSB0aGlzLnBvc1sxXSAtIHlDbGljaztcblxuICAgIGlmIChNYXRoLmFicyh4RGlmZikgPCB0aGlzLm1pbkNsaWNrRGlzdCkge1xuICAgICAgeERpZmYgPSB4RGlmZiAvIE1hdGguYWJzKHhEaWZmKSp0aGlzLm1pbkNsaWNrRGlzdDtcbiAgICB9XG5cbiAgICBpZiAoTWF0aC5hYnMoeURpZmYpIDwgdGhpcy5taW5DbGlja0Rpc3QpIHtcbiAgICAgIHlEaWZmID0geURpZmYgLyBNYXRoLmFicyh5RGlmZikgKiB0aGlzLm1pbkNsaWNrRGlzdDtcbiAgICB9XG5cbiAgICBsZXQgbWFnID0gMS8oTWF0aC5wb3coeERpZmYsMikgKyBNYXRoLnBvdyh5RGlmZiwyKSk7XG4gICAgbGV0IHVuaXREaXIgPSBbeERpZmYsIHlEaWZmXTtcbiAgICB0aGlzLnZlbFswXSA9IHVuaXREaXJbMF0gKiBtYWcgKiA4NTA7XG4gICAgdGhpcy52ZWxbMV0gPSB1bml0RGlyWzFdICogbWFnICogODUwO1xuICB9XG5cbiAgZ2V0RGlzdGFuY2UodGFyZ2V0KSB7XG4gICAgbGV0IHhEaWZmID0gTWF0aC5hYnModGhpcy5wb3NbMF0gLSB0YXJnZXQucG9zWzBdKTtcbiAgICBsZXQgeURpZmYgPSBNYXRoLmFicyh0aGlzLnBvc1sxXSAtIHRhcmdldC5wb3NbMV0pO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeERpZmYqeERpZmYgKyB5RGlmZip5RGlmZikudG9GaXhlZCgzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlCYWxsOyIsImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoXCIuL21vdmluZ19vYmplY3RcIik7XG5cbmNsYXNzIFNwYXJrIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuY29sb3JTZXQgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIl07XG4gICAgdGhpc1xuICAgIHNldEludGVydmFsKHRoaXMuY2hhbmdlQ29sb3IsIDUwMCk7XG4gIH1cblxuICBjaGFuZ2VDb2xvcigpIHtcbiAgICBsZXQgY29sb3JTdHIgPSBcIiNcIjtcblxuICAgIHdoaWxlIChjb2xvclN0ci5sZW5ndGggPCA2KSB7XG4gICAgICBjb2xvclN0ciArPSB0aGlzLmNvbG9yU2V0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuY29sb3JTZXQubGVuZ3RoKV07XG4gICAgfVxuXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yU3RyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3Bhcms7IiwiY2xhc3MgVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMucG9zID0gb3B0aW9ucy5wb3M7XG4gICAgdGhpcy52ZWwgPSBbMCwgMF07XG4gICAgdGhpcy5yYWRpdXMgPSA4O1xuICAgIHRoaXMuY29sb3IgPSBcIiNmZmZmZmZcIjtcbiAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoXG4gICAgICB0aGlzLnBvc1swXSxcbiAgICAgIHRoaXMucG9zWzFdLFxuICAgICAgdGhpcy5yYWRpdXMsXG4gICAgICAwLFxuICAgICAgMiAqIE1hdGguUEksXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICBjdHguZmlsbCgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0OyJdLCJzb3VyY2VSb290IjoiIn0=