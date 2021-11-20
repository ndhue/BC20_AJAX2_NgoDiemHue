function UserService(){
    this.arr = [];
    this.getListUserApi = function (){
        //lấy danh sách sản phẩm từ server
        /**
         * axios trả về đối tượng Promise
         * - pending: chờ
         * - resolve: thực hiện
         * - reject: thất 
         * - js đơn luồng -> giải quyết bất đồng bộ đợi data trả về
         */
        return axios({
            url: "https://6183cac591d76c00172d1b4d.mockapi.io/api/quanlynguoidung",
            method: "GET",
        });
    };
    this.deleteUserApi = function(id){
        return axios({
            url: `https://6183cac591d76c00172d1b4d.mockapi.io/api/quanlynguoidung/${id}`,
            method: "DELETE",
        });
    };

    this.addUserApi = function(user){
        return axios({
            url: "https://6183cac591d76c00172d1b4d.mockapi.io/api/quanlynguoidung",
            method: "POST",
            data: user
        });
    };

    this.getUserById = function(id){
        return axios({
            url: `https://6183cac591d76c00172d1b4d.mockapi.io/api/quanlynguoidung/${id}`,
            method: "GET",
        });
    };
    
    this.updateUserApi = function(user){
        return axios({
            url: `https://6183cac591d76c00172d1b4d.mockapi.io/api/quanlynguoidung/${user.id}`,
            method: "PUT",
            data: user
        });
    }
}