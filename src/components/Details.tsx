import React, { CSSProperties, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import { POKEMON_DETAIL_URL } from '../api/CONSTANTS';
import Pokemon from '../models/Pokemon';


function Detail(_props: any){
    const { pokemonName } = useParams()
    const location = useLocation()
    const locationState:any = location.state
    const [image, setImage] = useState()
    const [pokemon, setPokemon] = useState<Pokemon|any|undefined>()
    const [isBusy, setIsBusy] = useState(true)

    const override: CSSProperties = {
        display: "block",
        borderColor: "red",
        position: "absolute",
        top: "35%",
        left: "45%",
        borderRadius: "4rem"
      };

    

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(`${locationState.pokemonImage}`, {responseType:'blob'});
                const reader = new FileReader()
                reader.readAsDataURL(res.data)
                reader.onloadend = () => {
                    const base64data:any = reader.result;
                    setImage(base64data)
                }
                const resp = await axios.get(`${POKEMON_DETAIL_URL}${pokemonName}`);
                console.log(resp.data);
                setPokemon(resp.data);
                setIsBusy(false)
            } catch (err) {
                console.error(err);
            }
        }
        fetchImage()
    }, []);

    console.log(pokemon)
    return isBusy ? <Spinner color={"red"} override={override} size={200} /> : (
        <>
            
        <div className='detail'>
            
        <div className='detail-info'>
            <p className='pkmn-name'>{pokemon.name}</p>
            <div className='detail-img-container'>
                <img className="detail-img" src={`${image}`} />
            </div>
            <div className='basic-info'>
                <small>Base experience<br/><p>{pokemon.base_experience}</p></small>
                <small>Height<br/><p>{pokemon.height}</p></small>
                <small>Weight <br/><p>{pokemon.weight}</p></small>
            </div>
                <div className='detail-types'>
                    {
                        pokemon.types.map((type:any)=> {
                            return (
                                type.slot == 1 ?
                                    <p className='type'>{type.type.name}</p>
                                    : (<p className='second-type'><small>{type.type.name}</small></p> )
                                )
                        })
                    }
                </div>
                <div className='detail-abilities'>
                {
                    pokemon.abilities.map((ability:any) => {
                        return (
                            <div className='ability'>
                                <p>{ability.ability.name}</p>
                                <p className='hidden-ability'>{ability.is_hidden ? <small>Hidden</small> : ""}</p>
                            </div>
                            )
                    })
                }
                </div>
                <div className='detail-stats'>
                {
                    pokemon.stats.map((stat:any) => {
                        return (
                        <div className='stat'>
                            <p>{stat.stat.name}</p>
                            <div className="status-bar" style={{width:`${stat.base_stat}%`}}></div>
                            <p className='stat-value'>{stat.base_stat}</p>
                        </div>)
                    })
                }
                </div>
            </div>
        </div>
        </>
    )
}

export default Detail;