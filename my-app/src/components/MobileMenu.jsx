import '../styles/MobileMenu.css'

function MobileMenu() {
return(
    <>
    <div className ="menu1-bar">
    <ul>
    <li><a className="click-men">Men</a></li>
    <li><a className="click-women">Women</a></li>
    <li><a className="click-accessories">Accessories</a></li>
    <li><a className="click-decor">Decor</a></li>
    <li><a className="click-men">Login/Register</a></li>
    </ul>
</div>
<div className ="menu1-bar-men">
    <div className="close-arrow-men"><i className="fa-solid fa-caret-left fa-2xl" style="color: #000000;"></i></div>
    <ul>
    <li><a >Japanese Kimono</a></li>
    <li><a >Japanese Kimono Jacket</a></li>
    <li><a >Japanese Hoodie</a></li>
    <li><a >Japanese Shirt</a></li>
    <li><a >Japanese Geta</a></li>
    </ul>
</div>
<div className ="menu1-bar-women">
<div className="close-arrow-women"><i className="fa-solid fa-caret-left fa-2xl" style="color: #000000;"></i></div>
    <ul>
    <li><a >Japanese Kimono</a></li>
    <li><a >Japanese Dress</a></li>
    <li><a >Japanese Pajamas</a></li>
    </ul>
</div>
<div className ="menu1-bar-accessories">
<div className="close-arrow-accessories"><i className="fa-solid fa-caret-left fa-2xl" style="color: #000000;"></i></div>
    <ul>
    <li><a >Japanese Mask</a></li>
    <li><a >Japanese Umbrella</a></li>
    <li><a >Japanese Fan</a></li>
    <li><a >Obi Belt</a></li>
    </ul>
</div>
<div className ="menu1-bar-decor">
<div className="close-arrow-decor"><i className="fa-solid fa-caret-left fa-2xl" style="color: #000000;"></i></div>
    <ul>
    <li><a >Japanese Wall Art</a></li>
    <li><a >Japanse Stationery</a></li>
    <li><a >Japanese Noren</a></li>
    <li><a >Maneki Neko</a></li>
    </ul>
</div>
</>
)
}
export default MobileMenu;