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
        <div className='detail'>
            <p>{pokemonName}</p>
            <div className='detail-img-container'>
                <img className="detail-img" src={`${image}`} />
            </div>
            <div className='detail-info'>
                <p>{pokemon.id}</p>
                <p>{pokemon.name}</p>
                <p>{pokemon.base_experience}</p>
                <p>{pokemon.height}</p>
                <p>{pokemon.weight}</p>
                {
                    pokemon.types.map((type:any)=> {
                        return (
                            <div className='detail-abilities'>
                                <p>{type.type.name}</p>
                            </div>)
                    })
                }
                {
                    pokemon.abilities.map((ability:any) => {
                        return (
                            <div className='detail-abilities'>
                                <p>{ability.ability.name}</p>
                                <p>{ability.is_hidden ? "True" : "False"}</p>
                            </div>)
                    })
                }
                {
                    pokemon.stats.map((stat:any) => {
                        return (
                        <div className='detail-stats'>
                            <p>{stat.stat.name}</p>
                            <p>{stat.base_stat}</p>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Detail;