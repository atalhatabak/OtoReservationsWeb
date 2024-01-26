import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    name: '',
    role: '',
    token: '0',
    user_id: '',
    data:'' ,
  });

  const login = async (name,role,token,user_id) => {
    await setAppData({
    name: name,
    role: role,
    token: token,
    user_id: user_id,
    data:'' ,});
  };

  const logout = () => {
    setAppData({
      name: '',
      role: '',
      token: '0',
      user_id: '',
      data:'' ,
    });
  };

  return (
    <AuthContext.Provider value={{ appData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
 
