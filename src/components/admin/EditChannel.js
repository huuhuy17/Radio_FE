import React from "react";
import axios from "axios";

export default function EditChannel(old_name){
    // Sửa kênh
        alert("Bạn đang sửa kênh " + old_name)
        const alter_channel = () =>{
            let new_icon = document.getElementById('inputIcon').value;
            let new_name = document.getElementById('inputEmail4').value;
            let new_link = document.getElementById('inputPassword4').value;
            let new_type = document.getElementById('inputType').value;
            const alter_toDB = async () => {
                const data = {
                    old_name: old_name,
                    new_name: new_name,
                    new_icon: new_icon,
                    new_link: new_link,
                    new_type: new_type
                }
                const result = await axios.post('http://127.0.0.1:5000/alterChannel',data)
                return result
            }
            alter_toDB().then((res) =>{
                console.log(res);
                alert("Sửa kênh thành công!")
            })
        }
  return(
      <div>
          <form>

              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label htmlFor="inputIcon">New Icon</label>
                      <input
                          type="text"
                          className="form-control"
                          id="inputIcon"
                          placeholder="Nhập icon mới"
                      />
                  </div>
                  <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">New Name</label>
                      <input
                          type="text"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Nhập tên mới cho kênh "
                      />
                  </div>
                  <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">New Link</label>
                      <input
                          type="text"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="Đường dẫn mới"
                      />
                  </div>
                  <div className="form-group col-md-6">
                      <label htmlFor="inpuType">New type</label>
                      <input
                          type="text"
                          className="form-control"
                          id="inputType"
                          placeholder="Loại kênh mới"
                      />
                  </div>
              </div>
              <button type="submit" id="submitChannel" className="btn btn-primary" onClick={() => alter_channel()}>
                  Lưu thay đổi
              </button>
          </form>

      </div>
  )
}
