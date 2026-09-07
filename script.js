// Show Navbar when small screen || Close Cart Items & Search Textbox
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}

// Show Cart Items || Close Navbar & Search Textbox
let cartItem = document.querySelector('.cart');

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

// Show Search Textbox || Close Navbar & Cart Items
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

// Remove Active Icons on Scroll and Close it
window.onscroll = () => {
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}

// Script for making icon as button
document.getElementById('paper-plane-icon').addEventListener('click', function() {
    // Add your desired action here, e.g. submit form, trigger AJAX request, etc.
    alert('Paper airplane clicked!');
});


//Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// FUNCTIONS FOR CART
function ready() {
    //Remove Items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // When quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // Buy Button Works
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// Function for "Buy Button Works"
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var custName = document.getElementById("cust-name").value;

    if (cartBoxes.length == 0 || custName.trim() == "") {
        alert("Cart khali hai ya naam nahi dala!");
        return;
    }

    var form = document.createElement("form");
    form.method = "POST";
    form.action = "invoice.php";

    var nameInput = document.createElement("input");
    nameInput.type = "hidden";
    nameInput.name = "customer_name";
    nameInput.value = custName;
    form.appendChild(nameInput);

    for (var i = 0; i < cartBoxes.length; i++) {
        var title = cartBoxes[i].getElementsByClassName("cart-product-title")[0].innerText;
        var price = cartBoxes[i].getElementsByClassName("cart-price")[0].innerText;
        var quantity = cartBoxes[i].getElementsByClassName("cart-quantity")[0].value;

        var itemInput = document.createElement("input");
        itemInput.type = "hidden";
        itemInput.name = "items[]";
        itemInput.value = title + "|" + price + "|" + quantity;
        form.appendChild(itemInput);
    }

    document.body.appendChild(form);
    form.submit(); // Ye seedha bill par le jayega aur save bhi karega
}

// Function to generate invoice number
function generateInvoiceNumber() {
    // Implement your logic to generate an invoice number here
    return "INV-" + Math.floor(Math.random() * 1000000);
}

// Function for "Remove Items from Cart"
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    updateCartIconTotal();
}

// Function for "When quantity changes"
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    updateCartIconTotal();
}

//Add to Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;

    // --- DUPLICATE CHECK LOGIC START ---
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsNames.length; i++) {
        // Trim aur LowerCase se matching error khatam ho jata hai
        if (cartItemsNames[i].innerText.trim().toLowerCase() == title.trim().toLowerCase()) {
            alert("This item is also available in your cart");
            return; // Yahin se function stop ho jayega
        }
    }
    // --- DUPLICATE CHECK LOGIC END ---

    addProductToCart(title, price, productImg);
    updateTotal();
    updateCartIconTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    
    // YE LINE ZARUR ADD KAREIN
    var cartItems = document.getElementsByClassName("cart-content")[0];

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <div class="quantity-control">
                <button type="button" class="btn-minus">-</button>
                <input type="number" value="1" min="1" class="cart-quantity" readonly>
                <button type="button" class="btn-plus">+</button>
            </div>
        </div>
        <i class="fas fa-trash cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // --- Plus Button Logic ---
    cartShopBox.getElementsByClassName("btn-plus")[0].addEventListener("click", (event) => {
        var input = event.target.parentElement.getElementsByClassName("cart-quantity")[0];
        input.value = parseInt(input.value) + 1;
        updateTotal();
    });

    // --- Minus Button Logic ---
    cartShopBox.getElementsByClassName("btn-minus")[0].addEventListener("click", (event) => {
        var input = event.target.parentElement.getElementsByClassName("cart-quantity")[0];
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
            updateTotal();
        }
    });

    // --- Remove Item Logic ---
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("Rs ", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        total = Math.round(total * 100) / 100;
        
        document.getElementsByClassName("total-price")[0].innerText = "Rs " + total;
}

// Search Box Filter Logic
document.querySelector('#search-box').oninput = () => {
    let value = document.querySelector('#search-box').value.toLowerCase();
    
    // Aapke coffee items '.box' class ke andar hain (jaisa pichli image mein dekha tha)
    let boxes = document.querySelectorAll('.box'); 

    boxes.forEach(item => {
        // Item ka title dhoondna
        let titleElement = item.querySelector('.product-title');
        
        if (titleElement) {
            let titleText = titleElement.innerText.toLowerCase();
            
            // Agar title mein search value hai toh dikhao, nahi toh chhupao
            // item.parentElement use kiya hai taaki Bootstrap ka column (col-md-4) hide ho jaye
            if (titleText.indexOf(value) > -1) {
                item.parentElement.style.display = "block";
            } else {
                item.parentElement.style.display = "none";
            }
        }
    });
};

function updateCartIconTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var totalItems = 0;
    
    // Har box ki quantity ko ginte hain
    for (var i = 0; i < cartBoxes.length; i++) {
        var quantityElement = cartBoxes[i].getElementsByClassName("cart-quantity")[0];
        totalItems += parseInt(quantityElement.value);
    }
    
    var cartBadge = document.getElementById("cart-count");
    if (totalItems > 0) {
        cartBadge.innerText = totalItems;
        cartBadge.style.display = "block";
    } else {
        cartBadge.style.display = "none";
    }
}

