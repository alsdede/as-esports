import { api } from '@/lib/axios'

export interface RegisterUserBody {
  name: string
  email: string
  phone: string
}

export async function registerUser({ name, email, phone }: RegisterUserBody) {
  await api.post('/users', { name, email, phone })
}
