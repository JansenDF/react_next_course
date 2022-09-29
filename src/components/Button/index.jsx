import "./styles.css";

export const Button = ({ clicado, disable }) => {
  return (
    <button className="button" onClick={clicado} disabled={disable}>
      More Pages
    </button>
  );
};
// export class Button2 extends Component {
//   render() {
//     const { clicado, disable } = this.props;

//     return (
//       <button className="button" onClick={clicado} disabled={disable}>
//         More Pages
//       </button>
//     );
//   }
// }
