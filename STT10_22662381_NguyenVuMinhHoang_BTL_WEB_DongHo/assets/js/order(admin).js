var initArrayOrder = [
    {
        date: "11/21/2023",
        id: "1701007916",
        khachhang: "1700877353499",
        tongtien: "",
        status: false,
        chitiet: [
        {
            tenSP: "Mayo Glass",
            soLuong: 2,
            gia: "2099000"
        }
    ]
    },
    {
        date: "11/1/2023",
        id: "1701007917",
        khachhang: "1700877353500",
        tongtien: "",
        status: false,
        chitiet: [
        {
            tenSP: "Silver & Ocean",
            soLuong: 2,
            gia: "1799000"
        }
    ]
    },
    {
        date: "11/2/2023",
        id: "1701007918",
        khachhang: "1700877353501",
        tongtien: "",
        status: false,
        chitiet: [
        {
            tenSP: "Gold & Black",
            soLuong: 3,
            gia: "2099000"
        }
    ]
    },
    {
        date: "10/21/2023",
        id: "1701007919",
        khachhang: "1700877353502",
        tongtien: "",
        status: false,
        chitiet:[
         {
            tenSP: "Silver & Ocean",
            soLuong: 1,
            gia: "1599000"
        }
    ]
    },
    {
        date: "10/15/2023",
        id: "1701007920",
        khachhang: "1700877353503",
        tongtien: "",
        status: false,
        chitiet: [
        {
            tenSP: "Stained P-Gold",
            soLuong: 2,
            gia: "1999000"
        }
        ]
    },
    {
        date: "11/10/2023",
        id: "1701007921",
        khachhang: "1700877353504",
        tongtien: "",
        status: false,
        chitiet: [
            {
                tenSP: "Quad - Golden",
                soLuong: 1,
                gia: "1499000"
            },
            {
                tenSP: "Onyx Men",
                soLuong: 1,
                gia: "2499000"
            }
        ]
    }
];

function calculateOrderTotal(order) {
    let total = 0;

    for (let i = 0; i < order.chitiet.length; i++) {
        const product = order.chitiet[i];
        total += product.soLuong * parseFloat(product.gia);
    }

    return total;
}


function openDetail(idOrder) {
    document.getElementById("orderDetail").style.display = 'block';
    if ((localStorage.getItem('arrayOrder'))) {
        getDataOrder = JSON.parse(localStorage.getItem('arrayOrder'))
        for (var i = 0; i < getDataOrder.length; i++) {
           
            if (getDataOrder[i].id == idOrder) {
                document.getElementById("idO").innerText = getDataOrder[i].id;
                var content = "";
                for (var j = 0; j < getDataOrder[i].chitiet.length; j++) {
                    var product = getDataOrder[i].chitiet[j];
                    content += `<tr>
            <td>`+ product.tenSP + `</td>
            <td>`+ product.soLuong + `</td>
            <td>`+ new Intl.NumberFormat(`vi`, {style: `currency`, currency: `VND`}).format(product.gia) + `</td>
        </tr> `

                }
                document.getElementById("detail-O").innerHTML = content;
            }
        }

    }
    else {
        localStorage.setItem('arrayOrder', JSON.stringify(initArrayOrder))
    }
}


function closeDetail() {
    document.getElementById("orderDetail").style.display = 'none';
}


function showOrders(pageOrder) {
    if ((localStorage.getItem('arrayOrder'))) {
        getDataOrder = JSON.parse(localStorage.getItem('arrayOrder'))
        var order = ""
        for (let i = 0; i < getDataOrder.length; i++) {
            if (i < pageOrder * 5 && i >= ((pageOrder * 5) - 5)) {
              
                if (getDataOrder[i].status) {
                    order += `<tr>
               
                <td>`+ getDataOrder[i].date + `</td>
                <td>`+`WS_O`+ getDataOrder[i].id + `</td>
                <td>`+ getDataOrder[i].khachhang + `</td>
                <td>`+  new Intl.NumberFormat(`vi`, {style: `currency`, currency: `VND`}).format(calculateOrderTotal(getDataOrder[i]))  + `</td>
               
                <td>`+
                        `<div ">
              <label class="switch_Order"  >
              <input type="checkbox" checked onchange="changeStatus(` + getDataOrder[i].id + `)">
              <span class="slider_switch round"></span>
              </label>
              
              </div> 
             Đã xử lí`
                        + `</td>
                 <td onClick="openDetail(`+ getDataOrder[i].id + `)"><img style ="width : 40px;height:40px;cursor:pointer"src ="/assets/img/admin/logo-icon/icon-detail.png"/></td>
                </tr>`

                } else {

                    order += `<tr>
                   
                    <td>`+ getDataOrder[i].date + `</td>
                    <td>`+ `WS_O`+getDataOrder[i].id + `</td>
                    <td>`+ getDataOrder[i].khachhang + `</td>
                    <td>`+  new Intl.NumberFormat(`vi`, {style: `currency`, currency: `VND`}).format(calculateOrderTotal(getDataOrder[i]))  + `</td>
                   
                    <td>`+
                        `<div>
                <label class="switch_Order" >
                <input type="checkbox" onchange="changeStatus(` + getDataOrder[i].id + `)">
                <span class="slider_switch round"></span>
                </label>
             
                </div> 
                Chưa xử lí `
                        + `</td>
                        <td onClick="openDetail(`+ getDataOrder[i].id + `)"><img style ="width : 40px;height:40px;cursor:pointer"src ="/assets/img/admin/logo-icon/icon-detail.png"/></td>
                    </tr>`
                }
            }
        }
        document.getElementById("order-table-list").innerHTML = order;
    }
    else {
        localStorage.setItem('arrayOrder', JSON.stringify(initArrayOrder))
    }
    
    sessionStorage.setItem("currentPage1", pageOrder)
}
let Page1 = sessionStorage.getItem("currentPage1") || "1"


showOrders(Page1)
function loadPageOrder() {
    if (getDataOrder.length > 0) {
        var p = ''
        var NumPage
        if (((getDataOrder.length) % 5) > 0)
            NumPage = (Math.floor((getDataOrder.length) / 5) + 1)
        else {
            NumPage = Math.floor((getDataOrder.length) / 5)
        }
        for (var i = 1; i <= NumPage; i++) {
            p += ` <span onClick="showOrders(` + i + `)">` + i + `</span>`
            document.getElementById("page-Order").innerHTML = p;
        }
    }
}

loadPageOrder() 

function SearchOrders() {
    var ts1 = new Date(document.getElementById('time1').value).getTime();
    var ts2 = new Date(document.getElementById('time2').value).getTime();
    if ((localStorage.getItem('arrayOrder'))) {
        getDataOrder = JSON.parse(localStorage.getItem('arrayOrder'))
   
        var order = ""
        for (let i = 0; i < getDataOrder.length; i++) {
            var ts3 = new Date(getDataOrder[i].date).getTime()
            console.log(ts1, ts2, ts3)
            if (ts1 <= ts3 && ts3 <= ts2) {
                if (getDataOrder[i].status) {
                    order += `<tr>
               
                <td>`+ getDataOrder[i].date + `</td>
                <td>`+`WS_O`+ getDataOrder[i].id + `</td>
                <td>`+ getDataOrder[i].khachhang + `</td>
                <td>`+  new Intl.NumberFormat(`vi`, {style: `currency`, currency: `VND`}).format(calculateOrderTotal(getDataOrder[i])) + `</td>
               
                <td>`+
                        `<div ">
              <label class="switch_Order"  >
              <input type="checkbox" checked onchange="changeStatus(` + getDataOrder[i].id + `)">
              <span class="slider_switch round"></span>
              </label>
              
              </div> 
             Đã xử lí`
                        + `</td>
                 <td onClick="openDetail(`+ getDataOrder[i].id + `)"><img style ="width : 40px;height:40px;cursor:pointer"src ="/assets/img/admin/logo-icon/icon-detail.png"/></td>
                </tr>`

                } else {

                    order += `<tr>
                   
                    <td>`+ getDataOrder[i].date + `</td>
                    <td>`+ `WS_O`+getDataOrder[i].id + `</td>
                    <td>`+ getDataOrder[i].khachhang + `</td>
                    <td>`+ new Intl.NumberFormat(`vi`, {style: `currency`, currency: `VND`}).format(calculateOrderTotal(getDataOrder[i]))  + `</td>
                   
                    <td>`+
                        `<div>
                <label class="switch_Order" >
                <input type="checkbox" onchange="changeStatus(` + getDataOrder[i].id + `)">
                <span class="slider_switch round"></span>
                </label>
             
                </div> 
                Chưa xử lí `
                        + `</td>
                        <td onClick="openDetail(`+ getDataOrder[i].id + `)"><img style ="width : 40px;height:40px;cursor:pointer"src ="/assets/img/admin/logo-icon/icon-detail.png"/></td>
                    </tr>`
                }
            }
        }
    document.getElementById("order-table-list").innerHTML = order;
}else{
    localStorage.setItem('arrayOrder', JSON.stringify(initArrayOrder))
}
}
function changeStatus(idOrder) {
    console.log(idOrder)
    if (confirm("Bạn muốn thay đổi trạng thái của đơn hàng ?") == true) {
        for (var i = 0; i < getDataOrder.length; i++) {
            if (getDataOrder[i].id == idOrder) {
                if (getDataOrder[i].status == true) {
                    getDataOrder[i].status = false
                } else {
                    getDataOrder[i].status = true
                }

            }
        }
        localStorage.setItem('arrayOrder', JSON.stringify(getDataOrder));
        updateOrderDetailsStatus(idOrder, getDataOrder[i].status); // Thêm hàm này để cập nhật trạng thái trong modal chi tiết
        window.location.reload(true);
    }

    else {
        for (var i = 0; i < getDataOrder.length; i++) {
            if (getDataOrder[i].id == idOrder) {
                console.log(getDataOrder[i].id, idOrder, getDataOrder[i].status)
                if (getDataOrder[i].status == true) {
                    getDataOrder[i].status = true
                } else {
                    getDataOrder[i].status = false
                }

            }
        }
        window.location.reload(true)
    }
}
function updateOrderDetailsStatus(idOrder, status) {
    var orderDetailModal = document.getElementById('orderDetailModal');
    var orderDetailContent = orderDetailModal.getElementById('orderDetailContent');

    // Tìm đến phần tử có idOrder trong modal chi tiết
    var orderElement = orderDetailContent.querySelector(`[data-order-id="${idOrder}"]`);
    if (orderElement) {
        // Cập nhật trạng thái
        var statusElement = orderElement.querySelector('.status');
        statusElement.textContent = status ? 'Đã xử lí' : 'Chưa xử lí';
    }
}
