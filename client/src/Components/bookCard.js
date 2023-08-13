import React from "react"
import Card from 'react-bootstrap/Card';
import '../Style/BookCard.css'
import { Link } from "react-router-dom";

const bookCard=(props)=>{
    return (
        <Card className="bookCard">
          <Card.Img className="bookImage" variant="top" src={props.image} />
          <Card.Body>
            <Card.Title className="bookTitle">{props.Title}</Card.Title>
            <Link to={"/"+props.id}className="infoButton btn" >Book Info</Link>
          </Card.Body>
        </Card>
      );
}

export default bookCard;