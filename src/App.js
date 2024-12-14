import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import SpecificRestaurant from "./components/SpecificRestaurant";
import PaymentsSuccessful from "./components/PaymentsSuccessful";
import Cart from "./components/Cart";
import "./App.css";

const App = () => (
  <Routes>
    <Route exact path="/login" Component={Login} />
    <Route exact path="/" Component={Home} />
    <Route exact path="/restaurant/:id" Component={SpecificRestaurant} />
    <Route exact path="/cart" Component={Cart} />
    <Route exact path="/paid" Component={PaymentsSuccessful} />
    <Route exact path="/not-found" Component={NotFound} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
