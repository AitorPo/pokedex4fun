import React, { Fragment, useState } from 'react';
import List from './List';
import pokeball from '../pokeball.svg'


function Navbar(_props:any){
    const [inputText, setInputText] = useState("");

    let inputHandler = (e:any) => {
        var search = e.target.value.toLowerCase();
        setInputText(search)
    }

    return(
        <Fragment>
            <div className='navbar'>
                <a className="active" href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                <div className="searchBox">

                <input onChange={inputHandler} className="searchInput" type="text" name="" placeholder="Search"/>
                <button className="searchButton">
                    <img className="pokeball" src={pokeball}/>
            </button>
        </div>
            </div>
            
            <div className='container'>
                <List list={_props.list}
                      search={inputText}/>
            </div>
        </Fragment>
    )
}


export default Navbar;