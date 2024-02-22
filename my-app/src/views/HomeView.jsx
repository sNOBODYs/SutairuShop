import React from 'react';
import NavBar from '../components/NavBar.jsx';
import '../styles/HomeViewStyle.css';

export default function HomeView(html, login, mensKimonoJacket, mensKimono, mensHoodie, mensShirts, geta, womenKimono, womenDress, womenPajams, accessoriesMask, accessoriesUmbrella, accessoriesFan, accessoriesBelt, decorWallArt, decorStationery, decorNoren, decorNeko) {
    return (
        <div>
            <NavBar />
            <video id="backgroundVideo" autoPlay loop muted playsInline></video>
            <div className="content-above-video">
                <h1>Japanese Clothes</h1>
                <h3><i className="fa fa-play" style={{ color: '#000000' }}></i>Authentic & Traditional</h3>
            </div>
        </div>
    )
}