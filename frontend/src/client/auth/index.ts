import { clientSideClient } from "../clientSide";

export async function loginUser(email: string, password: string) {
  const response = await clientSideClient.auth.login({
    body: { email, password },
  });

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Login failed: ${response.status}`);
}

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}) {
  const response = await clientSideClient.auth.register({
    body: data,
  });

  if (response.status === 201) {
    return response.body;
  }

  throw new Error(`Registration failed: ${response.status}`);
}

export async function getCurrentUser(token: string) {
  const response = await clientSideClient.auth.me({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to get user: ${response.status}`);
}
