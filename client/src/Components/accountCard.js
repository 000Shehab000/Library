import Card from 'react-bootstrap/Card';
import '../Style/ManageCard.css'
import '../Style/Manage.css'
const AccountCard =(props)=> {
  return (
    <Card className="manageCard">
      <Card.Body>
        <Card.Title className='cardUserName'>{props.name}</Card.Title>
        <Card.Text className='cardText'>
        {props.email}
        </Card.Text>
        <Card.Title className='cardBookName'>{props.phone}</Card.Title>
        <div className='buttons'>
        <button 
        className="btn actionButton ApproveButton btn-light"
        onClick={()=>props.approveAccount(props.id)}>Approve</button>
        <button 
        className="btn actionButton rejectButton btn-light"
        onClick={()=>props.deleteAccount(props.id)}>Reject</button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AccountCard;