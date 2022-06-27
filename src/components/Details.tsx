import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';


function Detail(_props: any){
    const { pokemonName } = useParams()
    const location = useLocation()
    const locationState:any = location.state

    const [image, setImage] = useState()

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
            } catch (err) {
                console.error(err);
            }
        }
        fetchImage()
    }, []);

    return (
        <div>
            <p>{pokemonName}</p>
            <img className="detail-img" src={`${image}`} />
        </div>
    )
}

export default Detail;