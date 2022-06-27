import React, {useState, useEffect, CSSProperties} from "react";
import {
    Link
  } from "react-router-dom";
import axios from 'axios';
import Spinner from "./Spinner";



function Card(_props: any){
    const [image, setImage] = useState()
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
                const res = await axios.get(`${_props.image}`, {responseType:'blob'});
                const reader = new FileReader()
                reader.readAsDataURL(res.data)
                reader.onloadend = () => {
                    const base64data:any = reader.result;
                    setImage(base64data)
                    setIsBusy(false)
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchImage()
    }, []);

    return isBusy ? <Spinner color={"red"} override={override} size={200} /> : 
    (<div className="pkmn-card">
        <img className="card-img" src={`${image}`} />
        <Link style={{textDecoration: 'none'}} to={`/pokemon/${_props.queryName}`} state={{ pokemonName: `${_props.queryName}`, pokemonImage: `${_props.image}` }}>
            <p className="card-text">{_props.name}</p>
        </Link>
    </div>
    )
}

export default Card