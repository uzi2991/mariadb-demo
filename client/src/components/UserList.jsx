import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const UserList = ({ users }) => {
  if (!users.length) {
    return <p>There are 0 users</p>;
  }
  return (
    <div className="search-users">
      {users.map((user) => (
        <div key={user.id} className="search-user">
          <Avatar user={user} />
          <div>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>

          <Link to={`/user/${user.username}`} className="link">
            <button>View Profile</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
