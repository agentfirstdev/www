import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Flex, useColorMode, useDisclosure } from '@chakra-ui/react';

import * as supabase from './config/supabase';
import * as ui from './config/ui';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';

export default function App() {
  const [session, setSession] = useState(null);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const { colorMode } = useColorMode();
  const { onOpen } = useDisclosure();
  const modeId = 'mode';
  const handleKeyPress = (event, commitAction, cancelAction) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      commitAction(event);
    } else if (cancelAction && event.key == 'Escape') {
      event.preventDefault();
      cancelAction(event);
    }
  };
  const handleMenuOpen = () => {
    setShouldShowLogin(false);
    onOpen();
  };

  useEffect(() => {
    const { data } = supabase.client.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    supabase.client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let link = document.getElementById(modeId);

    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = modeId;

      document.head.appendChild(link);
    }

    link.href = `atom-one-${colorMode}${import.meta.env.PROD ? '.min' : ''}.css`;
  }, [colorMode]);

  return (
    <Flex w='100%' minH='100vh' direction='column'>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              supabaseClient={supabase.client}
              session={session}
              setSession={setSession}
              shouldShowLogin={shouldShowLogin}
              setShouldShowLogin={setShouldShowLogin}
              handleKeyPress={handleKeyPress}
              handleMenuOpen={handleMenuOpen}
            />
          }
        />
        <Route
          path={ui.profilePath}
          element={
            <Profile
              supabaseClient={supabase.client}
              session={session}
              setSession={setSession}
              shouldShowLogin={shouldShowLogin}
              setShouldShowLogin={setShouldShowLogin}
              handleKeyPress={handleKeyPress}
              handleMenuOpen={handleMenuOpen}
            />
          }
        />
      </Routes>
    </Flex>
  );
}
