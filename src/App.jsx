import React, {useEffect, useState} from 'react';
import Pokemones from './components/Pokemones';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import { auth } from './firebase';
import Perfil from './components/Perfil';

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false);
  
  useEffect(()=>{
    
      const fetchUser = ()  => {
         auth.onAuthStateChanged(user => {
             if(user){
                 setFirebaseUser(user);
             }else{
                 setFirebaseUser(null);
             }
         })
      }
      fetchUser();

  },[])

  const RutaPrivada = ({componente, path, ...rest}) => {

      if(localStorage.getItem('usuario')){
        const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));
        if(usuarioStorage.uid === firebaseUser.uid){
          console.log('son iguales')
          return <Route component={componente} path={path} {...rest}/>
        }else{
          return <Redirect to='/login' {...rest} />
        }
      }else{
         return <Redirect to='/login' {...rest} />
      }
  }

  return firebaseUser !== false ? (
      <Router>
          <div className="container mt-5">

            <Navbar/>

            <Switch>
                <RutaPrivada component={Pokemones} path='/' exact />
                <RutaPrivada component={Perfil} path='/perfil' exact />
                <Route component={Login} path='/login' exact />
            </Switch>
          </div>
      </Router>    
  ):  (<div>Cargando...</div>)
}

export default App;
