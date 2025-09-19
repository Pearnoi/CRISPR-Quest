import React, { useState } from 'react';
import '../styles/App.css';

export default function CRISPR() {
    return (
        <div className='desc-container'>
            <h1 style={{fontSize: '5em'}}>What is CRISPR-Cas9?</h1>

            <p>Imagine DNA as an instruction book that tells every cell in your 
                body how to work. But, sometimes it has typos: mistakes in the letters 
                of DNA (<strong>A</strong>denosine, <strong>T</strong>hymine, <strong>G</strong>uanine, and <strong>C</strong>ytosine)

            <br></br>
            <br></br>

            That’s where the new gene-editing technology “CRISPR-Cas9” comes in! 
            <br></br>
            <ul>
                <li>Cas9 is like a pair of scissors that can cut DNA</li>
                <li>CRISPR is the system that helps Cas9 know exactly where to cut</li>
            </ul>

            <br></br>
            So together, CRISPR-Cas9 is like scissors for scientists to edit and change a part of the DNA sequence.
            </p>

            <hr style={{margin: '5vw'}}></hr>

            <h1 style={{fontSize: '5em', textAlign: 'center'}}>Guide RNA</h1>

            <p>But how does Cas9 know where to cut? That’s the job of the guide RNA (gRNA)
                <ul>
                    <li>The guide RNA has letters (Adenosine, Uracil, Guanine, and Cytosine) 
                        that must pair perfectly with the DNA target (Adenosine, Thymine, Guanine, and Cytosine)</li>
                    <li>CRISPR is the system that helps Cas9 know exactly where to cut
                        <ul>
                            <li>In DNA, A pairs with T</li>
                            <li>In RNA, A pairs with U</li>
                            <li>In both DNA and RNA, C pairs with G</li>
                        </ul>
                    </li>
                </ul>

                <br></br>

                Only when the guide RNA perfectly matches up with the DNA target, Cas9 will cut.
                <br></br>
                <br></br>
                Example: 
                <ul>
                    <li>DNA target: ATCG </li>
                    <li>Guide RNA: UAGC → Perfect match! Cas9 cuts. </li>
                </ul>
                
                <br></br>

                Wrong match: 
                <ul>
                    <li>DNA target: ATCG</li>
                    <li>Guide RNA: UACC → Doesn’t fit. No cut.</li>
                </ul>
            </p>

            <hr style={{margin: '5vw'}}></hr>

            <h1 style={{fontSize: '5em', textAlign: 'center'}}>Repair Template</h1>

            <p>Once Cas9 cuts, the cell wants to repair the DNA. Scientists can provide a repair template: 
                a piece of DNA that looks almost identical to the broken spot, but with typos corrected
            
                <ul>
                    <li>The repair template must also follow complementary base pairing rules</li>
                    <li>If it fits well, the cell uses it as a puzzle piece to patch the cut → fix typos, and add new instructions to the DNA</li>
                </ul>

                Example (fixing a typo):
                <ul>
                    <li>Original DNA (mistake): A T T G C</li>
                    <li>Repair template: A C T G C → The middle T is corrected to C. </li>
                </ul>

                Wrong template:
                <ul>
                    <li>Repair template: G G G G G → Doesn’t fit, cell rejects it.</li>
                </ul>
            </p>

            <hr style={{margin: '5vw'}}></hr>

            <h1 style={{fontSize: '5em', textAlign: 'center'}}>In CRISPR-Quest</h1>
            <p>
            <ul>
                <li>Use the guide RNA to find the right spot for Cas9 to cut in the DNA</li>
                <li>Then choose the correct repair template to patch it up</li>
            </ul>
            </p>
        </div>
    )
}