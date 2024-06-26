import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';

//-------------Importing Pages-------------------
import HomeView from './views/HomeView';
import NoPageView from './views/NoPage';
import MensKimonoJackets from './views/MenPages/Mens_Kimono_JacketsView';
import MensKimono from './views/MenPages/Mens_KimonoView';
import MensHoodie from './views/MenPages/Mens_HoodieView';
import MensShirts from './views/MenPages/Mens_ShirtsView';
import Geta from './views/MenPages/GetaView';
import WomenDress from './views/WomenPages/Women_DressView';
import WomenKimono from './views/WomenPages/Women_KimonoView';
import WomenPajamas from './views/WomenPages/Women_PajamasView';
import AccessoriesBelt from './views/AccessoriesPages/Accessories_BeltView';
import AccessoriesFan from './views/AccessoriesPages/Accessories_FanView';
import AccessoriesMask from './views/AccessoriesPages/Accessories_MaskView';
import AccessoriesUmbrella from './views/AccessoriesPages/Accessories_UmbrellaView';
import DecorNeko from './views/DecorPages/Decor_NekoView';
import DecorNoren from './views/DecorPages/Decor_NorenView';
import DecorStationery from './views/DecorPages/Decor_StationeryView';
import DecorWallArt from './views/DecorPages/Decor_WallArt';
import SignUp from './views/authentication/Signup';
import Login from './views/authentication/Login';
import MobileMenu from './components/MobileMenu';
import NavBar from './components/NavBar';
import AccountView from './views/AccountView';
import PrivateRoutes from './views/PrivateRoutes';
import LoggedUserRoutes from './views/LoggedUserRoutes.jsx';
import ForgotPass from './views/authentication/ForgotPass';
import PassResetConfirm from './views/authentication/ConfirmPassReset.jsx';
import UpdateProfile from './views/authentication/UpdateProfile';
import { PersistGate } from 'redux-persist/integration/react';
import ProductDetails from './components/productComponents/ProductDetails.jsx';
import ProductDetailsNoSize from './components/productComponents/ProductDetailsNoSize.jsx';
import CheckoutView from './views/CheckoutView.jsx';
import AdminView from './views/admin/AdminView.jsx';
import ProductDetailsEdit from './components/productComponents/ProductDetailsEdit.jsx';
import AddProductAdmin from './components/AddProductAdmin.jsx';
import AdminRoutes from './views/AdminRoutes.jsx'
import AboutUs from './views/AboutUs.jsx';
import ContactUs from './views/ContactUs.jsx';
//-----------------------------------------------

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <BrowserRouter>
            <NavBar />
            <MobileMenu />
            <Routes>
              <Route index element={<HomeView />} />
              <Route path="/about-us" element={<AboutUs/>} />
              <Route path="/contact-us" element={<ContactUs/>} />
              <Route element={<PrivateRoutes />}>
                <Route path="/account" element={<AccountView />} />
                <Route path="/update-profile/" element={<UpdateProfile />} />
              </Route>
              <Route path="/men/jackets" element={<MensKimonoJackets />} />
              <Route path="/men/kimono" element={<MensKimono />} />
              <Route path="/men/shirt" element={<MensShirts />} />
              <Route path="/men/hoodie" element={<MensHoodie />} />
              <Route path="/men/geta" element={<Geta />} />
              <Route path="/women/dress" element={<WomenDress />} />
              <Route path="/women/kimono" element={<WomenKimono />} />
              <Route path="/women/pijamas" element={<WomenPajamas />} />
              <Route path="/accessories/obibelts" element={<AccessoriesBelt />} />
              <Route path="/accessories/fans" element={<AccessoriesFan />} />
              <Route path="/accessories/masks" element={<AccessoriesMask />} />
              <Route path="/accessories/umbrellas" element={<AccessoriesUmbrella />} />
              <Route path="/decor/neko" element={<DecorNeko />} />
              <Route path="/decor/noren" element={<DecorNoren />} />
              <Route path="/decor/stationery" element={<DecorStationery />} />
              <Route path="/decor/wallart" element={<DecorWallArt />} />
              <Route path="/checkout/:cartID" element={<CheckoutView />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/products/ns/:productId" element={<ProductDetailsNoSize />} />
              <Route element={<AdminRoutes />}>
                <Route path="/dashboard/admin" element={<AdminView />} />
                <Route path="/dashboard/admin/edit-product/:productId" element={<ProductDetailsEdit />} />
                <Route path="/dashboard/admin/add-product" element={<AddProductAdmin />} />
              </Route>
              <Route element={<LoggedUserRoutes />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPass />} />
              <Route path="/reset-password-confirmation" element={<PassResetConfirm />} />
              </Route>
              <Route path="*" element={<NoPageView />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
