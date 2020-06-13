import React from "react";
import "./App.css"
function Comment({name, comment}){
    return(
        <div className = "comment">
            <h1>{name}</h1>
            <p>{comment}</p>
        </div>
    );
}

export default Comment;