import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchUsers } from "../services/Api";
import styled from "styled-components";

const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const UserInfo = styled.div`
  flex: 1; 
`;

const UserActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #eee;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #ddd;
  }
`;

function UserListPage() {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (isAuthenticated) {
      getUsers();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "center" }}>User List</h2>
      <Link style={{ display: "flex", justifyContent: "end" }} to="/create-user">
        Create User
      </Link>
      {isAuthenticated && (
        <ul>
          {users.map((user) => (
            <UserCard key={user.id}>
              <UserAvatar src={user.avatar} alt={user.email} />
              <UserInfo>
                <h4>
                  {user.first_name} {user.last_name}
                </h4>
                <p>{user.email}</p>
              </UserInfo>
              <UserActions>
                <Link to={`/file-preview/${user.id}`}>
                  <UserButton>Files</UserButton>
                </Link>
                <Link to={`/edit-user/${user.id}`}>
                  <UserButton>Edit</UserButton>
                </Link>
              </UserActions>
            </UserCard>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserListPage;