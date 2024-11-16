document.addEventListener('DOMContentLoaded', function () {
    // Gọi hàm searchProduct khi trang đã tải xong
    searchProduct();
});
let itemsSearchPages = 6;
let current = 1; 
let arrayProducts = [];



// Thêm biến để lưu trữ mẫu đang được chọn
let selectedPattern = '--------Chọn mẫu---------';

// Thêm sự kiện nghe cho sự thay đổi của dropdown chọn mẫu
const patternRangeSelect = document.getElementById('patternRange');
patternRangeSelect.addEventListener('change', function () {
    selectedPattern = patternRangeSelect.value.toLowerCase();
    // Reset current page to 1 when pattern changes
    current = 1;
    filterProducts();
});
let selectedPrice = '------------------Chọn giá------------------';
// Thêm sự kiện nghe cho dropdown chọn giá
const priceRangeSelect = document.getElementById('priceRange');
priceRangeSelect.addEventListener('change', function () {
    selectedPrice = priceRangeSelect.value.toLowerCase();
   
    current = 1;
    filterProducts();
});
// Định nghĩa biến pageButton



function filterProducts() {
    // Lấy giá trị lọc giá
    const priceRangeSelect = document.getElementById('priceRange');
    const selectedPriceRange = priceRangeSelect.value;

    // Lọc theo giá và mẫu nếu cả hai đều được chọn
    if (selectedPriceRange !== '------------------Chọn giá------------------' && selectedPattern !== '--------Chọn mẫu---------') {
        filterByPriceAndPattern(selectedPriceRange);
    } else if (selectedPriceRange !== '------------------Chọn giá------------------') {
        // Lọc theo giá nếu chỉ có giá được chọn
        filterByPrice(selectedPriceRange);
    } else if (selectedPattern !== '--------Chọn mẫu---------') {
        // Lọc theo mẫu nếu chỉ có mẫu được chọn
        filterByPattern();
    } else {
        // Hiển thị tất cả sản phẩm nếu không có lọc nào được chọn
        searchProduct();
    }
}

// Hàm lọc giá và mẫu
function filterByPriceAndPattern(selectedPriceRange) {
    const [minPrice, maxPrice] = selectedPriceRange.split('-').map(parseFloat);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
        console.log('Đầu vào không hợp lệ');
        return;
    }

    const filteredProducts = arrayProducts.filter(product => {
        const productPrice = parseFloat(product.price);
        return productPrice >= minPrice && productPrice <= maxPrice && product.pattern.toLowerCase().includes(selectedPattern);
    });

    displayProducts(filteredProducts);
}

// Hàm lọc giá
function filterByPrice(selectedPriceRange) {
   
    const [minPrice, maxPrice] = selectedPriceRange.split('-').map(parseFloat);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
        console.log('Đầu vào không hợp lệ');
        return;
    }

    const filteredProducts = arrayProducts.filter(product => {
        const productPrice = parseFloat(product.price);
        return productPrice >= minPrice && productPrice <= maxPrice;
    });

    displayProducts(filteredProducts);

}
// Hàm lọc mẫu
function filterByPattern() {
    // Kiểm tra nếu selectedPattern không phải giá trị mặc định
    if (selectedPattern !== '--------Chọn mẫu---------') {
        const filteredProducts = arrayProducts.filter(product =>
            product.pattern.toLowerCase().includes(selectedPattern)
        );

        displayProducts(filteredProducts);
    } else {
        // Nếu selectedPattern là giá trị mặc định, hiển thị tất cả sản phẩm
        searchProduct();
    }
}

function displayProducts(products) {
    const startIndex = (current - 1) * itemsSearchPages;
    const endIndex = startIndex + itemsSearchPages;
    const productListSearch = document.getElementById('productListSearch');
    const paginationContainer = document.getElementById('paginationSearch');
    productListSearch.innerHTML = '';
    paginationContainer.innerHTML = '';

    if (products.length === 0) {
        productListSearch.innerHTML = '<p>Không tìm thấy sản phẩm</p>';
    } else {
        for (let i = startIndex; i < endIndex && i < products.length; i++) {
            const productDiv = document.createElement('div');
            productDiv.className = 'item';
            productDiv.innerHTML = `<br><img src="${products[i].image}" alt="">
                        <div>${products[i].name}</div>
                        <div>${new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(products[i].price)}</div>
                        <button id="buy-now" onclick="openPopup('${products[i].image}', '${products[i].name}', '${products[i].price}', '${products[i].description}', '${products[i].size}', '${products[i].quantity}')">Mua hàng</button>`;
            productListSearch.appendChild(productDiv);
        }

        const totalPages = Math.ceil(products.length / itemsSearchPages);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;

            // Sự kiện nghe cho nút phân trang
            pageButton.addEventListener('click', function () {
                // Lấy giá trị của nút phân trang được nhấp vào
                current = i;
                searchProduct();
                filterProducts();
                
            });

            paginationContainer.appendChild(pageButton);
            window.scrollTo(0,0);
        }
    }
}
filterProducts();

function searchProduct() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const storedData = localStorage.getItem('arrayProduct');
    if (storedData === null) {
        console.log('No data in local storage');
        return;
    }
    arrayProducts = JSON.parse(storedData);

    const filteredProducts = arrayProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.pattern.toLowerCase().includes(searchTerm)
    );

   
    displayProducts(filteredProducts);
    window.scrollTo(0,0);
}

// Thực hiện tìm kiếm ngay khi trang được tải
searchProduct();

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchProduct);