import React from "react";
import {Button} from "antd";
import mainImage from "../../images/main-image.jpg"
import "./home.scss";

const Home = (props: any) => {

  return (
    <div className="home-header">
      <div className="home-header-text-wrapper">
        <div className="home-header-text-1">
          설문조사 플랫폼
        </div>
        <div className="home-header-text-2">
          더 나은
          <br/> 개발 경험을 위해!
        </div>
        <div className="home-header-text-3">
          Duckgugong이 만든😎
          <br/> SPA & Restful API 기반 Survey Blue
        </div>
        <div className="home-header-button">
          <Button type="primary" size="large"
            onClick={()=>{
              props.history.push('/explain');
            }}
          >
            시작하기
          </Button>
        </div>
      </div>
      <div className="home-header-image">
        <img src={mainImage} alt=""/>
      </div>
    </div>
  )
}
export default Home;