//localStorage.removeItem('cart');

let formattedTime ;
let currentTime ;
function addToCartTable(name, img, price, size, quantity) {
   let userLoginInfo = JSON.parse(localStorage.getItem("user_login"));
   if (userLoginInfo && userLoginInfo.tenDangNhap) {
       // Lấy thẻ tbody của bảng giỏ hàng
       var tbody = document.querySelector('.listSanPham tbody');

       // Sao chép dòng mẫu
       var templateRow = document.getElementById('cart-row-template').cloneNode(true);
       templateRow.style.display = ''; // Hiển thị dòng

       // Lấy danh sách giỏ hàng từ localStorage (nếu có)
       var cart = JSON.parse(localStorage.getItem('cart')) || [];

       // Lấy số thứ tự của sản phẩm trong giỏ hàng
       var stt = cart.length + 1;


       var total = price * quantity; // Tính toán thành tiền từ số lượng mới

       // Cập nhật thông tin sản phẩm trong dòng
       templateRow.querySelector('td').innerText = stt;
       templateRow.querySelector('.product-name').innerText = name;
       templateRow.querySelector('.product-image').innerHTML = `<img style="width:125px;height:125px;justify-content:center"src="${img}" alt="${name}">`;
       templateRow.querySelector('.product-price').innerText = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(price);
       templateRow.querySelector('.product-size').innerText = size;
   
       // Tạo nút Tăng và Giảm số lượng
       var quantityCell = templateRow.querySelector('.product-quantity');
       var decreaseButton = document.createElement('button');
       decreaseButton.innerText = '-';
       decreaseButton.className = 'quantity-button decrease-button';
       decreaseButton.onclick = function () { decreaseQuantity(this); };

       var quantitySpan = document.createElement('span');
       quantitySpan.className = 'quantity';
       quantitySpan.innerText = quantity;

       var increaseButton = document.createElement('button');
       increaseButton.innerText = '+';
       increaseButton.className = 'quantity-button increase-button';
       increaseButton.onclick = function () { increaseQuantity(this); };

       // Thêm nút vào ô số lượng
       quantityCell.appendChild(decreaseButton);
       quantityCell.appendChild(quantitySpan);
       quantityCell.appendChild(increaseButton);

       // Gọi hàm calculateTotal và cập nhật giá trị
       var total = calculateTotal(price, quantity);
       templateRow.querySelector('.product-total').innerText = formatCurrency(total);

       // Lấy thời gian hiện tại và định dạng nó
       currentTime = new Date();
      formattedTime = currentTime.getTime(); // Định dạng thời gian theo ngôn ngữ địa phương

       templateRow.querySelector('.product-time').innerText =  (new Date(formattedTime)).toLocaleString();

       // Lưu thông tin vào localStorage
       var cartItem = {
           stt: stt,
           name: name,
           img: img,
           price: price,
           size: size,
           quantity: quantity,
           time: formattedTime
       };

       // Thêm mục mới vào danh sách giỏ hàng
       cart.push(cartItem);

       // Lưu lại danh sách giỏ hàng mới vào localStorage
       localStorage.setItem('cart', JSON.stringify(cart));

       // Thêm dòng vào tbody
       tbody.appendChild(templateRow);
       // Cập nhật hàng tổng tiền
       updateTotalRow();

       console.log('Thêm vào giỏ hàng');
       alert("Hệ thống đã ghi nhận sản phẩm!");
       closePopup();
   } else {
       // Người dùng chưa đăng nhập, thực hiện hành động phù hợp như hiển thị thông báo hoặc chuyển hướng đến trang đăng nhập
       alert("Vui lòng đăng nhập trước khi mua hàng.");
       closePopup();
   }
}

function updateTotalRow() {
   // Lấy danh sách giỏ hàng từ localStorage
   var cart = JSON.parse(localStorage.getItem('cart')) || [];

   // Lấy thẻ tbody của bảng giỏ hàng
   var tbody = document.querySelector('.listSanPham tbody');

   // Kiểm tra xem giỏ hàng có trống hay không
   if (cart.length > 0) {
       // Tính tổng số lượng và tổng thành tiền
       var totalQuantity = 0;
       var totalAmount = 0;

       // Lặp qua từng sản phẩm trong giỏ hàng để tính tổng
       for (var i = 0; i < cart.length; i++) {
           var product = cart[i];
           totalQuantity += product.quantity;
           totalAmount += product.price * product.quantity;
       }


       // Tạo cột tổng tiền
       var totalCell = document.createElement('td');
       totalCell.colSpan = '9';
       totalCell.innerHTML = `<strong>Tổng cộng:</strong> ${new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(totalAmount)} - Số lượng: ${totalQuantity}`;

       // Kiểm tra xem đã có dòng tổng tiền chưa
       var totalRow = document.getElementById('cart-total-row');
       if (totalRow) {
           tbody.removeChild(totalRow); // Nếu đã có, xoá đi để cập nhật lại
       }

       // Tạo dòng mới cho tổng tiền
       totalRow = document.createElement('tr');
       totalRow.id = 'cart-total-row';

       // Thêm cột tổng tiền vào dòng
       totalRow.appendChild(totalCell);

       // Thêm dòng tổng tiền vào cuối tbody
       tbody.appendChild(totalRow);
   } else {
       // Nếu giỏ hàng trống, ẩn dòng tổng cộng nếu có
       var totalRow = document.getElementById('cart-total-row');
       if (totalRow) {
           tbody.removeChild(totalRow);
       }
   }
}


// Trong product_all.js
function calculateTotal(price, quantity) {
   return price * quantity;
}


function formatCurrency(amount) {
   return new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(amount);
}


function removeCartItem(button) {
   // Lấy dòng chứa nút xoá
   var row = button.closest('tr');

   // Lấy tên sản phẩm của sản phẩm trong giỏ hàng
   var productName = row.querySelector('.product-name').innerText;

   // Xác nhận với người dùng trước khi xoá
   var confirmation = confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng không?");

   if (confirmation) {
       // Lấy danh sách giỏ hàng từ localStorage
       var cart = JSON.parse(localStorage.getItem('cart')) || [];

       // Xoá sản phẩm khỏi danh sách giỏ hàng dựa trên tên sản phẩm
       cart = cart.filter(function (item) {
           return productName !== item.name;
       });

       // cart = cart.map(function (item, index) {
       //     return { ...item, stt: index + 1 };
       // });

       // Lưu lại danh sách giỏ hàng mới vào localStorage
       localStorage.setItem('cart', JSON.stringify(cart));


       // Cập nhật lại STT trong bảng giỏ hàng
       updateCartItemNumbers();

       // Xoá dòng khỏi bảng giỏ hàng
       row.remove();

       // Cập nhật giỏ hàng trong localStorage
       updateCartLocalStorage();

       // Cập nhật tổng tiền ngay sau khi xoá sản phẩm
       updateTotalRow();
   }
}

function updateCartLocalStorage() {
   // Lấy danh sách giỏ hàng từ localStorage
   var cart = JSON.parse(localStorage.getItem('cart')) || [];

   // ... (code của bạn để xoá sản phẩm)

   // Lưu lại danh sách giỏ hàng mới vào localStorage
   localStorage.setItem('cart', JSON.stringify(cart));
}



function updateCartItemNumbers() {
   // Lấy danh sách giỏ hàng từ localStorage
   var cart = JSON.parse(localStorage.getItem('cart')) || [];

   // Lưu lại danh sách giỏ hàng mới vào localStorage
   localStorage.setItem('cart', JSON.stringify(cart));

   // Lấy tất cả các dòng trong bảng giỏ hàng
   var rows = document.querySelectorAll('.listSanPham tbody tr');

   // Cập nhật lại số thứ tự trong bảng giỏ hàng từ mảng cart
   updateTableWithCartData(rows, cart);
}

function updateTableWithCartData(rows, cart) {
   // Cập nhật lại số thứ tự trong bảng giỏ hàng từ mảng cart
   rows.forEach(function (row, index) {
       var sttCell = row.cells[0]; // Giả sử số thứ tự ở ô đầu tiên
       if (index < cart.length && cart[index].stt !== undefined) {
           sttCell.innerText = cart[index].stt;
       } else {
           // Nếu không có giá trị stt hoặc index vượt quá số lượng phần tử trong cart, có thể hiển thị giá trị mặc định hoặc để trống.
           // sttCell.innerText = ''; // hoặc sttCell.innerText = 'N/A';
       }
   });
}

console.log(cart)


function updateCartItemQuantity(productName, newQuantity) {
   // Lấy danh sách giỏ hàng từ localStorage
   var cart = JSON.parse(localStorage.getItem('cart')) || [];

   // Tìm sản phẩm trong giỏ hàng và cập nhật số lượng
   for (var i = 0; i < cart.length; i++) {
       if (cart[i].name === productName) {
           // Cập nhật số lượng
           cart[i].quantity = newQuantity;
           // Cập nhật thành tiền
           cart[i].total = cart[i].price * newQuantity;
           break;
       }
   }

   // Lưu lại danh sách giỏ hàng mới vào localStorage
   localStorage.setItem('cart', JSON.stringify(cart));
}


function updateCartItemTotal(product) {
   return calculateTotal(product.price, product.quantity);
}

function adjustQuantity(button, isIncrease) {
   var row = button.closest('tr');
   var productName = row.querySelector('.product-name').innerText;
   var quantitySpan = row.querySelector('.quantity');
   var currentQuantity = parseInt(quantitySpan.textContent);

   // Tăng hoặc giảm số lượng
   currentQuantity = isIncrease ? currentQuantity + 1 : Math.max(currentQuantity - 1, 1);
   quantitySpan.textContent = currentQuantity;

   // Cập nhật thông tin sản phẩm trong giỏ hàng
   var cart = JSON.parse(localStorage.getItem('cart')) || [];
   var updatedProduct = cart.find(product => product.name === productName);
   updatedProduct.quantity = currentQuantity;
   updatedProduct.total = updateCartItemTotal(updatedProduct);

   // Cập nhật thành tiền trên giao diện
   var totalCell = row.querySelector('.product-total');
   totalCell.innerText = formatCurrency(updatedProduct.total);

   // Lưu lại danh sách giỏ hàng mới vào localStorage
   localStorage.setItem('cart', JSON.stringify(cart));

   // Cập nhật lại tổng tiền
   updateTotalRow();
}

// Hàm giảm số lượng
function decreaseQuantity(button) {
   adjustQuantity(button, false);
}

// Hàm tăng số lượng
function increaseQuantity(button) {
   adjustQuantity(button, true);
}
// Thêm sự kiện cho nút giảm số lượng
var decreaseButton = document.querySelector('.decrease-button');
decreaseButton.addEventListener('click', function () {
   decreaseQuantity(this);
});

// Thêm sự kiện cho nút tăng số lượng
var increaseButton = document.querySelector('.increase-button');
increaseButton.addEventListener('click', function () {
   increaseQuantity(this);
});





function confirmPayment() {
   // Lấy danh sách giỏ hàng từ localStorage
   var cart = JSON.parse(localStorage.getItem('cart')) || [];

   // Kiểm tra nếu giỏ hàng không có sản phẩm
   if (cart.length === 0) {
       alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
       return;
   }

   var confirmation = confirm("Bạn có chắc muốn thanh toán giỏ hàng?");
   if (confirmation) {
       // Ngọc An làm khúc này //
       var maKH = JSON.parse(localStorage.getItem('user_login'));
       var getDataOrder = JSON.parse(localStorage.getItem('arrayOrder')) || [];
       
       var addOrder = {
           date: '',
           id: (new Date().getTime()).toString(),
           khachhang: '',
           status: false,
           tongtien: '',
           chitiet: []
       };

       addOrder.date = new Date().toLocaleDateString();
       addOrder.khachhang = maKH.maKhachHang;

       // Duyệt qua từng sản phẩm trong giỏ hàng và thêm vào chi tiết đơn hàng
       cart.forEach(function (product) {
           // Thêm sản phẩm vào chi tiết đơn hàng
           addOrder.chitiet.push({
               tenSP: product.name,
               soLuong: product.quantity,
               gia: product.price
           });
       });

    // Tính tổng tiền và gán vào thuộc tính tongtien của đơn hàng
    addOrder.tongtien = calculateOrderTotal(addOrder);
    // Thêm đơn hàng vào danh sách đơn hàng
       getDataOrder.push(addOrder);

       // Lưu lại danh sách đơn hàng mới vào localStorage
       localStorage.setItem('arrayOrder', JSON.stringify(getDataOrder));

       // Hiển thị thông báo thanh toán thành công
       alert("Quý khách đã đặt hàng thành công, cảm ơn quý khách đã mua hàng tại shop, hẹn gặp lại quý khách!");
       
       // Xóa giỏ hàng
       localStorage.removeItem('cart');
       
       // Cập nhật giao diện 
       window.location.reload(true);
   } else {
       // Xử lý khi người dùng không xác nhận thanh toán
   }
}



////ĐƠN HÀNG
function showOrderDetails() {
   // Lấy danh sách đơn hàng từ localStorage
   var orderList = JSON.parse(localStorage.getItem('arrayOrder')) || [];

   // Hiển thị chi tiết đơn hàng
   showOrderDetailsModal(orderList);
}




function showOrderDetailsModal() {
   // Lấy mã khách hàng từ thông tin đăng nhập
   var loggedInCustomer = JSON.parse(localStorage.getItem("user_login"));
   var customerId = loggedInCustomer.maKhachHang;

   
   var orderList = JSON.parse(localStorage.getItem('arrayOrder')) || [];

   // Lọc danh sách đơn hàng chỉ cho khách hàng có mã customerId
   var customerOrders = orderList.filter(function (order) {
       return order.khachhang === customerId;
   });

   
   var modal = document.getElementById('orderDetailModal');
   modal.style.display = 'block';

   
   var orderDetailContent = document.getElementById('orderDetailContent');

   // Xóa nội dung cũ
   orderDetailContent.innerHTML = '';

   
   if (customerOrders.length > 0) {
       for (var i = 0; i < customerOrders.length; i++) {
           var order = customerOrders[i];
            // Tính tổng tiền của đơn hàng
            var orderTotal = calculateOrderTotal(order);
           // Tạo phần tử cho đơn hàng
           var orderElement = document.createElement('div');
           
           orderElement.innerHTML = `
               <p>Đơn hàng ngày ${order.date}</p>
               <p>Mã đơn hàng: ${order.id}</p>
               <p>Khách hàng: ${order.khachhang}</p>
               <p>Tổng tiền: ${formatCurrency(orderTotal)}</p>
               <p>Trạng thái: ${order.status ? 'Đã xử lí' : 'Chưa xử lí'}</p>
               <p>Chi tiết đơn hàng:</p>
               <ul>
               ${order.chitiet.map(item => `<li>${item.tenSP} - Số lượng: ${item.soLuong} - Giá: ${formatCurrency(item.gia)}</li>`).join('')}
               </ul>
               <br> 
               <hr>
               <br>
           `

           orderElement.setAttribute('data-order-id', order.id);

           // Thêm đơn hàng vào nội dung modal
           orderDetailContent.appendChild(orderElement);
       }
   } else {
       alert("Không có đơn hàng nào.");
   }
}


// Hàm đóng modal
function closeOrderDetailModal() {
   var modal = document.getElementById('orderDetailModal');
   modal.style.display = 'none';
}


