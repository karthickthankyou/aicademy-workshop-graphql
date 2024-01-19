import { getAuth } from '@aicademy/network/src/auth/authOptions'
import { add } from '@aicademy/sample-lib'
import Link from 'next/link'
import { HomePage } from '@aicademy/ui/src/components/templates/HomePage'

export default async function Home() {
  const session = await getAuth()
  return (
    <main>
      <HomePage />
      Hello world {add(23, 3)}
      {session?.user ? (
        <div>
          <Link href="/api/auth/signout">Sign out</Link>
        </div>
      ) : (
        <Link href="/signIn">Login</Link>
      )}
    </main>
  )
}
