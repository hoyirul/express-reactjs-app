import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import UserCard from '../components/user/UserCard';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
