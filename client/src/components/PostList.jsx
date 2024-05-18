import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  const getText = (html) => {
    const MAX_LEN = 300;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    let text = doc.body.textContent;
    if (text.length > MAX_LEN) {
      text = text.substring(0, MAX_LEN) + '...';
    }
    return text;
  };

  if (!posts.length) {
    return <p>There are 0 posts</p>;
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`/${post.img}`} alt="" />
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>

            <p>{getText(post.desc)}</p>
            <Link className="link" to={`/post/${post.id}`}>
              <button>
                Read more <i className="fa-solid fa-arrow-right"></i>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
