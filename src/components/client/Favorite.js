import React, {useEffect} from "react";
import Channel from "./Channel";
import axios from "axios";
import reactDom from "react-dom";
import api from "../api";

function Favorite() {
    useEffect(()=>{
        callShowFavorite();
    },[])
  const callShowFavorite = () => {
    const show_favorite_channel = async () => {
      const data = {
        id_user: document.cookie,
      };
      return await axios.post(
          api + "/showFavoriteChannel",
          data
      );
    };
    show_favorite_channel().then((res) => {
      const list_channel = res.data.channel.map(function (num) {
        return (
          <Channel
            icon={num.icon}
            name={num.name}
            type={num.type}
            link={num.link}
            id_channel={num.id_channel}
          />
        );
      });
      reactDom.render(list_channel, document.getElementById("channel-box"));
    });
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
              <a
                className="nav-link p-3 mb-2 text-white home-click"
                href = '/client'
              >
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="nav flex-column nav-pills float-start"
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
          >
            {" "}
            Thể loại 1
          </a>
          <a
            className="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            href="#"
            role="tab"
            aria-selected="false"
          >
            Thể loại 2
          </a>
          <a
            className="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#"
            role="tab"
            aria-selected="false"
          >
            Thể loại 3
          </a>
          <a
            className="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#"
            role="tab"
            aria-selected="false"
            onClick={() => {
              callShowFavorite();
            }}
          >
            Danh sách kênh yêu thích
          </a>
          <a
            className="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="/history"
            role="tab"
            aria-selected="false"
          >
            Lịch sử nghe
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
        <div className="row mt-15" id="list-something"></div>
      </div>

      <div className="flex-container" id="channel-box"></div>
    </div>
  );
}

export default Favorite;
