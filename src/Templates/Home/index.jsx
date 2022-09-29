import { useCallback, useEffect, useState } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState("");

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
  }, [handleLoadPosts, postPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    console.log(value);
  };

  const noMorePosts = page + postPerPage >= allPosts.length;

  const postFiltered = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search value: {searchValue}</h1>
            <p>
              Encontramos {postFiltered.length} posts com a palavra "
              {searchValue}"
            </p>
          </>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {postFiltered.length > 0 && (
        <>
          <Posts posts={postFiltered} />
        </>
      )}
      {postFiltered.length === 0 && <p>Não existem Posts com esta busca</p>}
      <div className="button-container">
        {!searchValue && (
          <Button clicado={loadMorePosts} disable={noMorePosts} />
        )}
      </div>
    </section>
  );
};

// class Home2 extends Component {
// state = {
//   posts: [],
//   allPosts: [],
//   page: 0,
//   postsPerPage: 2,
//   searchValue: "",
// };

//Inicia o timeout como nulo

//função a ser executado após renderização da pagina
// componentDidMount() {
//   this.loadPosts();
// }

// loadPosts = async () => {
//   const { page, postsPerPage } = this.state;
//   const postsAndPhotos = await loadPosts();
//   this.setState({
//     posts: postsAndPhotos.slice(page, postsPerPage),
//     allPosts: postsAndPhotos,
//   });
// };

// loadMorePosts = () => {
//   const { page, postsPerPage, posts, allPosts } = this.state;

//   const nextPage = page + postsPerPage;
//   const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//   posts.push(...nextPosts);

//   this.setState({ posts, page: nextPage });
// };
// handleChange = (e) => {
//   const { value } = e.target;
//   this.setState({ searchValue: value });
//   console.log(value);
// };
// render() {
//   const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//   const noMorePosts = page + postsPerPage >= allPosts.length;

//   const postFiltered = !!searchValue
//     ? allPosts.filter((post) => {
//         return post.title.toLowerCase().includes(searchValue.toLowerCase());
//       })
//     : posts;

//   return (
//     <section className="container">
//       <div className="search-container">
//         {!!searchValue && (
//           <>
//             <h1>Search value: {searchValue}</h1>
//             <p>
//               Encontramos {postFiltered.length} posts com a palavra "
//               {searchValue}"
//             </p>
//           </>
//         )}
//         <TextInput
//           searchValue={searchValue}
//           handleChange={this.handleChange}
//         />
//       </div>

//       {postFiltered.length > 0 && (
//         <>
//           <Posts posts={postFiltered} />
//         </>
//       )}
//       {postFiltered.length === 0 && <p>Não existem Posts com esta busca</p>}
//       <div className="button-container">
//         {!searchValue && (
//           <Button clicado={this.loadMorePosts} disable={noMorePosts} />
//         )}
//       </div>
//     </section>
//   );
// }
// }

export default Home;
