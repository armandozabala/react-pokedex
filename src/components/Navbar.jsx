import React from 'react'
import { Link, NavLink } from 'react-router-dom';

import { cerrarSesionAccion } from '../redux/usuarioDucks'
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const Navbar = (props) => {

    const dispatch = useDispatch();

    const activo = useSelector(store => store.usuario.activo);


    const cerrarSesion = () => {

        dispatch(cerrarSesionAccion());
        props.history.push('/login');

    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">App Poke</Link> 

            <div className="d-flex">
                {
                    activo ? (
                        <>
                        <NavLink className="btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                        <button onClick={()=>cerrarSesion()} className="btn btn-dark">Cerrar Sesión</button>
                        </>
                    ) : (
                        <NavLink className="btn btn-dark mr-2" to="/login" >Login</NavLink>
                    )
                }
 
            </div>
        </div>
    )
}

export default withRouter(Navbar)
