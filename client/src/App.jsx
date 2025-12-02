import { RedirectToSignIn, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { socket } from './lib/socket';
import LandingPage from './pages/LandingPage';
import ChannelPage from './pages/ChannelPage';
import EmptyChatWindow from './components/EmptyChatWindow';
import ChatWindow from './components/ChatWindow';
import { checkHealth } from './lib/api';

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

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      {/* Protected Routes */}
      <Route
        path='/channels/*'
        element={
          <>
            <SignedIn>
              <ChannelPage />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      >
        <Route index element={<EmptyChatWindow />} />
        <Route path=":channelId" element={<ChatWindow />} />
      </Route>

      <Route path="*" element={<Navigate to="/channels" />} />
    </Routes>
  );
}