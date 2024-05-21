import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PostList from '../components/PostList';
import UserList from '../components/UserList';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Search = () => {
  const query = useQuery();
  const q = query.get('q');
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/api/posts/search?q=${q}`);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchPeople = async () => {
      try {
        const { data } = await axios.get(`/api/users/search?q=${q}`);
        setPeople(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
    fetchPeople();
  }, [q]);

  return (
    <div className="search">
      <h2>Results for {q}</h2>
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
            className={`${activeTab === 'people' ? 'active' : ''}`}
            onClick={() => handleTabClick('people')}
          >
            People
          </button>
        </div>

        {/* Tab content */}
        <div>
          {/* People tab */}
          {activeTab === 'people' && (
            <div className="tabContent">
              <UserList users={people} />
            </div>
          )}

          {/* Posts tab */}
          {activeTab === 'posts' && (
            <div className="tabContent">
              <PostList posts={posts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
