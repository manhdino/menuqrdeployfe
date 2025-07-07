import LoginForm from '@/app/(public)/(auth)/login'
import Logout from '@/app/(public)/(auth)/login/logout'

export default async function Login() {
  return (
    <>
      <LoginForm />
      <Logout />
    </>
  )
}
