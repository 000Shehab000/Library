import React from "react"
import Card from 'react-bootstrap/Card';
import '../Style/BookCard.css'
import UpdateBook from "../Pages/Manage/updateBook";

const borrowedBookCard=(props)=>{
    return (
        <Card className="bookCard">
          <Card.Img className="bookImage" variant="top" src={props.image} />
          <Card.Body>
            <Card.Title className="bookTitle">{props.name}</Card.Title>
            <Card.Text className="infoText">by {props.author_name}</Card.Text>
            <Card.Text className="infoText">Rack number:{props.rack_number}</Card.Text>
            <Card.Text className="infoText" style={{marginBottom:'10px'}}>ISBN:{props.isbn}</Card.Text>
          </Card.Body>
        </Card>
      );
}

export default borrowedBookCard;