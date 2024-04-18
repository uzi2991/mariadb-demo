import React from 'react';

const Avatar = ({ user }) => {
  const firstLetter = user.username ? user.username.charAt(0).toUpperCase() : '';

  return (
    <div className="avatar">
      <span>{firstLetter}</span>
    </div>
  );
};

export default Avatar;