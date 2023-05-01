import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "http://localhost:3333",
});

export async function discordOAuth(): Promise<{redirectUrl: string}> {
  const response = await apiClient.get<{redirect_url: string}>("/oauth/discord")
  return {
    redirectUrl: response.data.redirect_url
  }
}

export type CreateUserInput = {
  name: string
  email: string
  password: string
  discord_id: string
  discord_username: string
}

export async function createUser(input: CreateUserInput): Promise<{token: string}> {
  const response = await apiClient.post<{access_token: string}>("/users", input)
  return {
    token: response.data.access_token
  }
}