export type User = {
  id?: string
  name: string
  email: string
  password?: string
  email_confirmed?: Boolean
  role: string
  token?: string
  createdAt: Date
  updatedAt: Date
}

export type LoginCredentials = {
  username?: string
  email?: string
  password?: string
}

export type TokenData = {
  email: string,
  user_id: string
}