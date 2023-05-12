import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./components/Routes/AdminRoute";
import PrivateRoute from "./components/Routes/Private";
import About from "./pages/About";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/Productdetails/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/Categoryproduct/CategoryProduct";
import CartPage from "./pages/Cartpage/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct/>} />
            <Route path="admin/products" element={<Products/>} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="/" element={<Home />}/>
          <Route path="/product/:slug" element={<ProductDetails />}/>
          <Route path="/categories" element={<Categories />}/>
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/category/:slug" element={<CategoryProduct />}/>
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
