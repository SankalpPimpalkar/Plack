import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { socket } from './lib/socket';

export default function App() {

  const { user } = useUser()

  useEffect(() => {
    if (user?.id) {
      socket.auth = { userId: user?.id }
      socket.connect()
    }

    return () => {
      socket.disconnect();
    };
  }, [user])

  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}