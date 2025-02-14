import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/homePage';
import HomeAdmin from './pages/adminPage/index.jsx';
import SignIn from "./pages/loginPage/index.jsx";
import Register from "./pages/registerPage/index.jsx";
import Shop from "./pages/shopPage/index.jsx";
import Services from "./pages/servicesPage/index.jsx";
import Tasting from "./pages/tastingsPage/index.jsx";
import Events from "./pages/eventsPage/index.jsx";
import CheckoutPage from "./pages/checkoutPage/checkout.jsx";
import VerificationOtp from "./pages/verificationOtp/index.jsx";
import Preorder from "./pages/preorderPage/preorder.jsx";
import List from "./pages/listPreordersPage/list.jsx";
import Favourites from "./pages/favouritesPage/favourites.jsx";
import Profile from "./pages/profilePage/profile.jsx";
import SendOrder from "./pages/sendOrderPage/sendo.jsx";
import SendPreorder from "./pages/sendPreorderPage/sendPO.jsx";
import Products from "./pages/productsAdminPage/productsAdmin.jsx";
import StockProducts from "./pages/stockProductsAdminPage/stockProducts.jsx";
import OrdersAdmin from "./pages/ordersAdminPage/ordersAdmin.jsx";
import PreordersAdmin from "./pages/preordersAdminPage/preordersAdmin.jsx";
import RequestAdmin from "./pages/tastingRequestAdmin/requestAdmin.jsx";
import ApplicationDocumentation from './pages/documentation/ApplicationDocumentation';

const App = () => {
    return (
        <Router>
            <Routes>

                {/*<Route path='/PatientMainPage' element={<PatientRoute><PatientMainPage/></PatientRoute>}/><Route path='/PatientMainPage' element={<PatientRoute><PatientMainPage/></PatientRoute>}/>*/}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/services" element={<Services />} />
                <Route path="/tastings" element={<Tasting />} />
                <Route path="/events" element={<Events />} />
                <Route path="/cart" element={<CheckoutPage />} />
                <Route path="/verify-otp" element={<VerificationOtp />} />
                <Route path="/command" element={<Preorder />} />
                <Route path="/list" element={<List />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sendOrder" element={<SendOrder />} />
                <Route path="/sendPreorder" element={<SendPreorder />} />
                <Route path="/admin" element={<OrdersAdmin />} />
                <Route path="/productsAdmin" element={<Products/>} />
                <Route path="/stockProducts" element={<StockProducts/>} />
                <Route path="/ordersAdmin" element={<OrdersAdmin/>} />
                <Route path="/preordersAdmin" element={<PreordersAdmin/>} />
                <Route path="/tastingsAdmin" element={<RequestAdmin/>} />
                <Route path="/documentation" element={<ApplicationDocumentation/>} />


            </Routes>
        </Router>
    );
};

export default App;
