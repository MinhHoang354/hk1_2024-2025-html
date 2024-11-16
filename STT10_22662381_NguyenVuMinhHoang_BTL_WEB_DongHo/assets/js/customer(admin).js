// customer(admin).js

// Tìm kiếm
function timKiem() {
    var inputSearch = document.getElementById('inputSearch');
    var searchString = inputSearch.value.trim().toLowerCase();
    var danhSachKhachHang = JSON.parse(localStorage.getItem('dulieuKH')) || [];

    if (searchString !== "") {
        var ketQua = danhSachKhachHang.filter(function (khachHang) {
            // Kiểm tra xem mã khách hàng chứa chuỗi tìm kiếm
            return khachHang.maKhachHang.toString().includes(searchString);
        });
        if (ketQua.length > 0) {
            var customers = "";
            for (let i = 0; i < ketQua.length; i++) {
                customers += `<tr>
                <td>` + ketQua[i].maKhachHang + `</td>
                <td>` + ketQua[i].hoTen + `</td>
                <td>` + ketQua[i].diaChi + `</td>
                <td>` + ketQua[i].dienThoai + `</td>
                <td>` + ketQua[i].tenDangNhap + `</td>
                <td>` + ketQua[i].password + `</td>
                <td>` + ketQua[i].access + `</td>
                </tr>`;
            }
            document.getElementById("table-list1").innerHTML = customers;
        } else {
            document.getElementById("table-list1").innerHTML = "Không tìm thấy khách hàng.";
        }
    } else {
        hienThiDanhSachKhachHang(1);
        loadPageCustomer();
    }
}
function updateSearchResults() {
    timKiem();
}
if (document.getElementById('inputSearch')) {
    document.getElementById('inputSearch').addEventListener('input', function () {
        updateSearchResults();
    });
}


// Hiển thị danh sách KH
function hienThiDanhSachKhachHang(pageCustomer) {
    if ((localStorage.getItem('dulieuKH'))){
    var getDataLocal = JSON.parse(localStorage.getItem('dulieuKH')) || [];
    console.log(getDataLocal.length);
    var kq = "";
    for (let i = (pageCustomer - 1) * 6; i < pageCustomer * 6 && i < getDataLocal.length; i++) {
        kq += `<tr>
            <td>` + getDataLocal[i].maKhachHang + `</td>
            <td>` + getDataLocal[i].hoTen + `</td> 
            <td>` + getDataLocal[i].diaChi + `</td>
            <td>` + getDataLocal[i].dienThoai + `</td>
            <td>` + getDataLocal[i].tenDangNhap + `</td>
            <td>` + getDataLocal[i].password + `</td>
            <td>` + (getDataLocal[i].access === 'Admin' ? 'Admin' : 'User') + `</td>
         </tr>`
    document.getElementById("table-list1").innerHTML = kq;
    }
    }
    if (!localStorage.getItem('dulieuKH')) {
        localStorage.setItem('dulieuKH', JSON.stringify(Customer_List));
        window.location.reload(true);
    }
}

// Phân trang
function loadPageCustomer() {
    var getDataLocal = JSON.parse(localStorage.getItem('dulieuKH')) || [];
    if (getDataLocal.length > 0) {
        var page = '';
        var NPage = Math.ceil(getDataLocal.length / 6);
        for (var i = 1; i <= NPage; i++) {
            page += `<span onclick="hienThiDanhSachKhachHang(` + i + `)">` + i + `</span>`;
        }
        if (document.getElementById('page-Customer')) {
            document.getElementById('page-Customer').innerHTML = page;
        }
    }
}


loadPageCustomer();