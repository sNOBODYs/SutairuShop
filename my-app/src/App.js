import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css';
import { store } from './redux/store.js';
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
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoutes from './views/PrivateRoutes';
import ForgotPass from './views/authentication/ForgotPass';
import UpdateProfile from './views/authentication/UpdateProfile';
//-----------------------------------------------

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <NavBar />
            <MobileMenu />
            <Routes>
              <Route index element={<HomeView />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPass />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/account" element={<AccountView />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
              </Route>
              <Route path="/men/kimono-jackets" element={<MensKimonoJackets />} />
              <Route path="/men/kimonos" element={<MensKimono />} />
              <Route path="/men/shirts" element={<MensShirts />} />
              <Route path="/men/hoodies" element={<MensHoodie />} />
              <Route path="/men/geta" element={<Geta />} />
              <Route path="/women/dresses" element={<WomenDress />} />
              <Route path="/women/kimonos" element={<WomenKimono />} />
              <Route path="/women/pajamas" element={<WomenPajamas />} />
              <Route path="/accessories/obi-belts" element={<AccessoriesBelt />} />
              <Route path="/accessories/fans" element={<AccessoriesFan />} />
              <Route path="/accessories/masks" element={<AccessoriesMask />} />
              <Route path="/accessories/umbrellas" element={<AccessoriesUmbrella />} />
              <Route path="/decor/neko" element={<DecorNeko />} />
              <Route path="/decor/noren" element={<DecorNoren />} />
              <Route path="/decor/stationery" element={<DecorStationery />} />
              <Route path="/decor/wall-art" element={<DecorWallArt />} />
              <Route path="*" element={<NoPageView />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
