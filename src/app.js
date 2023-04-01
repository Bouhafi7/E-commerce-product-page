let menuIcon = document.querySelector('.menu-icon');
let menu = document.querySelector('.menu');
let menuItems = document.querySelectorAll('.menu li');
let overlay = document.querySelector('.overlay');

menuIcon.addEventListener('click', () => {
    overlay.classList.toggle('active');
    menuIcon.classList.toggle('active');
    menu.classList.toggle('active');
    menu.classList.contains('active') ? menuIcon.src = 'images/icon-close.svg' : menuIcon.src = 'images/icon-menu.svg';
});


menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuIcon.src = 'images/icon-menu.svg'
        overlay.classList.remove('active');
        menu.classList.remove('active');
        menuIcon.classList.remove('active');
    });
});

let cartIcon = document.querySelector('.cart-icon');
let cart = document.querySelector('.cart');
let addToCartBtn = document.querySelector('.add-to-cart');

cartIcon.addEventListener('click', () => {
    cart.classList.toggle('active');
});

window.addEventListener('click', (e) => {
    if (cart.contains(e.target) || e.target == cartIcon || e.target == addToCartBtn) {
        return true;
    } else {
        cart.classList.remove('active');
    }
});


let thumbnails = document.querySelectorAll('.imgs-thumbnails img');
let imgProduct = document.querySelector('.big-pic');
let counter = 1;

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        thumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('active');
        });
        e.target.classList.add('active');
        imgProduct.src = e.target.src.split('-thumbnail').join('');
        if (thumbnail.classList.contains('active')) {
            counter = thumbnail.getAttribute('data-num');
        }
    });
});




let lightBox = document.querySelector('.light-box');
let closeLightBox = document.querySelector('.close-light-box');
let lightBoxThumbnails = document.querySelectorAll('.foot img');
let lightBoxImg = document.querySelector('.light-box-img');



lightBoxThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        lightBoxThumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('active');
        });
        e.target.classList.add('active');
        lightBoxImg.src = e.target.src.split('-thumbnail').join('');
        if (thumbnail.classList.contains('active')) {
            counter = thumbnail.getAttribute('data-num');
        }
    });
});

let preBtn = document.querySelector('.pre');
let nextBtn = document.querySelector('.next');
let allThumbs = Array.from(document.querySelectorAll('.foot img'));

preBtn.addEventListener('click', () => {
    counter--;
    if (counter < 1) {
        counter = lightBoxThumbnails.length;
    }
    productImg();
});

nextBtn.addEventListener('click', () => {
    counter++;
    if (counter > lightBoxThumbnails.length) {
        counter = 1;
    }
    productImg();
});

function productImg() {
    allThumbs.forEach(thumb => {
        thumb.classList.remove('active');
    });
    lightBoxImg.src = `images/image-product-${counter}.jpg`;
    allThumbs[counter - 1].classList.add('active');
};
productImg();


let bigPic = document.querySelector('.big-pic');

bigPic.addEventListener('click', () => {
    lightBoxImg.src = bigPic.src;
    overlay.classList.add('active');
    lightBox.classList.add('active');
    matchActiveThumbnails();
});

closeLightBox.addEventListener('click', () => {
    overlay.classList.remove('active');
    lightBox.classList.remove('active');
});

function matchActiveThumbnails() {
    lightBoxThumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        let activeThumb = document.querySelector('.imgs-thumbnails img.active');
        let aticeThumData = activeThumb.getAttribute('data-num');
        let thumbBoxData = thumb.getAttribute('data-num');
        if (thumbBoxData == aticeThumData) {
            thumb.classList.add('active');
        }
    });
};




let price = document.querySelector('.price');
let previousPrice = document.querySelector('.previous-price');
let increase = document.querySelector('.increase');
let decrease = document.querySelector('.decrease');
let productCount = document.querySelector('.product-count');


increase.addEventListener('click', () => {
    let thePrice = parseInt(price.innerText.slice(1, price.innerText.length));
    let thePrevPrice = parseInt(previousPrice.innerText.slice(1, previousPrice.innerText.length));

    price.innerText = `$${(thePrice + 125.00).toFixed(2)}`;
    previousPrice.innerText = `$${(thePrevPrice + 250.00).toFixed(2)}`;
    productCount.innerText++;
});

decrease.addEventListener('click', () => {
    let thePrice = parseInt(price.innerText.slice(1, price.innerText.length));
    let thePrevPrice = parseInt(previousPrice.innerText.slice(1, previousPrice.innerText.length));

    price.innerText = `$${(thePrice - 125.00).toFixed(2)}`;
    previousPrice.innerText = `$${(thePrevPrice - 250.00).toFixed(2)}`;
    productCount.innerText--;

    if (thePrice <= 125.00) {
        price.innerText = '$125.00';
    }
    if (thePrevPrice <= 250.00) {
        previousPrice.innerText = '$250.00';
    }
    if (productCount.innerText <= 1) {
        productCount.innerText = 1
    }
});



let nextImg = document.querySelector('.next-img');
let preImg = document.querySelector('.pre-img');
let imgSlider = document.querySelectorAll('.imgs-container img');
let slideCounter = 0;


nextImg.addEventListener('click', () => {
    slideCounter++;
    slider();
});

preImg.addEventListener('click', () => {
    slideCounter--;
    slider();
});


function slider() {
    imgSlider.forEach(img => {
        img.style.transform = `translateX(-${slideCounter * 100}%)`;
    });
    if (slideCounter < imgSlider.length -1) {
        nextImg.classList.remove('stop');
    } else {
        nextImg.classList.add('stop');
    }

    if (slideCounter > 0) {
        preImg.classList.remove('stop');
    } else {
        preImg.classList.add('stop');
    }
};



let productsHolder = document.querySelector('.products');
let productsHolderText = document.querySelector('.products > p');
let checkoutBtn = document.querySelector('.checkout');
let productPic = document.querySelector('.imgs-thumbnails > img.active');
let cartNum = document.querySelector('.num-products');


addToCartBtn.addEventListener('click', () => {
    cart.classList.add('active');
    addProductToCart();
});

function addProductToCart() {
    let productEl = `<div class="cart-product">
                        <img src="images/image-product-1-thumbnail.jpg" alt="" class="product-img">
                        <div>
                            <h4>fall limited edition sneakers</h4>
                            <div><span>$125.00 x </span><span class="quantity">${productCount.innerText}</span> <span class="total">${price.innerText}</span></div>
                        </div>
                        <i class="fa-solid fa-trash-can trash-icon"></i>
                    </div>`;
    productsHolder.innerHTML = productEl;
    cartNum.innerText = productCount.innerText < 10 ? `0${productCount.innerText}` : productCount.innerText;
    cartNum.classList.add('active');
    deleteFromCart();
};


function deleteFromCart() {
    let trashIcon = document.querySelector('.trash-icon');
    trashIcon.addEventListener('click', (e) => {
        e.target.parentElement.remove();
        cartNum.classList.remove('active');
        productsHolder.appendChild(productsHolderText);
        productsHolderText.innerText = 'Your cart is empty';
    });
}