import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '../components/Avatar';
import PostList from '../components/PostList';
import { AuthContext } from '../context/authContext';

const UserProfile = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const username = location.pathname.split('/')[2];
  const [userDetail, setUserDetail] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const { data } = await axios.get(`/users/u/${username}`);
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

  useEffect(() => {
    const checkFollowingStatus = () => {
      setIsFollowing(userDetail.followers.includes(currentUser.id));
    };

    if (userDetail && currentUser) {
      checkFollowingStatus();
    }
  }, [userDetail, currentUser]);

  const handleFollow = async () => {
    try {
      await axios.post(`/users/follow/${userDetail.id}`);
      setIsFollowing(true);

      const newFollowerId = currentUser.id;
      setUserDetail((prevUser) => ({
        ...prevUser,
        follower_count: prevUser.follower_count + 1,
        followers: [...prevUser.followers, newFollowerId],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`/users/unfollow/${userDetail.id}`);
      setIsFollowing(false);
      const unfollowedUserId = currentUser.id;
      setUserDetail((prevUser) => ({
        ...prevUser,
        follower_count: prevUser.follower_count - 1,
        followers: prevUser.followers.filter(
          (followerId) => followerId !== unfollowedUserId,
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

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

      {currentUser?.username !== userDetail.username && (
        <button
          className="follow-btn"
          onClick={isFollowing ? handleUnfollow : handleFollow}
        >
          <i className="fa-solid fa-eye"></i> {'  '}
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}

      <div className="user-follow">
        <strong>{userDetail.following_count}</strong> followings
        <strong>{userDetail.follower_count}</strong> followers
      </div>

      <div className="user-posts">
        <h2>All Posts</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default UserProfile;
