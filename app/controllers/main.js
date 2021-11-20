var service = new UserService();
var valid = new Validation();
var mangND = [];
function getListUser(){
    service
    .getListUserApi()
    .then(function(result){
        renderData(result.data);
        mangND = result.data;
        
    })
    .catch(function(error){
        console.log(error);
    });
}
getListUser();

function getELE(id){
    return document.getElementById(id);
}
function renderData(data){
    var html = "";
    data.forEach(function(item){
        html += 
        `<tr>
            <td>${item.id}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngonNgu}</td>
            <td>${item.loaiND}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteRow(${item.id})">Xóa</button>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser(${item.id})">Xem</button>
            </td>
        </tr>`;
    });
    getELE("tblDanhSachNguoiDung").innerHTML = html;
}

function deleteRow(id){
    console.log(id);
    service.deleteUserApi(id)
    .then(function(){
        //làm mới dữ liệu từ server
        getListUser();
    })
    .catch(function(error){
        console.log(error);
    });
}

getELE("btnThemNguoiDung").addEventListener("click",function(){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";

    var footer = `<button class="btn btn-success" onclick="addUser()">Thêm</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function addUser(){
    service
    .getListUserApi()
    .then(function(result){
        renderData(result.data);
        mangND = result.data;
        var taiKhoan = getELE("TaiKhoan").value;
    var ten = getELE("HoTen").value;
    var mk = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinhAnh = getELE("HinhAnh").value;
    var loaiND = getELE("loaiNguoiDung").value;
    var loaiNN = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;
    var isValid = true;
    isValid &= valid.checkEmpty(taiKhoan,"Tài khoản không được để trống","tbTaiKhoan") && valid.checkUser(taiKhoan,"Tài khoản không được trùng","tbTaiKhoan",mangND);
    isValid &= valid.checkEmpty(ten,"Tên không được để trống","tbTen")&& valid.checkName(ten,"Tên không hợp lệ","tbTen");
    //check email
    isValid &= valid.checkEmpty(email,"Email không được để trống","tbEmail") && valid.checkEmail(email,"Email không hợp lệ","tbEmail");
    // check password
    isValid &= valid.checkEmpty(mk,"Mật khẩu không được để trống","tbMatKhau") && valid.checkPass(mk,"Mật khẩu không hợp lệ","tbMatKhau");
    //check hinh anh
    isValid &= valid.checkEmpty(hinhAnh,"Hình ảnh không được để trống","tbHinhAnh");
    // check loai nguoi dung va ngon ngu
    isValid &= valid.checkSelect("loaiNguoiDung","Hãy chọn loại người dùng","tbLoaiND");
    isValid &= valid.checkSelect("loaiNgonNgu","Hãy chọn ngôn ngữ","tbNgonNgu");
    isValid &= valid.checkEmpty(moTa,"Mô tả không được để trống","tbMoTa") && valid.checkDescription(moTa,"Quá độ dài giới hạn","tbMoTa");
    if(isValid){
        var user = new User("",taiKhoan,ten,mk,email,loaiND,loaiNN,moTa,hinhAnh);
        service
        .addUserApi(user)
        .then(function(){
            document.getElementsByClassName("close")[0].click();
            getListUser();
        })
        .catch(function(error){
            console.log(error);
        });
    }
    })
    .catch(function(error){
        console.log(error);
    });
    
}

function editUser(id){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Cập nhật người dùng";
    var footer = `<button class="btn btn-success" onclick="updateUser(${id})">Cập nhật</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    service.getUserById(id)
    .then(function(result){
        getELE("TaiKhoan").value = result.data.taiKhoan;
        getELE("HoTen").value = result.data.hoTen;
        getELE("MatKhau").value = result.data.matKhau;
        getELE("Email").value = result.data.email;
        getELE("HinhAnh").value = result.data.hinhAnh;
        getELE("loaiNguoiDung").value = result.data.loaiND;
        getELE("loaiNgonNgu").value = result.data.ngonNgu;
        getELE("MoTa").value = result.data.moTa;
    })
    .catch(function(error){
        console.log(error);
    })
};

function updateUser(id){
    service
    .getListUserApi()
    .then(function(result){
        renderData(result.data);
        mangND = result.data;
        var taiKhoan = getELE("TaiKhoan").value;
    var ten = getELE("HoTen").value;
    var mk = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinhAnh = getELE("HinhAnh").value;
    var loaiND = getELE("loaiNguoiDung").value;
    var loaiNN = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;
    var isValid = true;
    isValid &= valid.checkEmpty(taiKhoan,"Tài khoản không được để trống","tbTaiKhoan") && valid.checkUser(taiKhoan,"Tài khoản không được trùng","tbTaiKhoan",mangND);
    isValid &= valid.checkEmpty(ten,"Tên không được để trống","tbTen")&& valid.checkName(ten,"Tên không hợp lệ","tbTen");
    //check email
    isValid &= valid.checkEmpty(email,"Email không được để trống","tbEmail") && valid.checkEmail(email,"Email không hợp lệ","tbEmail");
    // check password
    isValid &= valid.checkEmpty(mk,"Mật khẩu không được để trống","tbMatKhau") && valid.checkPass(mk,"Mật khẩu không hợp lệ","tbMatKhau");
    //check hinh anh
    isValid &= valid.checkEmpty(hinhAnh,"Hình ảnh không được để trống","tbHinhAnh");
    // check loai nguoi dung va ngon ngu
    isValid &= valid.checkSelect("loaiNguoiDung","Hãy chọn loại người dùng","tbLoaiND");
    isValid &= valid.checkSelect("loaiNgonNgu","Hãy chọn ngôn ngữ","tbNgonNgu");
    isValid &= valid.checkEmpty(moTa,"Mô tả không được để trống","tbMoTa") && valid.checkDescription(moTa,"Quá độ dài giới hạn","tbMoTa");
    if(isValid){
        var user = new User(id,taiKhoan,ten,mk,email,loaiND,loaiNN,moTa,hinhAnh);
        service
        .updateUserApi(user)
        .then(function(){
            document.getElementsByClassName("close")[0].click();
        getListUser();
        })
        .catch(function(error){
            console.log(error);
        });
        }
    })
    .catch(function(error){
        console.log(error);
    });
    
}