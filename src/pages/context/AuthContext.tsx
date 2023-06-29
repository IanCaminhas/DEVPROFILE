import React from 'react';

//O que vai ficar de forma global nesse contexto ?
interface IAuthContext {
  name: string;
}

interface IProps {
  children: React.ReactElement;
}

//Passo como gneric <> o IAuthContext
//para parar de dar erro, passo um objeto vazio do tipo: {} as IAuthContext
export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ name: 'Ian' }}>
      {children}
    </AuthContext.Provider>
  );
};
