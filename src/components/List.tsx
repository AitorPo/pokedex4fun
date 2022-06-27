import React from "react";
import { IMAGE_URL } from "../api/CONSTANTS";
import Pokemon from "../models/Pokemon";
import Card from "./Card";


function List(_props:any){
    const filteredData = _props.list.filter((el: Pokemon) => {
        if (_props.search === ''){
            return el;
        }

        return el.name.toLowerCase().includes(_props.search)
    });
    return (
        filteredData.map((pokemon: Pokemon) => {
            let id = pokemon.url.split('/')[pokemon.url.split('/').length-2]
            return (
                <Card 
                key={pokemon.name}
                id={id}
                name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                image={`${IMAGE_URL}${id}.png`}
                />
            );
        })
    )
}


export default List;