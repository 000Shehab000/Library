//import './Style/App.css';
import { Outlet } from 'react-router-dom';
import Footer from './Shared/Footer';
import Header from './Shared/Header';


function App() {
  return (
   <>
      <Header/>
      <Outlet/>
      <Footer/>
   </> 
  );
}

export default App;
