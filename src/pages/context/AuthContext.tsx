import React from 'react';

//O que vai ficar de forma global nesse contexto ?
interface IAuthContext {
  name: string; //nome do usuario
  signIn(): void; //method de signIn

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
  const signIn = () => {
    console.log('SignIn');
  }
  //disponibilizo globalmente o metodo signIn() via AuthProvider
  return (
    <AuthContext.Provider value={{ name: 'Ian', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
