import { RoundStateMachine } from "./RoundStepMachine";

export class FightStateMachine {
  static ROUND_STATES = {
    START: 'START',
    ROUND_IN_PROGRESS: 'ROUND_IN_PROGRESS',
    END: 'END',
  };

  constructor(scene) {
    this.scene = scene;
    this.roundStateMachine = null;
    this.roundNumber = 0;
    this.maxRounds = 10;
  }

  start() {
    this.setState(FightStateMachine.ROUND_STATES.START);
  }

  setState(state) {
    switch (state) {
      case FightStateMachine.ROUND_STATES.START:
        this.roundNumber = 0;
        this.setState(FightStateMachine.ROUND_STATES.ROUND_IN_PROGRESS);
        break;
      case FightStateMachine.ROUND_STATES.ROUND_IN_PROGRESS:
        if (this.roundNumber < this.maxRounds) {
          this.roundNumber++;
          this.roundStateMachine = new RoundStateMachine(this.scene);
          this.roundStateMachine.startRound();
        } else {
          this.setState(FightStateMachine.ROUND_STATES.END);
        }
        break;
      case FightStateMachine.ROUND_STATES.END:
        // Handle the end of the fight
        console.log("Fight Ended");
        break;
    }
  }

  update() {
    if (this.roundStateMachine) {
      this.roundStateMachine.update();
      if (this.roundStateMachine.isRoundComplete()) {
        this.setState(FightStateMachine.ROUND_STATES.ROUND_IN_PROGRESS);
      }
    }
  }
}