import React from "react";
import { useEffect, useState } from "react";
import pgimg from "../../assets/pg.jpg";
import logo from "../../assets/logo-img-1.png";
import "./Home.css";
import Tilt from "react-parallax-tilt";

export default function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="hero">
      <nav className="nav">
        <div className="nav-left">
          <a href="/">
            <img src={logo} alt="logo" height={100} width={100} />
          </a>
        </div>
        <div className="nav-right">
          <a href="/login">
            <button className="login-btn">Login</button>
          </a>
        </div>
      </nav>
      <div className="hero-cont">
        <div className={`hero-left ${animate ? "animate" : ""}`}>
          <h1>
            Discover your <br />
            dream PG today
          </h1>
          <a href="/login">
            <button className="join-btn">Join Now</button>
          </a>
        </div>
        <Tilt className="tilt">
          <div className={`hero-right ${animate ? "animate" : ""}`}>
            <img className="cont-img" src={pgimg} alt="pg" />
          </div>
        </Tilt>
      </div>
    </div>
  );
}
