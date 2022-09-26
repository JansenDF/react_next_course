import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Jansen Lima",
      cont: 0,
    };
  }

  handleSetName = () => {
    this.setState({ name: "Jão" });
  };

  handleSetCont = (event) => {
    event.preventDefault();
    const { cont } = this.state;
    this.setState({ cont: cont + 1 });
  };
  render() {
    const { name, cont } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handleSetName}>
            {name} {cont}
          </p>
          <a
            onClick={this.handleSetCont}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
