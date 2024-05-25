import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/helper';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  color: #fff;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px;
`;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const usernameError = validateEmail(formState.username)
        ? ''
        : 'Invalid email';
      const passwordError = validatePassword(formState.password)
        ? ''
        : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character';

      if (usernameError || passwordError) {
        setFormState((prevState) => ({
          ...prevState,
          errors: {
            username: usernameError,
            password: passwordError,
          },
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          errors: {
            username: '',
            password: '',
          },
        }));
        login(formState.username, formState.password);
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    },
    [location.state?.from?.pathname, login, navigate, formState.username, formState.password]
  );

  const handleUsernameChange = useCallback((e) => {
    setFormState((prevState) => ({
      ...prevState,
      username: e.target.value,
      errors: {
        ...prevState.errors,
        username: validateEmail(e.target.value) ? '' : 'Invalid email',
      },
    }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setFormState((prevState) => ({
      ...prevState,
      password: e.target.value,
      errors: {
        ...prevState.errors,
        password: validatePassword(e.target.value)
          ? ''
          : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character',
      },
    }));
  }, []);

  const isButtonDisabled =
    !!formState.errors.username ||
    !!formState.errors.password ||
    !formState.username ||
    !formState.password;

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email"
          value={formState.username}
          onChange={handleUsernameChange}
          error={!!formState.errors.username}
          required
        />
        {formState.errors.username && (
          <ErrorMessage>{formState.errors.username}</ErrorMessage>
        )}
        <Input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handlePasswordChange}
          error={!!formState.errors.password}
          required
        />
        {formState.errors.password && (
          <ErrorMessage>{formState.errors.password}</ErrorMessage>
        )}
        <Button type="submit" disabled={isButtonDisabled}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;