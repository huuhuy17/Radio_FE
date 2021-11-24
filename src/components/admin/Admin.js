import axios from "axios";
import reactDom from "react-dom";
import ReactDOM from "react-dom";
import React from 'react';
import 'antd/dist/antd.css';
import {Button, Form, Input} from 'antd';
import api from "../api";

function Admin() {
  const add_channel = (values) =>{
    const add_toDB = async () => {
      const data = {
        c_icon: values.image,
        c_name: values.channel_name,
        c_link: values.link,
        c_type: values.type
      }
      return await axios.post(api+ '/addChannel', data)
    }
    add_toDB().then((res) =>{
      console.log(res);
      alert("Thêm kênh thành công!")
      const html1 = <div/>
      ReactDOM.render(html1,document.getElementById("alter-something"))
      show_radio()
    })
  }
  function show_radio(){

    const html1 = <div/>
    ReactDOM.render(html1,document.getElementById("alter-something"))
    // Thêm kênh
    const box_add_channel = () =>{
      const ADD = () => {
        const onFinish = (values) => {
          console.log('Success:', values);
          add_channel(values)
        };

        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

        return (
            <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
              <Form.Item
                  label="Ảnh kênh"
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập link ảnh',
                    },
                  ]}
              >
                <Input placeholder="Link ảnh"/>
              </Form.Item>

              <Form.Item
                  label="Tên kênh"
                  name="channel_name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên kênh',
                    },
                  ]}
              >
                <Input placeholder="Nhập tên kênh"/>
              </Form.Item>

              <Form.Item
                  label="Link kênh"
                  name="link"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập link streaming',
                    },
                  ]}
              >
                <Input placeholder="Link streaming"/>
              </Form.Item>

              <Form.Item
                  label="Thể loại kênh"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập thể loại kênh',
                    },
                  ]}
              >
                <Input placeholder="Nhập thể loại"/>
              </Form.Item>

              <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
              >
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
        );
      };
      ReactDOM.render(<ADD />, document.getElementById("alter-something"));
    };

    // Sửa kênh
    const box_alter_channel = (old_name) => {
      alert("Bạn đang sửa kênh " + old_name)
      const alter_channel = (values) =>{
        const alter_toDB = async () => {
          const data = {
            old_name: old_name,
            new_name: values.channel_name,
            new_icon: values.image,
            new_link: values.link,
            new_type: values.type
          }
          return await axios.post(api + '/alterChannel', data)
        }
        alter_toDB().then((res) =>{
          console.log(res);
          alert("Sửa kênh thành công!")
          const html1 = <div/>
          ReactDOM.render(html1,document.getElementById("alter-something"))
          show_radio()
        })

      }
      const ALTER = () => {
        const onFinish = (values) => {
          console.log('Success:', values);
          alter_channel(values)
        };
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

        return (
            <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
              <Form.Item
                  label="Ảnh kênh"
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập link ảnh',
                    },
                  ]}
              >
                <Input placeholder="Link ảnh"/>
              </Form.Item>

              <Form.Item
                  label="Tên kênh"
                  name="channel_name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên kênh',
                    },
                  ]}
              >
                <Input placeholder="Nhập tên kênh"/>
              </Form.Item>

              <Form.Item
                  label="Link kênh"
                  name="link"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập link streaming',
                    },
                  ]}
              >
                <Input placeholder="Link streaming"/>
              </Form.Item>

              <Form.Item
                  label="Thể loại kênh"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập thể loại kênh',
                    },
                  ]}
              >
                <Input placeholder="Nhập thể loại"/>
              </Form.Item>

              <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
              >
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
        );
      };
      ReactDOM.render(<ALTER/>, document.getElementById("alter-something"));
    };

    const delete_channel = (c_name) => {
        const del = async () => {
            const data = {
                channel_name: c_name
            }
          return await axios.post(api + '/deleteChannel', data)
        }
        del().then((res) => {
            alert("Đã xóa kênh!")
            show_radio()
        })
    }

    // Hiển thị các kênh
    const get_channel = async () => {
      return await axios.post(api + "/showChannel");
    };
    get_channel().then((res) => {
      console.log(res.data.channel)
      const list_channel = res.data.channel.map(function (num) {
        return (
          <tr>
            <th className="text-center" id="channelName">{num.name}</th>
            <th className="text-center">{num.link}</th>
            <th className="text-center">{num.type}</th>

            <th className="text-center">
              <Button type="dashed" onClick={() => box_alter_channel(num.name)} danger>
                Sửa
              </Button>
              <Button type="primary" onClick={() => delete_channel(num.name)} danger>
                Xóa
              </Button>
            </th>

          </tr>
        );
      });
      reactDom.render(list_channel, document.getElementById("list-channel"));
    });

    const html = (
      <div>
        <div className="row mt-15" id="alter-channel"/>
          <Button type="primary" onClick = {() => box_add_channel()} style={{marginBottom: 20, marginRight: 20}}>
            Thêm kênh
          </Button>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">Tên kênh</th>
                <th className="text-center">Link</th>
                <th className="text-center">Loại kênh</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <thead id="list-channel"/>
          </table>
        </div>
      </div>
    );
    ReactDOM.render(html, document.getElementById("list-something"));

  };

  // Hiển thị các tài khoản
  const show_account = () => {
    const html1 = <div/>
    ReactDOM.render(html1,document.getElementById("alter-something"))

    const box_alter_account = (id) => {
      alert("Bạn đang tài khoản id: " + id)
      const alter_account = () =>{
        let new_name = document.getElementById('inputEmail4').value;
        let new_pass = document.getElementById('inputPassword4').value;
        let new_type = document.getElementById('inputType').value;
        const alter_toDB = async () => {
          const data = {
            id: id,
            new_name: new_name,
            new_pass: new_pass,
            new_type: new_type
          }
          return await axios.post( api + '/alterAccount', data)
        }
        alter_toDB().then((res) =>{
          console.log(res);
          alert("Sửa tài khoản thành công!")
          const html1 = <div/>
          ReactDOM.render(html1,document.getElementById("alter-something"))
          show_account()
        })

      }
      const html = (
         <div>
          <form>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">New Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Nhập tên mới cho tài khoản "
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">New Pass</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Mật khẩu mới"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inpuType">New type</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputType"
                  placeholder="Loại tài khoản"
                />
              </div>
            </div>
            <br/>
            <Button type="primary" onClick = {() => alter_account()} style={{marginBottom: 20, marginRight: 20}}>
              Lưu thay đổi
            </Button>
          </form>

        </div>
      )
      ReactDOM.render(html, document.getElementById("alter-something"));
    };

    const delete_account = (id) => {
      const del = async () => {
          const data = {
              id: id
          }
        return await axios.post(api + '/deleteAccount', data)
      }
      del().then((res) => {
          alert("Đã xóa tài khoản!")
          show_account()
      })
  }

    const get_account = async () => {
      return await axios.post(api + "/showAccounts");
    };
    get_account().then((res) => {
      const list_channel = res.data.account.map(function (num) {
        return (
          <tr>
            <th className="text-center">{num.id}</th>
            <th className="text-center">{num.username}</th>
            <th className="text-center">{num.pass}</th>
            <th className="text-center">
              {num.acc_type === 1 ? "Quản trị viên" : "Người dùng"}{" "}
            </th>
            <th class="text-center">
              <Button type="dashed" onClick={() => box_alter_account(num.id)} danger>
                Sửa
              </Button>

              <Button type="primary" onClick={()=> delete_account(num.id)} danger>
                Xóa
              </Button>
            </th>
          </tr>
        );
      });
      reactDom.render(list_channel, document.getElementById("list-account"));
    });
    const box_add_account = () =>{
      const add_account = () =>{
        let username = document.getElementById('inputUserName').value;
        let pass = document.getElementById('inputPassword').value;
        let type = document.getElementById('inputType').value;

        const add_toDB = async () => {
          const data = {
            username: username,
            password: pass,
            acc_type: type
          }
          return await axios.post(api + '/addAccount', data)
        }
        add_toDB().then((res) =>{
          console.log(res);
          alert("Thêm tài khoản thành công!")
          const html1 = <div/>
          ReactDOM.render(html1,document.getElementById("alter-something"))
          show_account()
        })

      }

    const html = (
        <div>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputUserName">Tên</label>
              <input
                type="text"
                className="form-control"
                id="inputUserName"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Mật khẩu</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inpuType">Loại tài khoản</label>
              <input
                type="text"
                className="form-control"
                id="inputType"
                placeholder="Quản trị viên nhập 1/ Người dùng nhập 0"
              />
            </div>
          </div>
          <br/>
          <Button type="primary" onClick={() => add_account()} style={{marginBottom: 20, marginRight: 20}}>
            Lưu tài khoản
          </Button>
        </form>
      </div>
    )
    ReactDOM.render(html, document.getElementById("alter-something"));
  };

    const html = (
      <div>
        <br/>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Button type="primary" onClick={() => box_add_account()} style={{marginBottom: 20, marginRight: 20}}>
            Thêm tài khoản
          </Button>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Tên tài khoản</th>
                <th className="text-center">pass</th>
                <th className="text-center">Loại tài khoản</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <thead id="list-account"/>
          </table>
        </div>
      </div>
    );
    ReactDOM.render(html, document.getElementById("list-something"));

  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div
          className="collapse navbar-collapse bg-secondary"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link p-3 mb-2 text-white" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        class="nav flex-column nav-pills float-start"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <div>
          <a
            className="nav-link"
            id="v-pills-home-tab"
            data-toggle="pill"
            href="#"
            role="tab"
            aria-selected="false"
            onClick={() => show_radio()}
          >
            {" "}
            Quản lý kênh
          </a>
          <a
            className="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            href="#"
            role="tab"
            aria-selected="false"
            onClick={() => show_account()}
          >
            Quản lý tài khoản
          </a>
          <a
            className="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#"
            role="tab"
            aria-selected="false"

          >
            Tài khoản
          </a>
          <a
            className="nav-link"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="/login"
            role="tab"
            aria-selected="false"
          >
            Đăng xuất
          </a>
        </div>
      </div>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <div className="row mt-15" id="alter-something"/>
      </div>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <div className="row mt-15" id="list-something"/>
      </div>
    </div>
  );
}
export default Admin;
