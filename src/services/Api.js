//generaly for api i will follow componet level approcah but as this app was too small i did in only one file and also
// would used environment variables but this app is to small for this


const BASE_URL = 'https://reqres.in/api';


export async function login(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Login failed');
  }
}

export async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}

export async function createUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}
export async function fetchUserDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
}
