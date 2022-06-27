import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BASE_URL, ALL_GENS_POKEMON_ENDPOINT, POKEMON_DETAIL_URL, IMAGE_URL } from '../api/CONSTANTS'
import Pokemon from '../models/Pokemon'
import Navbar from './Navbar';

function Home(){
    const [list, setList] = useState<Pokemon[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const listResponse = await axios.get(BASE_URL+ALL_GENS_POKEMON_ENDPOINT+"?limit=10");
                setList(listResponse.data.results);
            } catch (err) {
                console.error(err);
            };
        };
        fetchData();
    }, []);
    
    return (
        <Fragment>
            <Navbar list={list}/>
        </Fragment>
    );
}

export default Home;