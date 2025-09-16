import React, { useState } from 'react';
import '../styles/App.css';
import { useNavigate } from "react-router-dom";

export default function DESCRIPTION() {
    const navigate = useNavigate();
    return (
        <div className='desc-container'>
            <button className="ex" onClick={() => navigate("/")}>
            X
            </button>
            <h1 style={{fontSize: '5em'}}>NPM ZERO</h1>

            <p>Everyday life depends on energy, but most of it comes from fossil fuels, which pollute the air, 
                cause climate change, and will eventually run out. Renewable sources like solar and wind are cleaner, but they need a lot of space. 
                That’s why our team is working on a new solution: using engineered bacteria to produce clean hydrogen fuel in a small space.
            <br></br>
            <br></br>
            Our project has three main steps:
            <br></br>
            <br></br>
            <strong>1. Capturing Energy with the NPM System</strong>
            <br></br>
            We engineer  E. coli with special proteins that work like a tiny solar panel. These proteins capture light and electrons, which the bacteria can then use as energy.
            <br></br>
            <br></br>
            <strong>2. Turning Waste into Useful Material</strong>
            <br></br>
            The bacteria convert carbon dioxide and other small molecules into formate (a simple chemical), which is safe and can be stored.
            <br></br>
            <br></br>
            <strong>3. Making Hydrogen Fuel</strong>
            <br></br>
            Finally, the formate is transformed into hydrogen gas by a natural bacterial system. We improve this system with gene editing to produce more hydrogen. 
            <br></br>
            <br></br>
            The result? A living system that can make clean, renewable hydrogen fuel without releasing carbon dioxide, helping us move towards a greener future.
            </p>
        </div>
    )
}