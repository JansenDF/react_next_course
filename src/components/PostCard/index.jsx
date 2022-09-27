export const PostCard = ({ post }) => {
  return (
    <div className="post">
      <img src={post.cover} alt={post.title} />
      <div className="post-content">
        <h2>Título: {post.title}</h2>
        <p>Corpo: {post.body}</p>
      </div>
    </div>
  );
};
