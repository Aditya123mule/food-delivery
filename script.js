let cart = [];
let totalPrice = 0;

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
    cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total-price");
    
    cartList.innerHTML = "";
    totalPrice = 0;
    
    if (cart.length === 0){
        cartList.innerHTML = "<li>Cart is Empty<li>";
    } else {
        cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - Rs${item.price.toFixed(2)} x ${item.quantity} = Rs${(item.price * item.quantity).toFixed(2)}`;

        let increaseBtn = document.createElement("button");
            increaseBtn.textContent = "+";
            increaseBtn.onclick = () => changeQuantity(index, 1);
            increaseBtn.style.margin = "0 5px";

            let decreaseBtn = document.createElement("button");
            decreaseBtn.textContent = "-";
            decreaseBtn.onclick = () => changeQuantity(index, -1);
            decreaseBtn.style.margin = "0 5px";

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeFromCart(index);
        removeBtn.style.marginLeft = "10px";
        
        li.appendChild(increaseBtn);
        li.appendChild(decreaseBtn);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
}

    totalElement.textContent = totalPrice.toFixed(2);
}

function changeQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Your total is Rs${totalPrice.toFixed(2)}. Thank you for your order!`);
        clearCart();
    }
}
function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
    cart= [];
    updateCart();
    }
}
function filterMenu(category) {
    let foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = "inline-block";
      } else {
     item.style.display= "none";
    }
 });
 let buttons = document.querySelectorAll('.filter-buttons button');
 buttons.forEach(button => button.classList.remove('active'));
 document.getElementById(category + "-btn").classList.add('active');
}
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("review-form")) {
        loadReviews();

        document.getElementById("review-form").addEventListener("submit", function (event) {
            event.preventDefault();
            let name = document.getElementById("reviewer-name").value;
            let email = document.getElementById("reviewer-email").value;
            let address = document.getElementById("reviewer-address").value;
            let photo = document.getElementById("reviewer-photo").value;
            let reviewText = document.getElementById("review-text").value;
            let rating = document.getElementById("rating").value;
            let review = {
                name: name,
                email: email,
                address: address,
                photo: photo,
                text: reviewText,
                rating: rating
            };

            saveReview(review);
            document.getElementById("review-form").reset();
        });

        function saveReview(review) {
            console.log("Saving review:", review);
            let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
            reviews.push(review);
            localStorage.setItem("reviews", JSON.stringify(reviews));
            loadReviews();
        }

        function loadReviews() {
            let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
            let reviewList = document.getElementById("review-list");

            reviewList.innerHTML = "";

            reviews.forEach((review, index) => {
                let li = document.createElement("li");

                li.innerHTML = `${photoElement}<strong>${review.name}</strong> - ${"⭐".repeat(review.rating)}<br>
                <em>${review.email}</em> | <em>${review.address}</em><br>${review.text}<br>`;
                let removeBtn = document.createElement("button");
                removeBtn.textContent = "Delete";
                removeBtn.onclick = () => deleteReview(index);
                li.appendChild(removeBtn);

                reviewList.appendChild(li);
            });
        }

        function deleteReview(index) {
            let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
            reviews.splice(index, 1);
            localStorage.setItem("reviews", JSON.stringify(reviews));
            loadReviews();
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let foodItems = document.querySelectorAll(".food-item");

    foodItems.forEach(item => {
        let ratingValue = parseFloat(item.getAttribute("data-rating"));
        let ratingDiv = document.createElement("div"); 
        ratingDiv.classList.add("rating");
        ratingDiv.innerHTML = generateStars(ratingValue);
        item.appendChild(ratingDiv); 
    });
});

function generateStars(rating) {
    let stars = "";
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += "⭐";
    }
    if (halfStar) {
        stars += "⭐️"; 
    }

    return stars;
}
function searchMenu() {
    let searchInput = document.getElementById("search-bar").value.toLowerCase();
    let foodItems = document.querySelectorAll(".food-item");

    let hasResults = false;

    foodItems.forEach(item => {
        let itemName = item.querySelector("h3").textContent.toLowerCase();
        if (itemName.includes(searchInput)) {
            item.style.display = "inline-block";
            hasResults = true;
        } else {
            item.style.display = "none";
        }
    });
    let noItemsMessage = document.getElementById("no-items");
    noItemsMessage.style.display = hasResults ? "none" : "block";
}
