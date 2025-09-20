import React, { useState } from 'react';
import '../styles/App.css';
import { useNavigate } from "react-router-dom";

export default function CRISPR() {
    const navigate = useNavigate();
    return (
        <div className='desc-container'>
            <button className="ex" onClick={() => navigate("/")}>
            X
            </button>
            <h1 style={{fontSize: '5em'}}>What is CRISPR-Cas9?</h1>

            <p>Welcome, Scientist! Your mission is to perform genetic surgery. Your tools? The 
                evolutionary CRISPR-Cas9 system. Think of it as a pair of molecular scissors (Cas9) 
                guided by a super-smart GPS (the gRNA) that takes it to the exact spot in the genome you need to edit.
            <br></br>
            <br></br>

            Your job is to choose the right tools for the operation. Here’s how it works:

            <br></br>
            <br></br>
            <br></br>

            <h1 style={{fontSize: '2em'}}>1. Find the Right GPS (Choose the gRNA)</h1>
            The gRNA (guide RNA) is designed to be a perfect genetic match for one 
            specific site on our target DNA sequence via complementary base pairing. 
            This means, Adenine (A) pairs with Thymine (T), while Guanine (G) pairs with 
            Cytosine (C)  . Your task is to look at the target DNA and select the correct gRNA 
            from your toolkit. The right one will lock on perfectly!
            <br></br>
            <br></br>
            Once the correct gRNA guides it to the target, the Cas9 enzyme snaps into action and 
            makes a precise cut in the DNA. In real life, the target site also needs a special short 
            tag called a PAM sequence for Cas9 to recognize it. For this mission, we are assuming that 
            our gRNA has the correct PAM sequence with the target sequence, so you can focus on matching the gRNA!
            
            <hr style={{margin: '50px'}}></hr> 

            <h1 style={{fontSize: '2em'}}>2.  Provide the Patch (Choose the Repair Template)</h1>
            The cut triggers the cell's repair system. This is your chance to rewrite the genetic code!
            <br></br>
            <br></br>
            We will provide you with repair templates - a new piece of DNA you want to insert. 
            This template has special homology arms (shown as …….) on each end, which match the 
            sequences around the cut site, acting like handles that slot your new DNA into exactly 
            the right place. Your Task is to choose the repair template with the correct and the new genetic 
            code you want to install. In one mission, you will be tested for the understanding of how to revert 
            back the diseased sequence to the normal, healthy sequence. 

            <hr style={{margin: '50px'}}></hr> 

            <h1 style={{fontSize: '2em'}}>In summary, your step-by-step missions are: </h1>
            <ol>
                <li>GUIDE: Choose the gRNA that is complementary to the target sequence.</li>
                <li>REPAIR: Choose the Repair Template with the right handles (...) and the new code to fix the break correctly.</li>
            </ol>
            <br></br>
            <br></br>
            <h1 style={{fontSize: '3em', textAlign: 'center'}} >The future of this cell is in your hands. Good luck!!!</h1>
            </p>
        </div>
    )
}