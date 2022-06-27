import React from "react";

function Footer(){
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    return (
       <div className="center mt-2" id="footer">
        <strong><small>Developed by Aitor Poquet &copy; {date}</small></strong>
       </div>
    )
}

export default Footer;