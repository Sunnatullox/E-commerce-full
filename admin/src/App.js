import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "./Redux/Action/ProductActions";
import { ordersList } from "./Redux/Action/OrderAction";
import EditeCategory from "./components/Categories/EditeCategory";
import BrandsScreen from "./screens/BrandsScreen";
import EditeBrand from "./components/Brands/EditeBrand";

function App() {
const dispatch = useDispatch()

const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin

useEffect(() => {
  if (userInfo && userInfo.isAdmin) {
    dispatch(productsList())
    dispatch(ordersList())
  }
}, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/categorys" component={CategoriesScreen} />
          <PrivateRouter path="/brands" component={BrandsScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/category/:id/edit" component={EditeCategory} />
          <PrivateRouter path="/brand/:id/edit" component={EditeBrand} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
