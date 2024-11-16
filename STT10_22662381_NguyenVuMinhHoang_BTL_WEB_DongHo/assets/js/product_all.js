const itemsPerPage = 6;

function showProductsForPage(page, productType, filterPatterns) {
    var productListElement = document.getElementById(`productList${productType}`);
    productListElement.innerHTML = '';
    if (localStorage.getItem('arrayProduct')) {
        getDataLocal = JSON.parse(localStorage.getItem('arrayProduct'));
        const filteredProducts = getDataLocal.filter(product => filterPatterns.includes(product.pattern));
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        for (let i = startIndex; i < Math.min(endIndex, filteredProducts.length); i++) {
            var productDiv = document.createElement('div');
            productDiv.className = 'item';
            productDiv.innerHTML = `<img src="${filteredProducts[i].image}" alt="">
                        <div>${filteredProducts[i].name}</div>
                        <div>${new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(filteredProducts[i].price)}</div>
                        <button id="buy-now" onclick="openPopup('${filteredProducts[i].image}', '${filteredProducts[i].name}', '${filteredProducts[i].price}', '${filteredProducts[i].description}', '${filteredProducts[i].size}', '${filteredProducts[i].quantity}')">Mua hàng</button>
                        `;
            productListElement.appendChild(productDiv);
        }
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const paginationElement = document.getElementById(`pagination${productType}`);
        paginationElement.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.addEventListener('click', () => showProductsForPage(i, productType, filterPatterns));
            paginationElement.appendChild(pageButton);
            scroll(0,0);
        }
    }
}

// Initial calls
showProductsForPage(1, "Dhnam", ['Classic', 'Quadro']);
showProductsForPage(1, "Dhnu", ['Luminie', 'Petite']);
showProductsForPage(1, "PhuKien", ['Glasses']);


function showProducts(productType, filterPatterns) {
    var productListElement = document.getElementById(`${productType}`);
    productListElement.innerHTML = '';
    if (localStorage.getItem('arrayProduct')) {
        getDataLocal = JSON.parse(localStorage.getItem('arrayProduct'));
        const filteredProducts = getDataLocal.filter(product => filterPatterns.includes(product.pattern));
        for (let i = 0; i < 3; i++) {
            var productDiv = document.createElement('div');
            productDiv.className = 'item';
            productDiv.innerHTML = `<img src="${filteredProducts[i].image}" alt="">
                                    <div>${filteredProducts[i].name}</div>
                                    <div>${new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(filteredProducts[i].price)}</div>
                                    <button id="buy-now" onclick="openPopup('${filteredProducts[i].image}','${filteredProducts[i].name}', '${filteredProducts[i].price}','${filteredProducts[i].description}','${filteredProducts[i].size}', '${filteredProducts[i].quantity}')">Mua hàng</button>
                                    `;
            productListElement.appendChild(productDiv);
        }
    }
}

// Initial calls
showProducts( "productListDHnam", ['Classic', 'Quadro']);
showProducts("productListDHnu", ['Luminie', 'Petite']);
showProducts("productListPhuKIen", ['Glasses']);



// Hàm mở popup
function openPopup(img, name, price, description,  pattern) {
    document.getElementById("popup-1").classList.add("active");
    document.getElementById("product-img").src = img;
    document.getElementById("product-name").innerText = name;
    document.getElementById("product-price").innerText = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(price);
    document.getElementById("product-description").innerText = description;
  

    

    // Thêm sự kiện click cho nút "Thêm vào giỏ hàng" trong popup
    var addToCartButton = document.getElementById("add-cart");
    addToCartButton.onclick = function () {
        var size = document.getElementById("product-size").value;
        var quantity = parseInt(document.getElementById("quantity").value);
        
        // Thêm sản phẩm vào giỏ hàng và bảng
        addToCartTable(name, img, price, size, quantity);

        // Đóng popup
        closePopup();
    };

}



  
function closePopup() {
        document.getElementById("popup-1").classList.remove("active");
    }

function decrease() {
        var quantityInput = document.querySelector('.container-left input[type="text"]');
        var currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        } else {
            quantityInput.value = 1;
        }
}
    
function increase() {
        var quantityInput = document.querySelector('.container-left input[type="text"]');
        var currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    }

    
    function addtocart() {
        // Lấy thông tin đăng nhập từ localStorage
 let userLoginInfo = JSON.parse(localStorage.getItem("user_login"));

 // Kiểm tra xem người dùng đã đăng nhập hay chưa
//  if (userLoginInfo && userLoginInfo.tenDangNhap) { 

     var product = {
         image: document.getElementById("product-img").src,
         name: document.getElementById("product-name").innerText,
         price: document.getElementById("product-price").innerText,
         size: document.getElementById("product-size").value,
         quantity: parseInt(document.getElementById("quantity").value),
        
     };
     var cart = JSON.parse(localStorage.getItem("cart")) || [];
     var existingProductIndex = -1;
     for (var i = 0; i < cart.length; i++) {
         if (
             cart[i].name === product.name &&
             cart[i].size === product.size &&
             cart[i].price === product.price
         ) {
             existingProductIndex = i;
             break;
         }
     }
     if (existingProductIndex !== -1) {
         cart[existingProductIndex].quantity += product.quantity;
     } else {
         cart.push(product);
     }
     localStorage.setItem("cart", JSON.stringify(cart));
     console.log('Thêm vào giỏ hàng');
     alert("Hệ thống đã ghi nhận sản phẩm!");
     closePopup();

}
 
