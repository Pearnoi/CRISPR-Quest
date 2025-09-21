import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import RepairTemplateChoice from './RepairTemplateChoice';

export default function SAMGRNAEXP({hearts, time, setHearts, onDead, onPauseTimer}) {
    const [samStarted, setSamStarted] = useState(false);

    useEffect(() => {
        console.log('SAMGRNAEXP mounted - pausing timer');
        onPauseTimer(false); 
        
        return () => {
            console.log('SAMGRNAEXP unmounting - resuming timer');
            onPauseTimer(true); 
        };
    }, [onPauseTimer]);

    const handleNextClick = () => {
        setSamStarted(true);
    };

    if (samStarted) {
        return <RepairTemplateChoice hearts={hearts} time={time} setHearts={setHearts} onDead={onDead} onPauseTimer={onPauseTimer}/>;
      }

    return (
        <div className='desc-container'>
            <button className="ex" onClick={handleNextClick}>
            <u>Next</u>
            </button>
            <h4 style={{fontSize: '2em', textAlign: 'center', marginTop: '20px', color: 'blue'}}>Targeted DNA strand: 5’- <u>GTG</u>GAGAAGTCTGCCGTTAC -3’ </h4> 
            <p>
               <p><strong>Explanation</strong></p> 
                One of the reasons for sickle cell anemia is a point mutation of A to T in GAG codon 
                of HBB gene (the underlined part), which changes its amino acid from glutamic acid to 
                valine in the beta-globin chain of hemoglobin. This results in the production of abnormal 
                hemoglobin (HbS), causing red blood cells to become sickle-shaped and less flexible, hence 
                onset of sickle cell disease. 
            <br></br>
            <br></br>
            <p><strong>gRNA</strong></p>
            <strong style={{color: 'green'}}>Correct gRNA sequence: 3’- CACCTCTTCAGACGGCAATG -5’ </strong>
            <br></br>
                <strong style={{color: 'red'}}>faulty gRNA sequence: <br></br>
                i. 3’-CACCTCT<u>G</u>CAGACGGCAATGCT-5’<br></br>
                ii. 3’-CACCTCTTCAGA<u>AGA</u>CGGCAATGCT-5’</strong>
            <br></br>
            <br></br>
            <p><strong>Reason</strong></p>
            gRNA should be complementary to the targeted DNA sequence for our molecular 
            scissor (Cas 9 protein) to make a cut in the targeted DNA sequence. Basically, it 
            provides a signal that tells Cas9 protein, our molecular scissor, "This is the correct 
            site, proceed with the cut." Correct gRNA sequence is perfectly complementary to the targeted 
            sequence, i.e., Adenine pairs up with Thymine (A-T), and Cytosine pairs up with Guanine (C-T). 
            <br></br>
            <br></br>
            Now, let’s look at the <strong>faulty gRNA sequences</strong>. 
            <br></br>
            <br></br>
            i. <strong style={{color: 'red'}}>3’-CACCTCT<u>G</u>CAGACGGCAATGCT-5’</strong> has a single point mutation at the 15th position (reading from 
            5’ side), where it is changed from T to G. Since the 15th position of targeted sequence is A, this
            mutation won’t allow you to form complementary pairing. 
            <br></br>
            <br></br>
            ii. <strong style={{color: 'red'}}>3’-CACCTCTTCAGA<u>AGA</u>CGGCAATGCT-5’</strong> has insertion of codon AGA after the 10th position (reading from 
            5’ side). This insertion disrupts the complementary pairing, hence you cannot proceed with cutting. 
            </p>
        </div>
    )
}