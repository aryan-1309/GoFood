import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup.js';
import Cart from './screens/Cart.js';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import {Provider} from 'react-redux'
import appStore from './utils/appStore.js';

function App() {
  return (
    <Provider store={appStore}>
    <Router> 
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
