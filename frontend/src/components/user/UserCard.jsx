import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
