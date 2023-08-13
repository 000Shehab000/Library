import Card from 'react-bootstrap/Card';
import '../Style/ManageCard.css'
import '../Style/Manage.css'
const BorrowingCard =(props)=> {
  return (
    <Card className="manageCard">
      <Card.Body>
        <Card.Title className='cardUserName'>{props.user_name}</Card.Title>
        <Card.Text style={{color:"rgb(175, 42, 42)"}} className='cardText'>
          Asks to borrow 
        </Card.Text>
        <Card.Title className='cardBookName'>{props.book_name}</Card.Title>
        <div className='buttons'>
        <button 
        className="btn actionButton ApproveButton btn-light"
        onClick={()=>props.acceptRequest(props.id,props.book_id)}
        >Accept</button>
        <button 
        className="btn actionButton rejectButton btn-light"
        onClick={()=>props.rejectRequest(props.id)}
        >Reject</button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BorrowingCard;