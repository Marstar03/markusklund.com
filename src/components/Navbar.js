//import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React from 'react';
import '../styling/Navbar.css';

export default function Navbar() {
  return (

    <div class="topnav" id="myTopnav">
        <a href="#contact">Contact</a>
        <a href="#about">About Me</a>
        <a href="#about">Log In</a>
        <a href="#home">Home</a>
    </div>
    );
}

