import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Menu from '../components/Menu';
import PostList from '../components/PostList';

const UserProfile = () => {
  const location = useLocation();
  const username = location.pathname.split('/')[2];
  const [userDetail, setUserDetail] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const { data } = await axios.get(`/users/${username}`);
        setUserDetail(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDetail();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/posts?uid=${userDetail.id}`);
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!userDetail) {
      return;
    }
    fetchPosts();
  }, [userDetail]);

  if (!userDetail) {
    return null;
  }
  return (
    <div>
      <div className="user-profile">
        <div className="left">
          <Avatar user={userDetail} />
        </div>

        <div className="right">
          <h2>{userDetail.username}</h2>
          <p>{userDetail.email}</p>
        </div>
      </div>

      <div className="user-posts">
        <h2>All Posts</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default UserProfile;
