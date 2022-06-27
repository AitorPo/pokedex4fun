import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BASE_URL, ALL_GENS_POKEMON_ENDPOINT } from '../api/CONSTANTS'
import Pokemon from '../models/Pokemon'
import Navbar from './Navbar';
import Splash from './Splash';

function Home(){
    const [list, setList] = useState<Pokemon[]>([]);
    const [isBusy, setIsBusy] = useState(true)
    
    function setWithExpiry(key:string, value:any, ttl:number) {
        const now = new Date()

        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        }
        localStorage.setItem(key, JSON.stringify(item))
    }

    function getWithExpiry(key:string) {
        const itemStr = localStorage.getItem(key)

        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }

        const item = JSON.parse(itemStr)
        const now = new Date()

        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listResponse = await axios.get(BASE_URL+ALL_GENS_POKEMON_ENDPOINT+"?limit=10000");
                setList(listResponse.data.results);
                if(getWithExpiry("splash") !== null){
                    setIsBusy(false);
                } else {
                    setTimeout(() => {
                        setWithExpiry("splash", "splash", 24*60*10);
                        setIsBusy(false);
                    }, 8200)
                }
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