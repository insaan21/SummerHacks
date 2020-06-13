import React, { useEffect, useState } from 'react';
import Comment from './Comment';

function App(){
  
const[comments, setComments] = useState([]);
const[nameValue, setNameValue] = useState("");
const[commentValue, setCommentValue] = useState("");

  //useEffect(() => {
    //getComments();
   // console.log("something")
  //});

  const getComments = () => {
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://localhost:5000/get/all');
    //console.log("hello");
    request2.onload = async function(){
    const data = await JSON.parse(request2.response);
    setComments(data);
    //console.log(data);
    }
    request2.send();
}
  const updateName = e => {
    setNameValue(e.target.value);
  }
  const updateComment = e => {
    setCommentValue(e.target.value);
  }
  const sendComment = () => {
    var addComment  = {
      "name" : nameValue,
      "comment" : commentValue
    }
    var request1 = new XMLHttpRequest();
    request1.open("POST", "http://localhost:5000/add");
    request1.setRequestHeader('Content-Type', 'application/json');
    request1.send(JSON.stringify(addComment));
    getComments();
  }

  
  return(
   <div>
     {getComments()}
    <p>
    Name : <input type = "text" value = {nameValue} onChange = {updateName}></input>
    <br/>
    Commment: <input type = "text" value = {commentValue} onChange = {updateComment}></input>
    <br/>
    <button onClick = {sendComment}> Save Line</button>
    </p> 
    {comments.map(comment => (
      <Comment name = {comment.name} comment = {comment.comment} />
    ))}
   </div>
  );
}


export default App;