import React from "react"
import Card from 'react-bootstrap/Card';
import '../Style/BookCard.css'
import UpdateBook from "../Pages/Manage/updateBook";

const manageBookCard=(props)=>{
    return (
        <Card className="bookCard">
          <Card.Img className="bookImage" variant="top" src={props.image} />
          <Card.Body>
            <Card.Title className="bookTitle">{props.Title}</Card.Title>
            <Card.Text className="infoText">by {props.Author}</Card.Text>
            <Card.Text className="infoText">Rack number: {props.RackNumber}</Card.Text>
            <Card.Text className="infoText" style={{marginBottom:'10px'}}>ISBN: {props.ISBN}</Card.Text>
            <div style={{textAlign:'center'}}>
            <button 
            className="btn actionButton deleteButton btn-light"
            onClick={()=>props.deleteBook(props.id)}>Delete</button>
            <UpdateBook
            id={props.id}/>
            </div>
          </Card.Body>
        </Card>
      );
}

export default manageBookCard;