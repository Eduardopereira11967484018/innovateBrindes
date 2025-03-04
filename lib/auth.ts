interface User {
  id: string
  name: string
  email: string
  password: string
  image?: string
}

const users = new Map<string, User>([
  [
    "demo@example.com",
    {
      id: "1",
      name: "Usuário Demo",
      email: "demo@example.com",
      password: "demo123",
      image: "/placeholder.svg",
    },
  ],
])

export async function authenticate(email: string, password: string) {
  const user = users.get(email)

  if (!user || user.password !== password) {
    return null
  }

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

