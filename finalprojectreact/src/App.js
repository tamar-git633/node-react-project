import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Login from "./features/auth/Login"
import Register from "./features/auth/Register";
import AddProduct from "./features/product/AddProduct"
import DeleteProduct from "./features/product/DeleteProduct";
import UpdateProduct from "./features/product/UpdateProduct";
import SeeAll from "./features/product/SeeAll"
import LayOut from "./LayOut";
import Basket from "./features/basket/Basket";
import Order from "./features/basket/Order";
import SignUp from "./features/player/SignUp";
import Game from "./features/player/Game"
import Actor from "./features/actor/Actor";
import Rishum from "./features/actor/Rishum";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut></LayOut>}>
            <Route path="login" element={<Login></Login>} />
            <Route path="register" element={<Register></Register>} />
            <Route path="addproduct" element={<AddProduct></AddProduct>} />
            <Route path="deleteproduct" element={<DeleteProduct></DeleteProduct>} />
            <Route path="updateproduct/:barcode" element={<UpdateProduct></UpdateProduct>} />
            <Route path="seeall/:category" element={<SeeAll></SeeAll>} />
            <Route path="seeall" element={<SeeAll></SeeAll>} />
            <Route path="/basket" element={<Basket></Basket>} />
            <Route path="/order" element={<Order></Order>} />

            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route path="/game" element={<Game></Game>} />
            <Route path="/actor" element={<Actor></Actor>} />
            <Route path="/rishum" element={<Rishum></Rishum>} />
            {/* <Route path="/email" element={<Rishum></Rishum>} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
