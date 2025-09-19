import '../styles/App.css';
import DEAD from './DeadSam'
import CUTTING from './Cutting'
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

// Shared style for the sequence box to match the gRNA row as a single component
const sequenceBoxStyle = {
  minWidth: '480px',
  maxWidth: '900px',
  width: '60vw',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '3.5em',
  background: 'rgba(255,255,255,0.08)',
  borderRadius: '1em',
  boxSizing: 'border-box',
  fontSize: '1em',
  fontWeight: 500,
  letterSpacing: '0.04em',
  fontFamily: 'inherit',
  color: '#222',
  border: '2px solid #b3b3b3',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
};

export default function GRNA({ onNext, setScore }) {
    const [isBox2Locked, setIsBox2Locked] = useState(false);
    const [showNotice1, setShowNotice1] = useState(false);
    const [showNotice2, setShowNotice2] = useState(false);
    const [showNotice3, setShowNotice3] = useState(false);
    const [time, setTime] = useState(0);
    const [hearts, setHearts] = useState(3);
    const [hasDeductedHeart, setHasDeductedHeart] = useState(false);
    const [isDead, setIsDead] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const box1X = useMotionValue(0);
    const box1Y = useMotionValue(0);
    const box2X = useMotionValue(0);
    const box2Y = useMotionValue(0);
    const box3X = useMotionValue(0);
    const box3Y = useMotionValue(0);

     const deductHeart = () => {
         if (!hasDeductedHeart) { 
            setHearts(prevHearts => {
                const newHearts = Math.max(0, prevHearts - 1);
                if (newHearts === 0) {
                    setIsDead(true);
                }
                return newHearts;
            });
            setHasDeductedHeart(true); 
            setTimeout(() => setHasDeductedHeart(false), 1000); 
        } 
    };

    const handleDragEnd = () => {
        setHasDeductedHeart(false);
    };

    const showTemporaryNotice = (noticeNumber) => {
        switch(noticeNumber) {
            case 1:
                setShowNotice1(true);
                setTimeout(() => setShowNotice1(false), 2000); 
                break;
            case 2:
                setShowNotice2(true);
                setTimeout(() => setShowNotice2(false), 2000); 
                break;
            case 3:
                setShowNotice3(true);
                setTimeout(() => setShowNotice3(false), 2000); 
                break;
        }
    };
    
    const getMutatedRegionCenter = () => {
      const mutatedRegion = document.querySelector(".mutated-region");
      if (!mutatedRegion || isDead) return { x: 0, y: 0 };

      const rect = mutatedRegion.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,  
        y: rect.top + rect.height / 2,   
      };
    };

    const checkIfNearCenter = () => {
      if (isDead) return; 

      console.log("Dragging, checking distance...");
      const draggable = document.querySelector(".grna1 div");
      if (!draggable) return;

      const rectBox = draggable.getBoundingClientRect();

      const boxCenter = {
      x: rectBox.left + rectBox.width / 2,
      y: rectBox.top + rectBox.height / 2,
    };

    const mutatedCenter = getMutatedRegionCenter();
    const snapRadius = 25;

    const distance = Math.sqrt(
      Math.pow(boxCenter.x - mutatedCenter.x, 2) + 
      Math.pow(boxCenter.y - mutatedCenter.y, 2)
    );

    if (distance < snapRadius) {
      deductHeart();
      showTemporaryNotice(3);
      showTemporaryNotice(1);
      box1X.stop();
      box1X.set(0, { type: "spring", stiffness: 100 });
      box1Y.stop();
      box1Y.set(0, { type: "spring", stiffness: 100 });
    }
  };

  const checkIfNearCenterBox3 = () => {
    if (isDead) return; 

    console.log("Dragging box 3, checking distance...");
    const draggable = document.querySelector(".grna3 div");
    if (!draggable) return;

    const rectBox = draggable.getBoundingClientRect();

    const boxCenter = {
      x: rectBox.left + rectBox.width / 2,
      y: rectBox.top + rectBox.height / 2,
    };

    const mutatedCenter = getMutatedRegionCenter();
    const snapRadius = 25;

    const distance = Math.sqrt(
      Math.pow(boxCenter.x - mutatedCenter.x, 2) + 
      Math.pow(boxCenter.y - mutatedCenter.y, 2)
    );

    if (distance < snapRadius) {
      console.log("5. SUCCESS: Within snap radius! Should spring back.");
      deductHeart();
      showTemporaryNotice(3);
      showTemporaryNotice(1);
      box3X.set(0, { type: "spring", stiffness: 50 });
      box3Y.set(0, { type: "spring", stiffness: 50 });
    }
  };

  const correctPosition = () => { 
    if (isDead) return;
    if (isBox2Locked) return;

    console.log("You selected the correct gRNA!!!");

    const mutatedRegion = document.querySelector(".mutated-region");
      if (!mutatedRegion) return { x: 0, y: 0 };

    const box2 = document.querySelector(".grna2 div");
    if (!box2) return;
    const greenBox = box2.getBoundingClientRect();
    const container = document.querySelector(".grna2");
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const greenCenter = {
      x: greenBox.left + greenBox.width / 2,
      y: greenBox.top + greenBox.height / 2,
    };

    const mutatedCenter = getMutatedRegionCenter();
    const snapRadius = 25;

    const distance = Math.sqrt(
      Math.pow(greenCenter.x - mutatedCenter.x, 2) + 
      Math.pow(greenCenter.y - mutatedCenter.y, 2)
    );

    if (distance < snapRadius) {
      const targetX = mutatedCenter.x - (containerRect.left + greenBox.width/2);
      const targetY = mutatedCenter.y - (containerRect.top + greenBox.height/2);
      
      showTemporaryNotice(3);
      showTemporaryNotice(2);
      box2X.stop();
      box2Y.stop();

      animate(box2X, targetX, { type: "spring", stiffness: 100, onComplete: () => {
            setIsBox2Locked(true);
            box2X.set(targetX);
            box2X.stop();
            }
           });
      animate(box2Y, targetY, { type: "spring", stiffness: 100, onComplete: () => {
            setIsBox2Locked(true);
            box2Y.set(targetY);
            box2Y.stop(); 
            } 
          });
        
        setIsSaved(true);
    }
  }

   useEffect(() => {
    if (isSaved || isDead) return; 

    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isSaved, isDead]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isDead) {
    return <DEAD />;
  }

  if (isSaved) {
    const score = Math.round((hearts * Math.max(0, 300 - time)) / 3);
    return <CUTTING score={score} />;
  }

  // Responsive layout: top 50% for heart/timer, bottom 50% for gRNAs, DNA, sequence
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', justifyContent: 'center' }}>
      {/* Top 50%: Heart and Timer Centered */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div className='heart-container' style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '1vh' }}>
            {Array.from({ length: hearts }, (_, index) => (
              <div key={index} className={`heart ${index < hearts ? 'active' : 'lost'}`}>❤️</div>
            ))}
            <div className='placeholder'></div>
          </div>
          <div style={{ textAlign: 'center', color: 'white', marginTop: '1vh' }}>
            <h1 style={{ fontSize: '5vw', margin: 0 }}>{formatTime(time)}</h1>
          </div>
        </div>
      </div>

      {/* Bottom 50%: vertical stack: sequence, gRNAs row, DNA/boxes */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%', minHeight: 0, width: '100%' }}>

        {/* Sequence at top */}
        <div className="real-dna" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            zIndex: 2,            // make sure it isn't covered by notices
            pointerEvents: 'none' // static text
          }}>
              5'-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CT(CCT)GAGGAGAAGTCTGCCGTTACTGCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-3'
        </div>

        {/* gRNAs row below sequence */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2vw', margin: '2vh 0 0 0' }}>
          {showNotice3 && (
            <div className='notice' style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
              {showNotice1 && (
                <div className='sth'>You selected the wrong gRNA!</div>
              )}
              {showNotice2 && (
                <div className='sth'>You selected the correct gRNA!</div>
              )}
            </div>
          )}
          <div className="grna1" style={{ minWidth: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div 
              drag whileDrag={{ scale: 1.5 }} 
              style={{ x: box1X, y: box1Y, transition: { type: false }, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3.5em' }}
              onDrag={checkIfNearCenter}
              onDragEnd={handleDragEnd}
              dragElastic={0}
              dragMomentum={false}
            >
              (GAG)GTCCTCTTCAGACGGCAATG
            </motion.div>
          </div>
          <div className="grna2" style={{ minWidth: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div 
              drag={!isBox2Locked}
              whileDrag={{ scale: 1.5 }} 
              style={{ x: box2X, y: box2Y, cursor: isBox2Locked ? 'default' : 'grab', transition: { type: false }, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3.5em' }}
              onDrag={correctPosition}
              dragElastic={0}
              dragMomentum={false}
              dragConstraints={isBox2Locked}
            >
              (GGN)CTCCTCTTCAGACGGCAATG
            </motion.div>
          </div>
          <div className="grna3" style={{ minWidth: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div 
              drag whileDrag={{ scale: 1.5 }} 
              style={{ x: box3X, y: box3Y, transition: { type: false }, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3.5em' }}
              onDrag={checkIfNearCenterBox3}
              onDragEnd={handleDragEnd}
              dragElastic={0}
              dragMomentum={false}
            >
              (GAG)GTCCTCTTCAGACGGCAATG
            </motion.div>
          </div>
        </div>

        {/* DNA/boxes at bottom */}
        <div className='dna' style={{ margin: '2vh 0 0 0', width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
          <div className = "mutated-region"></div>
        </div>
      </div>
    </div>
  );
};

