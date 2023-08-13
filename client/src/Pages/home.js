import React, { useEffect, useState, } from "react";
import BookCard from "../Components/bookCard"
import "../Style/Home.css"
import axios from 'axios';
const Home= ()=>{
    const [books ,setBooks]=useState({
        loading : true , // loader until it finish
        results: [],     // list of books from back_end
        err: null,
        reload : 0
      });
    
      useEffect(() => {
        setBooks({...books, loading :true});
        axios.get("http://localhost:4000/books")
        .then((res) => {
          setBooks({...books,results: res.data,loading :false, err:null});
        })
        .catch((error)=>{
          setBooks({...books,loading :false,err:"somthing went wrong"})
        })
      },[])
    return(
        <div className="row booksHomeList">
            {books.results.map((book)=>(
                <div className="col-3 book" key={book.id}>
                <BookCard
                    Title={book.name} 
                    Author={book.author_name} 
                    RackNumber={book.rack_number}
                    image= {book.image_url}
                    id={book.id}
                />
                </div>
            ))}
        </div>
    )
}

export default Home;