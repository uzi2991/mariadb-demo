import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}


const Search = () => {
  const query = useQuery();
  const q = query.get('q');
  const [activeTab, setActiveTab] = useState('posts');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
          {activeTab === 'people' && <div className="tabContent">
          People
          </div>}


          {/* Posts tab */}
          {activeTab === 'posts' && <div className="tabContent">Posts</div>}
        </div>
      </div>
    </div>
  );
};

export default Search;
