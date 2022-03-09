import './App.css';
import Header from './Components/Header';
import SimpleBottomNavigation from './Components/Main_Nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from '@material-ui/core';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';

function App() {
  return (
    <Router>
        <div className="App">
     <Header/> 
     <Container>
       <Routes>
         <Route path='/' element={<Trending/>} exact/>
         <Route path='/movies' element={<Movies/>}/>
         <Route path='/series' element={<Series/>}/>
         <Route path='/search' element={<Search/>}/>
       </Routes>
     </Container>
     <SimpleBottomNavigation/>    
    </div>
    </Router>

  );
}

export default App;
