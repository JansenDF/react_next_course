import "./styles.css";

import { Component } from "react";

export class Button extends Component {
  render() {
    const { clicado, disable } = this.props;

    return (
      <button className="button" onClick={clicado} disabled={disable}>
        More Pages
      </button>
    );
  }
}
