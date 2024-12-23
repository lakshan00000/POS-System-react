import './App.css'


import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Category from './pages/Category'
import Product from './pages/Product'
import Orders from './pages/Order'
import CreateOrder from './pages/CreateOrder'

function App() {

  return(
     //<Route path="/order" element={<Order />} />
    <BrowserRouter>
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Category" element={<Category />}/>
       <Route path="/Product" element={<Product />} />
       <Route path="/Orders" element={<Orders />} />
       <Route path="/Order/Create" element={<CreateOrder />} />
       </Routes>

    </BrowserRouter>


  )
 
}

export default App
