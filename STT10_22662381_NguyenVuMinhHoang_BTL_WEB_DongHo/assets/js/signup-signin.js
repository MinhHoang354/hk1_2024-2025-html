
window.onload = function () {
  loadtranglogin()
 
}
function loadtranglogin(){
  let user_login = JSON.parse(localStorage.getItem("user_login")) || {};
  if (user_login.tenDangNhap) {
    handleSuccessfulLogin(user_login);
  } else {
  }
}


let Customer_List = [
  {
    maKhachHang: '',
    hoTen: 'Admin',
    email: '',
    diaChi: '',
    dienThoai: '',
    tenDangNhap: 'admin',
    password: 'admin123',
    access: 'Admin',  
    
  },
  {
    maKhachHang: '1700877353499',
    hoTen: 'Nguyễn Ngọc An',
    email: 'nguyenngocan123@gmail.com',
    diaChi: 'Thành phố Hồ Chí Minh',
    dienThoai: '0987123456',
    tenDangNhap: 'nguyenngocan123',
    password :'123456',
    access:'User'
  },
  {
    maKhachHang: '1700877353500',
    hoTen: 'Hà Tường Vy',
    email: 'hatuongvy456@gmail.com',
    diaChi: 'Thành phố Hồ Chí Minh',
    dienThoai: '0798432156',
    tenDangNhap: 'hatuongvy456',
    password :'123456',
    access:'User'
  },
  {
    maKhachHang: '1700877353501',
    hoTen: 'Trần Thị Thu Huyền',
    email: 'tranthithuhuyen123@gmail.com',
    diaChi: 'Thành phố Hồ Chí Minh',
    dienThoai: '0798345621',
    tenDangNhap: 'tranthithuhuyen123',
    password :'123456',
    access:'User'
  },
  {
    maKhachHang: '1700877353502',
    hoTen: 'Trần Vỹ Kiệt',
    email: 'tranvykiet789@gmail.com',
    diaChi: 'Thành phố Hồ Chí Minh',
    dienThoai: '0987654321',
    tenDangNhap: 'tranvykiet789',
    password :'123456',
    access :'User'
  },
  {
    maKhachHang: '1700877353503',
    hoTen: 'Nguyễn Tuấn Anh',
    email: 'nguyentuananh012@gmail.com',
    diaChi: 'Thành phố Hồ Chí Minh',
    dienThoai: '0342257891',
    tenDangNhap: 'nguyentuananh012',
    password :'123456',
    access :'User'
  },
  {
    maKhachHang: '1700877353504',
    hoTen: 'Nguyễn Văn Kiệt',
    email: 'nguyenvane0123@gmail.com',
    diaChi: 'Nha Trang',
    dienThoai: '0998786751',
    tenDangNhap: 'nguyenvan_k012',
    password :'123456',
    access :'User'
  },
  {
    maKhachHang: '1700877353505',
    hoTen: 'Nguyễn Tuấn Anh',
    email: 'nguyenvanta012@gmail.com',
    diaChi: 'Huế',
    dienThoai: '0345678932',
    tenDangNhap: 'nguyenvan_anh012',
    password :'123456',
    access :'User'
  },
  {
    maKhachHang: '1700877353506',
    hoTen: 'Nguyễn Thu Huyền',
    email: 'nguyenvane012@gmail.com',
    diaChi: 'Hà Tĩnh',
    dienThoai: '0987687889',
    tenDangNhap: 'nguyenhuyen_e012',
    password :'123456',
    access :'User'
  },
  {
    maKhachHang: '1700877353507',
    hoTen: 'Nguyễn Thu Huyền Linh',
    email: 'nguyenlinh012@gmail.com',
    diaChi: 'Đà Nẵng',
    dienThoai: '0342657892',
    tenDangNhap: 'nguyenlinh_e0129',
    password :'123456',
    access :'User'
  },
  {
    maKhachHang: '1700877353508',
    hoTen: 'Nguyễn Thu Huyền Anh',
    email: 'nguyenhuyen0128@gmail.com',
    diaChi: 'Hà Nội',
    dienThoai: '0342657891',
    tenDangNhap: 'nguyenhuyen_e0128',
    password :'123456',
    access :'User'
  }
];

hienThiDanhSachKhachHang(1);


function checkPasswordMatch() {
  const password = document.getElementById("password1").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const passwordMatchMessage = document.getElementById("password-match-message");

  if (password !== confirmPassword) {
    passwordMatchMessage.innerHTML = "Mật khẩu không khớp";
    return false;
  } else {
    passwordMatchMessage.innerHTML = ""; // Xóa thông báo lỗi
    return true;
  }
}


// Hàm kiểm tra định dạng email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitFormDataRegister(event) {
  // Lấy giá trị từ các trường nhập liệu
  let hoTen = document.getElementById("ho_ten").value;
  let email = document.getElementById("email").value;
  let diaChi = document.getElementById("dia_chi").value;
  let dienThoai = document.getElementById("dien_thoai").value;
  let tenDangNhap = document.getElementById("username1").value;
  let password = document.getElementById("password1").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  // Kiểm tra xem các trường có được nhập đầy đủ không
  if (!hoTen || !email || !diaChi || !dienThoai || !tenDangNhap || !password || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return false;
  }

  // Kiểm tra định dạng email
  if (!isValidEmail(email)) {
    alert("Vui lòng nhập một địa chỉ email hợp lệ.");
    document.getElementById("email").focus();
    return false;
  }

  // Kiểm tra mật khẩu và mật khẩu nhập lại có khớp nhau không
  if (password !== confirmPassword) {
    alert("Mật khẩu và mật khẩu nhập lại không khớp.");
    document.getElementById("confirmPassword").focus();
    return false;
  }

  // Kiểm tra độ dài mật khẩu
  if (password.length < 6) {
    alert("Mật khẩu phải chứa ít nhất 6 ký tự.");
    document.getElementById("password1").focus();
    return false;
  }

  // Dữ liệu khách hàng
  let dulieuKH = [];

  if (localStorage.getItem('dulieuKH')) {
    dulieuKH = JSON.parse(localStorage.getItem('dulieuKH'));
  }

  // Tạo đối tượng khách hàng
  let itemCustomer = {
    maKhachHang: new Date().getTime(),
    hoTen: hoTen,
    email: email,
    diaChi: diaChi,
    dienThoai: dienThoai,
    tenDangNhap: tenDangNhap,
    password: password
  };

  // Thêm đối tượng khách hàng vào mảng
  dulieuKH.push(itemCustomer);

  // Lưu mảng vào localStorage
  localStorage.setItem('dulieuKH', JSON.stringify(dulieuKH));

  // Hiển thị thông báo đăng ký thành công
  alert("Đăng ký thành công!");
  changeTabs1('index')
}


function checkLogin() {
  // Lấy thông tin đăng nhập từ trường input
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Lấy dữ liệu người dùng từ localStorage
  let userData = JSON.parse(localStorage.getItem('dulieuKH')) || [];
  // Kiểm tra xem người dùng có tồn tại không
  let foundUser = null;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].tenDangNhap == username) {
      foundUser = userData[i];
      break;
    }
  }

  
  if (foundUser && foundUser.password === password) {
 
    localStorage.setItem("user_login", JSON.stringify(foundUser));
    alert("Đăng nhập thành công!");
    loadtranglogin()
    changeTabs1('index')
    scroll(0,0)
    
  } else {
    
    alert("Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.");
   
  }
}

function handleSuccessfulLogin(user) {
  // Ẩn form đăng nhập
  document.getElementById("dangnhap").style.display = "none";

  // Ẩn nút "Đăng nhập" và hiển thị nút "Đăng xuất"
  document.getElementById("loginNavItem").style.display = "none";
  document.getElementById("logoutNavItem").style.display = "block";

  // Hiển thị tên người dùng trong thẻ "userGreeting"
  let userGreeting = document.getElementById("userGreeting");
  userGreeting.innerText = `Xin chào ${user.hoTen}!`;
  userGreeting.style.display = "block";

  // // Kiểm tra loại tài khoản (access)
  if (user.access === 'Admin') {
   window.location.href="./admin.html"
  
  } else {
    }
  }
function logout() {
  var confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất?");
  if (confirmLogout) {  
 
    localStorage.setItem("user_login", JSON.stringify({}));
  
    window.location.href = "./user.html"
    
  } else {
    // Xử lý trường hợp người dùng hủy bỏ đăng xuất
  }

}
