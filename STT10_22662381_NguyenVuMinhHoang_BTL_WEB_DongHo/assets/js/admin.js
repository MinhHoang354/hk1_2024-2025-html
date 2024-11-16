

function changeTabs(tab)
{   
    
    if(tab=="orders"){
        document.getElementById("donhang").style = 'display: block'
        document.getElementById("sanpham").style = 'display: none'
        document.getElementById("thongke").style = 'display: none'
        document.getElementById("khachhang").style = 'display: none'

    }
   else if(tab=="ListProducts"){
        document.getElementById("donhang").style = 'display: none'
        document.getElementById("sanpham").style = 'display: block'
        document.getElementById("thongke").style = 'display: none'
        document.getElementById("khachhang").style = 'display: none'
   
    }
    else if(tab=="statistics"){
        document.getElementById("donhang").style = 'display: none'
        document.getElementById("sanpham").style = 'display: none'
        document.getElementById("thongke").style = 'display: block'
        document.getElementById("khachhang").style = 'display: none'

    }
    else if(tab=="customers"){
        document.getElementById("donhang").style = 'display: none'
        document.getElementById("sanpham").style = 'display: none'
        document.getElementById("thongke").style = 'display: none'
        document.getElementById("khachhang").style = 'display: block'
    }
    
    sessionStorage.setItem("currentTab1",tab)
    

}
let SelectedTab1 = sessionStorage.getItem("currentTab1")|| "ListProducts"
   changeTabs(SelectedTab1)

console.log(changeTabs)
 