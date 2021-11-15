import React, {useState} from "react";
import "./Channel.css";
import axios from "axios";
import {Howl} from "howler";
import reactDom from "react-dom";
import playButton from '../../Icon/play-button-arrowhead.png'
import hearted from '../../Icon/hearted.png'
import pauseButton from '../../Icon/video-pause-button.png'

function Channel(props) {
  // const [play, setPlay] = useState(playButton)

  let sound = 0,
    playing = 0;
  const callPlayAudio = (channel_name) => {
    const getAudio = async () => {
      const data = {
        c_name: channel_name,
      };
      const result = await axios.post("http://127.0.0.1:5000/getAudio", data);
      return result;
    };
    getAudio().then((res) => {
      sound = new Howl({
        src: [res.data],
        html5: true,
        volume: 0.5,
      });
      sound.play();
    });
  };
  function isPlaying() {
    const html = <p>Playing now: {props.name}</p>;
    reactDom.render(html, document.getElementById("is-playing"));
  }
  function isNotPlaying() {
    const html = <p/>;
    reactDom.render(html, document.getElementById("is-playing"));
  }
  let html1 = <div/>;
  let isLiked = 0;
  const callADD = (id_channel) => {
    const add_favorite_channel = async () => {
      const data = {
        id_user: document.cookie,
        id_channel: id_channel
      };
      console.log(id_channel, document.cookie)
      return await axios.post(
          "http://127.0.0.1:5000/addFavoriteChannel",
          data
      );
    };
    add_favorite_channel().then((res) => {
      console.log(res);
      if (res.data === "1") {
        alert("Đã thêm vào danh sách kênh yêu thích");
        html1 = <div>Dislike</div>;
        isLiked = 1;
      } else {
        alert("Đã xóa khỏi danh sách kênh yêu thích");
        html1 = <div>Like</div>;
        isLiked = 0;
      }
    });
  };

function callAddHistory(id_channel) {
  const addHistory = async () => {
    const data = {
      id_user: document.cookie,
      id_channel: id_channel 
    }
    const result = await axios.post("http://127.0.0.1:5000/addToHistory",data)
    return result
  }
  addHistory().then((res) => {
    console.log(res)
  })
}

  return (
    <div>
      <div id="is-playing"/>
      <div className="radio-box=">
        <div className="">
          <div className="iphone neu">
            <div className="album-cover">
              <div className="album-overlay" />
              <img src={props.icon} alt="" className="img-channel"/>
              <h2 className="song-title">{props.name}</h2>
              <div className="title-artist">
                <h3 className="artist-title">{props.type}</h3>
              </div>

            </div>
            <div className="buttons">
              <button
                className="btn lg red btn-default neu"
                id="is-Liked"
                type="submit"
                onClick={() => {
                  callADD(props.id_channel);
                }}
              >
                <img src={hearted} className="heart-button"/>
              </button>
              <button
                className="btn lg btn-default neu"
                onClick={() => {
                  if (playing == 0) {
                    callPlayAudio(props.name);
                    callAddHistory(props.id_channel);
                    playing = 1;
                    isPlaying();
                  }
                }}
              >
                <img src={playButton} className="play-button"/>
              </button>
              <button
                className="btn lg btn-default neu"
                onClick={() => {
                  if (playing === 1) {
                    sound.pause();
                    playing = 0;
                    isNotPlaying();
                  };
                }}
              >
                <img src={pauseButton} className="pause-button-img"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channel;
