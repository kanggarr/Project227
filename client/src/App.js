import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Orders from './pages/user/Orders';
import Upload from './pages/user/Upload';
function App() {
  const auth = JSON.parse(localStorage.getItem('auth'))
  // const role = auth.user.role
  // console.log(typeof auth.user.role)
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/product/:slug' element={<ProductDetails/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/category/:slug' element={<CategoryProduct/>} />
        <Route path='/search' element={<Search/>} />

        <Route path='/dashboard/user' element={<Dashboard/>} />
        <Route path='/dashboard/user/orders' element={<Orders/>} />
        <Route path='/dashboard/user/profile' element={<Profile/>} />
        <Route path='/dashboard/user/upload' element={<Upload/>} />


        <Route path='/dashboard/admin' element={<AdminDashboard />} />
        <Route path='/dashboard/admin/create-category' element={<CreateCategory/>} />
        <Route path='/dashboard/admin/create-product' element={<CreateProduct />} />
        <Route path='/dashboard/admin/products/:slug' element={<UpdateProduct />} />
        <Route path='/dashboard/admin/products' element={<Products />} />
        <Route path='/dashboard/admin/users' element={<Users />} />

        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
