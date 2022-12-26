import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Detail from './components/Detail/Detail';
import Fun from './components/Fun/Fun';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import Admin from './components/Admin/Admin';
import AddBook from './components/Admin/AddBook';
import EditBook from './components/Admin/EditBook';
import Login from './components/Admin/Login';


function App() {
  // const navigation = useNavigate();
  return (
    <div style={{ backgroundColor: '#efefef' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Home /></>} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/fun' element={<Fun />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/admin' element={<Admin />}/>
          <Route path='/admin/login' element={<Login />}/>
          <Route path='/admin/add' element={<AddBook />}/>
          <Route path='/admin/edit/:id' element={<EditBook />}/>
              
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
