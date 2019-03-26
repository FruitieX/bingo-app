import React, { Component } from "react";
import { range } from "fp-ts/lib/Array";
import "./App.css";

interface State {
  numbers: number[];
  maxNumber: string;
  curIndex: number;
  hasBeenStarted: boolean;
}

class App extends Component<{}, State> {
  state = {
    numbers: [],
    maxNumber: "",
    curIndex: 0,
    hasBeenStarted: false
  };

  changeMaxNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ maxNumber: event.target.value });
  };

  start = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { maxNumber } = this.state;

    const parsed = parseInt(maxNumber);
    if (isNaN(parsed)) return;

    const numbers = range(1, parsed).sort(() => Math.random() - 0.5);

    this.setState({
      maxNumber: "",
      numbers,
      curIndex: 0,
      hasBeenStarted: true
    });
  };

  next = () => {
    this.setState(state => ({
      curIndex: state.curIndex + 1
    }));
  };

  render() {
    const { maxNumber, numbers, curIndex, hasBeenStarted } = this.state;

    const current = numbers[curIndex];
    const drawn =
      numbers
        .slice(0, curIndex)
        .sort((a, b) => a - b)
        .join(", ") || "-";

    return (
      <div className="App">
        {hasBeenStarted && (
          <div className="game">
            <h3>Lottade siffror:</h3>
            <div className="oldNumbers">{drawn}</div>

            <h3>Senaste siffran: </h3>
            <div className="number">{current || "Spelet slut!"}</div>

            <div>
              <button onClick={this.next} className="drawNext">
                Lotta nästa siffra!
              </button>
            </div>
          </div>
        )}
        <h3>Starta nytt spel</h3>
        <form onSubmit={this.start}>
          <input
            id="maxNumber"
            value={maxNumber}
            onChange={this.changeMaxNumber}
            placeholder="Antal siffror"
          />
          <button>Start</button>
        </form>
      </div>
    );
  }
}

export default App;
