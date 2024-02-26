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
    <div className="close-arrow-men"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/mens-kimono'>Japanese Kimono</a></li>
    <li><a href='/mens-kimono-jackets'>Japanese Kimono Jacket</a></li>
    <li><a href='/mens-hoodie'>Japanese Hoodie</a></li>
    <li><a href='/mens-shirts'>Japanese Shirt</a></li>
    <li><a href='/geta'>Japanese Geta</a></li>
    </ul>
</div>
<div className ="menu1-bar-women">
<div className="close-arrow-women"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/women-kimono'>Japanese Kimono</a></li>
    <li><a href='/women-dress'>Japanese Dress</a></li>
    <li><a href='/women-pajamas'>Japanese Pajamas</a></li>
    </ul>
</div>
<div className ="menu1-bar-accessories">
<div className="close-arrow-accessories"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/accessories-masks'>Japanese Mask</a></li>
    <li><a href='/accessories-umbrella'>Japanese Umbrella</a></li>
    <li><a href='/accessories-fan'>Japanese Fan</a></li>
    <li><a href='/accessories-obi-belt'>Obi Belt</a></li>
    </ul>
</div>
<div className ="menu1-bar-decor">
<div className="close-arrow-decor"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/decor-wall-art'>Japanese Wall Art</a></li>
    <li><a href='/decor-stationery'>Japanse Stationery</a></li>
    <li><a href='/decor-noren'>Japanese Noren</a></li>
    <li><a href='/decor-neko'>Maneki Neko</a></li>
    </ul>
</div>
</>
)
}
const menuIcon = document.querySelector(".menu-icon")
const menClick = document.querySelector(".click-men")
const womenClick = document.querySelector(".click-women")
const accessoriesClick = document.querySelector(".click-accessories")
const decorClick = document.querySelector(".click-decor")
const closeArrowMen = document.querySelector(".close-arrow-men")
const closeArrowWomen = document.querySelector(".close-arrow-women")
const closeArrowAccessories = document.querySelector(".close-arrow-accessories")
const closeArrowDecor = document.querySelector(".close-arrow-decor")

const navLinks = document.querySelector(".menu1-bar")
const navLinksMen = document.querySelector(".menu1-bar-men")
const navLinksWomen = document.querySelector(".menu1-bar-women")
const navLinksAccessories = document.querySelector(".menu1-bar-accessories")
const navLinksDecor = document.querySelector(".menu1-bar-decor")

menuIcon.addEventListener('click', ()=>{
    navLinks.classList.toggle('mobile-menu')
})
menClick.addEventListener('click', ()=>{
  navLinksMen.classList.toggle('mobile-menu')
})
womenClick.addEventListener('click', ()=>{
  navLinksWomen.classList.toggle('mobile-menu')
})
accessoriesClick.addEventListener('click', ()=>{
  navLinksAccessories.classList.toggle('mobile-menu')
})
decorClick.addEventListener('click', ()=>{
  navLinksDecor.classList.toggle('mobile-menu')
})
closeArrowMen.addEventListener('click', ()=>{
  navLinksMen.classList.toggle('mobile-menu')
})
closeArrowWomen.addEventListener('click', ()=>{
  navLinksWomen.classList.toggle('mobile-menu')
})
closeArrowAccessories.addEventListener('click', ()=>{
  navLinksAccessories.classList.toggle('mobile-menu')
})
closeArrowDecor.addEventListener('click', ()=>{
  navLinksDecor.classList.toggle('mobile-menu')
})
export default MobileMenu;