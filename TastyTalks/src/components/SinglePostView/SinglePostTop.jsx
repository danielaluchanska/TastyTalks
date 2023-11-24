import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SinglePostTop = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="post-title-single">{post.title}</h3>
      <p className="post-content-single">{post.content}</p>
      <p className="post-author-single" onClick={() => navigate(`/${(post.author)}`)}>{post.author}</p>
    </div>
  )
};
SinglePostTop.propTypes = {
  post: PropTypes.object,
};

export default SinglePostTop;