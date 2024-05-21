import React, { useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import CommentList from '../components/CommentList';

const Single = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  const { currentUser } = useContext(AuthContext);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments?pid=${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location.hash && comments.length) {
      const element = document.querySelector(location.hash);
      console.log(element);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, comments]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async () => {
    try {
      const commentData = {
        username: currentUser.username,
        content: comment,
        pid: postId,
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      };
      await axios.post(`/api/comments`, commentData);
      setComment('');
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content-wrapper">
        <div className="content">
          <img src={`/${post.img}`} alt="" />
          <div className="user">
            {post.userImg && <img src={post.userImg} alt="" />}
            <div className="info">
              <Link to={`/user/${post.username}`}>
                <span>{post.username}</span>
              </Link>

              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser && currentUser.username === post.username && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>{' '}
        </div>
        <Menu cat={post.cat} />
      </div>

      <div>
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={comment}
            placeholder="Write a comment"
            onChange={setComment}
          />
          <button className="comment-button" onClick={handleAddComment}>
            Add comment
          </button>
        </div>
      </div>

      <CommentList comments={comments} />
    </div>
  );
};

export default Single;
