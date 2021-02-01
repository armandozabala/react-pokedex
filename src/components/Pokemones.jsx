import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAcciones, siguientePokemonAccion, anteriorPokemonAccion, unPokeDetalleAccion } from '../redux/pokeDucks';
import Detalle from './Detalle';

const Pokemones = () => {

    const dispatch = useDispatch();
    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next );
    const previous = useSelector(store => store.pokemones.previous);

    return (
        <div className="row mt-5">

            <div className="col-md-6">
                <h3>Lista de Pokemones</h3>

                <ul className="list-group mt-4">
                {
                        pokemones.map(item => (
                            <li className="list-group-item text-uppercase" key={item.name}> {item.name} 
                                <button className="btn btn-dark btn-sm float-right"
                                        onClick={()=> dispatch(unPokeDetalleAccion(item.url))}>
                                    Info
                                </button>
                            </li>
                        ))
                }
                </ul>
        
                <div className="d-flex justify-content-between mt-4">
                {
                    pokemones.length == 0 &&  <button className="btn btn-dark" onClick={()=>dispatch(obtenerPokemonesAcciones())}>Get Pokemones</button>
                }

                {
                    next &&  <button className="btn btn-dark" onClick={()=>dispatch(siguientePokemonAccion())}>Siguiente</button>
                }
            
                {
                    previous && <button className="btn btn-dark" onClick={()=>dispatch(anteriorPokemonAccion())}>Anterior</button>
                }
                </div>
           
                
       

            </div>
            
            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
               <Detalle/>
            </div>

           
        </div>
    )
}

export default Pokemones
