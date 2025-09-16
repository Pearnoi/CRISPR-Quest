import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';

export default function INSTRUCTIONS() {
    const navigate = useNavigate();
    return (
        <div className='desc-container'>
            <button className="ex" onClick={() => navigate("/")}>
            X
            </button>
            <h1 style={{fontSize: '5em', textAlign: 'center'}}>Game Instruction</h1>

            <p>Welcome, Scientist! Your mission is to use the power of CRISPR-Cas9 to edit 
                genes and solve real-world problems. Get ready to save lives, clean the planet, and feed the future!
            <br></br>
            <br></br>
            Your Mission (Choose One!):
            <br></br>
            <br></br>
            <strong>A. Medical Mission "Save Sam": Correct a mutation in Sam's DNA that causes sickle cell anemia.</strong>
            <br></br>
            <br></br>
            <strong>B. Environmental Mission "Clean the Planet": Edit the DNA of bacteria to supercharge an enzyme that breaks down plastic waste.</strong>
            <br></br>
            <br></br>
            <strong>C. Agricultural Mission "Feed the Future": Edit a gene in maize to help it survive drought and grow stronger.</strong>
            <br></br>
            <br></br>
            No matter which mission you choose, the gene-editing process is the same. You can choose the other missions once you complete one mission. Follow these steps to succeed!
            </p>

            <hr style={{margin: '50px'}}></hr>

            <h1 style={{fontSize: '5em', textAlign: 'center'}}>How To Play?</h1>
            <p>
            <strong>Step 1</strong>: Identify the mutation from a sequence of DNA bases (A, T, C, G). The mutated region will be highlighted in red color. 
            Make sure you study this sequence carefully. 
            <br></br>
            <br></br>
            <strong>Step 2</strong>: Select your guide RNA (gRNA) that is perfectly complementary with the mutated DNA sequence and drag it 
            to the targeted mutation site. Remember, A pairs with U, and C pairs with G. 
            <br></br>
            <br></br>
            <strong>Step 3</strong>: Choose the repair template once Cas9 makes the cut to repair the DNA. It should be identical to 
            the coding strand (in step 1) but without mutation. This healthy blueprint will rewrite the DNA sequence correctly. 
            <br></br>
            <br></br>
            No matter which mission you choose, the gene-editing process is the same. You can choose the other missions once you complete one mission. Follow these steps to succeed!
            </p>

            <hr style={{margin: '50px'}}></hr>

            <h1 style={{fontSize: '5em', textAlign: 'center'}}>Win or Lose</h1>
            <p>
            You start with 3 hearts. One mistake will cost one heart. If you lose all hearts, you fail the mission. 
            Make sure to follow the hints. <strong>GOOD LUCK!!!</strong>
            </p>


        </div>
    )
}