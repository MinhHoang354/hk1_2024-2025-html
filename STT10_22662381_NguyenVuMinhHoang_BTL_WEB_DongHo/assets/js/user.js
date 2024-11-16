function changeTabs1(tab) {

  if (tab == "index") {
    document.getElementById("trangchu").style = 'display: block'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: none'
  }

  if (tab == "Men") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display:block'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: none'
  }

  if (tab == "Women") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: block'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: none'
  }


  if (tab == "Glasses") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: block'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: none'
  }

  if (tab == "Cart") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: block'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: none'
  }


  if (tab == "about") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: block'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: none'
  }

  if (tab == "login") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: block'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: none'
  }
  if (tab == "singup") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: block'
    document.getElementById("searchProduct").style = 'display: none'
  }

  if (tab == "search") {
    document.getElementById("trangchu").style = 'display: none'
    document.getElementById("SanphamNam").style = 'display: none'
    document.getElementById("sanphamnu").style = 'display: none'
    document.getElementById("Phukien").style = 'display: none'
    document.getElementById("cart").style = 'display: none'
    document.getElementById("aboutcontentblock").style = 'display: none'
    document.getElementById("dangnhap").style = 'display: none'
    document.getElementById("dangky").style = 'display: none'
    document.getElementById("searchProduct").style = 'display: block'
  }

  sessionStorage.setItem("currentTab", tab)

}
let SelectedTab = sessionStorage.getItem("currentTab") || "index"
changeTabs1(SelectedTab)

