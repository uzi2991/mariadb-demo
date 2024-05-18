import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '../components/Avatar';
import PostList from '../components/PostList';
import { AuthContext } from '../context/authContext';
import UserList from '../components/UserList';

const UserProfile = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const username = location.pathname.split('/')[2];
  const [userDetail, setUserDetail] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

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
  }, [username]);

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
      setIsFollowing(
        userDetail.followers.some((follower) => follower.id === currentUser.id),
      );
    };

    if (userDetail && currentUser) {
      checkFollowingStatus();
    }
  }, [userDetail, currentUser]);

  const handleFollow = async () => {
    try {
      await axios.post(`/users/follow/${userDetail.id}`);
      setIsFollowing(true);
      setUserDetail((prevUser) => ({
        ...prevUser,

        followers: [...prevUser.followers, currentUser],
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

        followers: prevUser.followers.filter(
          (follower) => follower.id !== unfollowedUserId,
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
        <strong>{userDetail.followings.length}</strong> followings
        <strong>{userDetail.followers.length}</strong> followers
      </div>

      <div>
        {/* Tab buttons */}
        <div className="tab">
          <button
            className={`${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => handleTabClick('posts')}
          >
            Posts
          </button>
          <button
            className={`${activeTab === 'followers' ? 'active' : ''}`}
            onClick={() => handleTabClick('followers')}
          >
            Followers
          </button>
          <button
            className={`${activeTab === 'followings' ? 'active' : ''}`}
            onClick={() => handleTabClick('followings')}
          >
            Followings
          </button>
        </div>
        <div>
          {activeTab === 'posts' && (
            <div className="tabContent">
              <PostList posts={posts} />
            </div>
          )}
          {activeTab === 'followers' && (
            <div className="tabContent">
              <UserList users={userDetail.followers} />
            </div>
          )}
          {activeTab === 'followings' && (
            <div className="tabContent">
              <UserList users={userDetail.followings} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
