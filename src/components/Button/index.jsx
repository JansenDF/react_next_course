import { Component } from "react";

export class Button extends Component {
  render() {
    const { clicado } = this.props;

    return <button onClick={clicado}>More Pages</button>;
  }
}
