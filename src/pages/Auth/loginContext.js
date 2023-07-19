import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [signIn, setSignIn] = useState(false);

  const toggleSignIn = () => {
    setSignIn(prevSign => (prevSign ? false : true));
  };

  return (
    <LoginContext.Provider value={{ signIn, toggleSignIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };