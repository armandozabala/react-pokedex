import React, {useState} from 'react'
import {  useSelector, useDispatch } from 'react-redux';
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDucks';

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user);
    const loading = useSelector(store => store.usuario.loading);
    
    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName);
    const [activarFormulario, setActivarFormulario] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const actualizarUsuario = () => {
            
         if(!nombreUsuario.trim()){
             console.log('nombre vacio');
             return;
         }

         dispatch(actualizarUsuarioAccion(nombreUsuario));
         setActivarFormulario(false);
        
    }

    const seleccionarArchivo = (imagen) => {
       
        console.log(imagen.target.files[0]);

        const img = imagen.target.files[0];

        if(img === undefined ){
            console.log(' no selecciono ');
            return
        }

        if(img.type === 'image/png' || img.type === 'image/jpeg' ){
            dispatch(editarFotoAccion(img));
            setError(false);
        }{
            setError(true);
        }
    }

    return (
        <div className="mt-5 text-center">
           <div className="card">
               <div className="card-body">
                    <img src={usuario.photoURL} alt="" className="img-fluid avatar mb-2"/>
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button className="btn btn-dark"
                            onClick={()=>setActivarFormulario(true)}
                        >
                        Editar Nombre
                    </button>
                    {
                        error && (
                            <div className="alert alert-warning mt-3">
                                 Solo archivo .png o .jpg
                            </div>
                        )
                    }
                    <div className="custom-file">
                        <input type="file"
                               className="custom-file-input"
                               id="input2"
                               style={{display: 'none'}}
                               onChange={e=> seleccionarArchivo(e)}
                               disabled = { loading }
                        />
                        <label className={ loading ? 'btn btn-dark mt-2 disabled' : 'btn btn-dark mt-2'}
                               htmlFor="input2"   
                        >
                            Actualizar Imagen
                        </label >
                    </div>

                    {
                         loading && (
                             <div className="card-body">

                                <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </div>

                             </div>
                         )
                    }

                    {
                        activarFormulario && (      
                            <div className="card-body">
                            <div className="row justify-center">
                                <div className="col-md-5">
                                    <div className="input-group m-3">
                                        <input 
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre"
                                                value={nombreUsuario}
                                                onChange={ e => setNombreUsuario(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-dark"
                                                    type="button"
                                                    onClick={()=>actualizarUsuario()}>
                                                    Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }

              
               </div>
           </div>
        </div>
    )
}

export default Perfil
