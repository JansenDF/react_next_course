import { Component } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/loadPosts";

class Home extends Component {
  state = {
    posts: [],
  };

  //Inicia o timeout como nulo

  //função a ser executado após renderização da pagina
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
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
        <Posts posts={posts} />
      </section>
    );
  }
}

export default Home;
