import React, { CSSProperties, useState } from "react";
import { ClipLoader } from "react-spinners";
import { IMAGE_URL } from "../api/CONSTANTS";
import Pokemon from "../models/Pokemon";
import Card from "./Card";
import Spinner from "./Spinner";


function List(_props:any){
    let filteredData:any = []

    const override: CSSProperties = {
        display: "block",
        borderColor: "red",
        position: "absolute",
        top: "35%",
        left: "45%",
        borderRadius: "4rem"
      };

    const [isBusy, setIsBusy] = useState(true);

    if(_props.search === ''){
        filteredData = _props.currentItems.filter((el: any) => {
            setTimeout(() => {
                setIsBusy(false);
            }, 3003);
            return el;
        });
    } else{
        filteredData = _props.list.filter((el:any) => {
            return el.name.toLowerCase().includes(_props.search)
        });
    }

    return isBusy ? <Spinner color={"red"} override={override} size={200} />
     : (
        filteredData.map((pokemon: any) => {
            let id = pokemon.url.split('/')[pokemon.url.split('/').length-2]
            return (
                <Card 
                key={pokemon.name}
                id={id}
                name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                queryName={pokemon.name}
                image={`${IMAGE_URL}${id}.png`}
                />
            );
        })
    )
}

export default List;