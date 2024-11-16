// Date
flatpickr("#startDate", {
    dateFormat: "m/d/Y", // Định dạng MM/DD/YYYY
});
flatpickr("#endDate", {
    dateFormat: "m/d/Y", // Định dạng MM/DD/YYYY
});

function applyFilters() {
    var startDate = new Date(document.getElementById("startDate").value);
    var endDate = new Date(document.getElementById("endDate").value);
    var productType = document.getElementById("productType").value;
    var dulieuHD = JSON.parse(localStorage.getItem('arrayOrder'));
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    // lọc theo ngày và loại sản phẩm
    var filteredOrders = dulieuHD.filter(function (order) {
        // Trích xuất phần ngày mà không có thành phần thời gian
        var orderDate = new Date(order.date);
        orderDate.setHours(0, 0, 0, 0);

        var productMatches = order.chitiet.some(item => item.tenSP.toLowerCase().includes(productType.toLowerCase()));

        return (
            orderDate >= startDate &&
            orderDate <= endDate &&
            (productType.toLowerCase() === 'all' || productMatches)
        );
    });

    // tính tổng
    var totalProductsSold = 0;
    var totalRevenue = 0;

    filteredOrders.forEach(function (order) {
        order.chitiet.forEach(function (item) {

            // Kiểm tra xem loại sản phẩm có khớp với loại sản phẩm được chọn không
            var isProductTypeMatch = item.tenSP.toLowerCase().includes(productType.toLowerCase());

            if(productType.toLowerCase() === 'all' || isProductTypeMatch){
                totalProductsSold += item.soLuong;
                totalRevenue += item.soLuong * parseFloat(item.gia);
            }
        });
    });

    document.getElementById("totalProductsSold").innerText = totalProductsSold;
    document.getElementById("totalRevenue").innerText = formatCurrency(totalRevenue) ;
    }

    // Hàm định dạng số tiền thành chuỗi có đơn vị
    function formatCurrency(amount){
    return amount.toLocaleString('vi', {style: 'currency', currency: 'VND'});
}

applyFilters();