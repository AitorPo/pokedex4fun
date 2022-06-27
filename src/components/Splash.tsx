import React, { useState, useEffect } from "react";


function Splash(_props:any){

    function setCookie(cname:string, cvalue:any, exseconds:number) {
        const d = new Date();
        d.setTime(d.getTime() + (exseconds * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

      useEffect(() => {
        setCookie("splash", _props.cookie, 60)
      })
    return (
        <>
        <div className="splash">
            <div className="content">
                <h2 className="frame-1">From a Freak to Freaks...</h2>
                <h2 className="frame-2">Catch'em all!</h2>
                <h2 className="frame-3">Now!</h2>
            </div>
        </div>
        </>
    )
}

export default Splash;