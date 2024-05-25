import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchUserDetails } from '../services/Api';
import styled from 'styled-components';

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserDetail = styled.p`
  font-weight: bold;
`;

const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

function EditUserPage() {
  const [userData, setUserData] = useState({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });
  const { userId } = useParams();
  const { isAuthenticated } = useAuth();

  console.log(userId, 'xyz');

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const data = await fetchUserDetails(userId);
        setUserData(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (isAuthenticated) {
      getUserDetails();
    }
  }, [userId, isAuthenticated]);

  return (
    <div>
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>
        Edit User Details
      </h2>
      {isAuthenticated && userData && (
        <UserDetails>
          <UserAvatar src={userData.avatar} alt={userData.first_name} />
          <UserDetail>Username: {userData.email}</UserDetail>
          <UserDetail>
            First Name: {userData.first_name}
          </UserDetail>
          <UserDetail>
            Last Name: {userData.last_name}
          </UserDetail>
        </UserDetails>
      )}
    </div>
  );
}

export default EditUserPage;
