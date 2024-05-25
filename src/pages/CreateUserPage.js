import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createUser } from '../services/Api'; 

const CreateUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 500px;
  padding: 2rem;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 3px;
  background-color: #333;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 1rem;
`;

export default function CreateUserPage() {
  const [userData, setUserData] = useState({ name: '', job: '' });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);

    try {
      const response = await createUser(userData);
      setSuccessMessage('User successfully created!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <CreateUserContainer>
      {isAuthenticated && (
        <>
          <Title>Create User</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name:</Label>
              <Input type="text" name="name" value={userData.name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="job">Job:</Label>
              <Input type="text" name="job" value={userData.job} onChange={handleChange} />
            </FormGroup>
            <Button type="submit">Create</Button>
          </Form>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </>
      )}
    </CreateUserContainer>
  );
}
