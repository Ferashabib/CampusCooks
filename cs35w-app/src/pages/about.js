import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase_setup/firebase"
import GetData from "../data/getdata";
import { useEffect, useState } from "react";



const About = () => {
  return (
    <div>
      <h1 className="card">  <GetData collection="recipeAppAbout" document="about" field="headline" /></h1>
      <h3 className="card">  <GetData collection="recipeAppAbout" document="about" field="introduction" /></h3>
    </div>
  );
};

export default About;