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

  start = () => {
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

    return (
      <div className="App">
        {hasBeenStarted && (
          <div>
            <h3>Lottade siffror:</h3>
            <div className="oldNumbers">
              {numbers.slice(0, curIndex).join(", ") || "-"}
            </div>

            <h3>Senaste siffran: </h3>
            <div className="number">{current || "Spelet slut!"}</div>

            <div>
              <button onClick={this.next}>Lotta nästa siffra!</button>
            </div>
          </div>
        )}
        <h3>Starta nytt spel</h3>
        <label htmlFor="maxNumber">Antal siffror:</label>
        <input
          id="maxNumber"
          value={maxNumber}
          onChange={this.changeMaxNumber}
        />
        <button onClick={this.start}>Start</button>
      </div>
    );
  }
}

export default App;
