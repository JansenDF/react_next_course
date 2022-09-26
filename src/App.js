import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        title: "O título 1",
        body: "O corpo 1",
      },
      {
        id: 2,
        title: "O título 2",
        body: "O corpo 2",
      },
      {
        id: 3,
        title: "O título 3",
        body: "O corpo 3",
      },
    ],
    counter: 0,
  };

  //Inicia o timeout como nulo
  thisTimeoutUpdate = null;

  //função a ser executado após renderização da pagina
  componentDidMount() {
    this.handleSetTimeout();
  }

  //update do render conforme timeout definido
  componentDidUpdate() {
    this.handleSetTimeout();
  }

  //limpeza do lixo após reload do render
  componentWillUnmount() {
    clearTimeout(this.thisTimeoutUpdate);
    console.log(this.thisTimeoutUpdate);
  }

  handleSetTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = "Este título mudou!";
    this.thisTimeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 1000);
  };

  render() {
    const { posts, counter } = this.state;

    return (
      <div className="App">
        <h1>{counter}</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>Título: {post.title}</h2>
            <p>Corpo: {post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
