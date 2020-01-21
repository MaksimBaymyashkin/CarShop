import './App.css';
import React, {useEffect, useState} from 'react';
import {useRoute} from 'react-router5';
import Main from "./pages/main";
import Auth from './pages/auth';
import NotFound from './pages/not-found';

import useStoreon from 'storeon/react';
import {AUTH_STATE_SIGN_IN} from './store/auth/action-names';

function App() {
  const {route} = useRoute();
  const {dispatch} = useStoreon();
  const [authTrigger] = useState(1);
  const topRouteName = route.name.split('.')[0];

  useEffect(() => {
    dispatch(AUTH_STATE_SIGN_IN);
  }, [authTrigger]);

  if (topRouteName === 'auth') {
    return <Auth />;
  }

  if (topRouteName === 'main') {
    return <Main />;
  }

  return <NotFound />;
}

export default App;
