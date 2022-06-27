import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BASE_URL, ALL_GENS_POKEMON_ENDPOINT } from '../api/CONSTANTS'
import Pokemon from '../models/Pokemon'
import Navbar from './Navbar';
import Splash from './Splash';

function Home(){
    const [list, setList] = useState<Pokemon[]>([]);
    const [isBusy, setIsBusy] = useState(true)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const listResponse = await axios.get(BASE_URL+ALL_GENS_POKEMON_ENDPOINT+"?limit=10000");
                setList(listResponse.data.results);
                setTimeout(() => {
                    setIsBusy(false);
                }, 8200)
                
            } catch (err) {
                console.error(err);
            };
        };
        fetchData();
    }, []);
    
    return isBusy ? <Splash/> :(
        <Fragment>
            <Navbar list={list}/>
        </Fragment>
    );
}

export default Home;