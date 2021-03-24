
import './App.css';
import '../src/Login/Login.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import Home from '../src/Home/Home';


 

function App() {


  return (
    
      <Router>
        <Switch>
          <Route path='/' exact component={Welcome}/> 
          <Route path='/login'  component={Home}/> 
        </Switch>        
      </Router>           
    
  );
}

export default App;
