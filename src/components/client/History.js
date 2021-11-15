import React, { useEffect } from "react";
import axios from "axios";
import reactDom from "react-dom";

function callGetHistory() {
  const get_History = async () => {
    const data = {
      id_user: document.cookie,
    };
    const result = await axios.post("http://127.0.0.1:5000/getHistory", data);
    return result;
  };
  get_History().then((res) => {
    const newArr = res.data.channel.map(function (num) {
      return (
          <tr>
            <td>{num.channel_name}</td>
            <td>{num.time}</td>
          </tr>
      );
    });
    reactDom.render(newArr, document.getElementById("show-history"));
  });
}
function History() {
  useEffect(() => {
    callGetHistory()
  },[])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div
          className="collapse navbar-collapse bg-secondary"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                href="/client"
                className="nav-link p-3 mb-2 text-white home-click"
              >
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Tên kênh</th>
            <th scope="col">Thời gian</th>
          </tr>
        </thead>
        <tbody id="show-history">

        </tbody>
      </table>
    </div>
  );
}

export default History;