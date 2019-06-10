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