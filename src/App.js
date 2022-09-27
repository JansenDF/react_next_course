import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    posts: [],
  };

  //Inicia o timeout como nulo

  //função a ser executado após renderização da pagina
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((posts, index) => {
      return { ...posts, cover: photosJson[index].url };
    });

    this.setState({ posts: postsAndPhotos });
  };

  //update do render conforme timeout definido
  componentDidUpdate() {}

  //limpeza do lixo após reload do render
  componentWillUnmount() {}

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
            <div className="post">
              <img src={post.cover} alt={post.title} />
              <div key={post.id} className="post-content">
                <h2>Título: {post.title}</h2>
                <p>Corpo: {post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
