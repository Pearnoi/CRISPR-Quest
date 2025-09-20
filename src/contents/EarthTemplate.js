import '../styles/App.css';
import EARTHREPEXP from './EarthRepExp';
import { useNavigate } from "react-router-dom";
import clickSound from '../sound/correct.mp3';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

export default function EARTHTEMPLATE({ hearts, time, setHearts, setTime, onDead, onPauseTimer }) {
    const [isBox2Locked, setIsBox2Locked] = useState(false); // Changed from isBox3Locked to isBox2Locked
    const [showNotice1, setShowNotice1] = useState(false);
    const [showNotice2, setShowNotice2] = useState(false);
    const [showNotice3, setShowNotice3] = useState(false);
    const [hasDeductedHeart, setHasDeductedHeart] = useState(false);
    const [isDead, setIsDead] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const audioRef1 = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
      audioRef1.current = new Audio(clickSound);
      audioRef1.current.volume = 1;
      audioRef1.current.playbackRate = 2;
    }, []);

    useEffect(() => {
      console.log('RepairTemplateChoice mounted, resuming timer');
      onPauseTimer(true); // true = timer should RUN
      
      return () => {
        console.log('RepairTemplateChoice unmounting, pausing timer');
        onPauseTimer(false); // false = timer should PAUSE
      };
    }, [onPauseTimer]);

    const calculateScore = (hearts, time) => {
      const baseScore = hearts * 100;
      const timeBonus = Math.max(0, 300 - time);
      return Math.round(baseScore + timeBonus);
      };

    const playCorrectSound = () => {
      if (audioRef1.current) {
        audioRef1.current.currentTime = 0; 
        audioRef1.current.play().catch(error => {
          console.log('Audio play prevented:', error);
        });
      }
    };

    const box1X = useMotionValue(0);
    const box1Y = useMotionValue(0);
    const box2X = useMotionValue(0);
    const box2Y = useMotionValue(0);
    const box3X = useMotionValue(0);
    const box3Y = useMotionValue(0);

    const handleRepairComplete = (success, remainingHearts) => {
      if (success) {
        setIsSaved(true);
      } else if (remainingHearts <= 0) {
        setIsDead(true);
      }
    };

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
      const mutatedRegion = document.querySelector(".earthmutated-region3");
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
      const draggable = document.querySelector(".grna11 div");
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

  const checkIfNearCenterBox3 = () => { // Changed from checkIfNearCenterBox2 to checkIfNearCenterBox3
    if (isDead) return; 

    console.log("Dragging box 3, checking distance...");
    const draggable = document.querySelector(".grna13 div"); // Changed from grna2 to grna10
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
      console.log("WRONG: Within snap radius! Should spring back.");
      deductHeart();
      showTemporaryNotice(3);
      showTemporaryNotice(1);
      box3X.set(0, { type: "spring", stiffness: 50 }); // Changed from box2X to box3X
      box3Y.set(0, { type: "spring", stiffness: 50 }); // Changed from box2Y to box3Y
    }
  };

  const correctPosition = () => { 
    if (isDead) return;
    if (isBox2Locked) return; // Changed from isBox3Locked to isBox2Locked

    playCorrectSound();
    console.log("You selected the correct gRNA!!!");

    const mutatedRegion = document.querySelector(".earthmutated-region3");
      if (!mutatedRegion) return { x: 0, y: 0 };

    const box2 = document.querySelector(".grna12 div"); // Changed from grna6 to grna8
    if (!box2) return;
    const greenBox = box2.getBoundingClientRect();
    const container = document.querySelector(".grna12"); // Changed from grna6 to grna8
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
      box2X.stop(); // Changed from box3X to box2X
      box2Y.stop(); // Changed from box3Y to box2Y

      animate(box2X, targetX, { type: "spring", stiffness: 100, onComplete: () => { // Changed from box3X to box2X
            setIsBox2Locked(true); // Changed from setIsBox3Locked to setIsBox2Locked
            box2X.set(targetX); // Changed from box3X to box2X
            box2X.stop(); // Changed from box3X to box2X
            }
           });
      animate(box2Y, targetY, { type: "spring", stiffness: 100, onComplete: () => { // Changed from box3Y to box2Y
            setIsBox2Locked(true); // Changed from setIsBox3Locked to setIsBox2Locked
            box2Y.set(targetY); // Changed from box3Y to box2Y
            box2Y.stop(); // Changed from box3Y to box2Y
            } 
          });
        
        setIsSaved(true);
    }
  }

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isDead) {
    navigate("/earth/dead");
    return null;
  }

  if (isSaved) {
    const score = calculateScore(hearts, time);
    return <EARTHREPEXP score={score} onPauseTimer={onPauseTimer}/>

  }

    return (
      <div className="app-container">
        <h3 className='template'>
            Repair Template
        </h3>

        <h6 className='template3'>
           Be careful, you have to choose the right repair template <br></br> with ..... on each side
        </h6>

        <div className='heart-container'>
          {Array.from({ length: hearts }, (_, index) => (
                    <div key={index} className={`heart ${index < hearts ? 'active' : 'lost'}`}>❤️</div>
                ))}
            <div className='placeholder'></div>
        </div>

        <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
          <h1 style={{ fontSize: '60px' }}>{formatTime(time)}</h1>
        </div>

        {showNotice3 && (
          <div className='notice'>
            {showNotice1 && (
              <div className='sth'>
                You selected the wrong repair template!
              </div>
            )}
            {showNotice2 && (
              <div className='sth'>
                You selected the correct repair template!
              </div>
            )}
          </div>
        )}

        <div className='grna-container'>
                  <div className="grna11">
                    <motion.div 
                    drag whileDrag={{ scale: 1.5 }} 
                    style={{ x: box1X, y: box1Y, transition: { type: false }}}
                    onDrag={checkIfNearCenter}
                    onDragEnd={handleDragEnd}
                    dragElastic={0}
                    dragMomentum={false}
                    >
                      5’ -...CTGGCGTCATCTCTGGCCTGG-3’ 
                    </motion.div>
                  </div>
        
                  <div className="grna12">
                    <motion.div 
                    drag={!isBox2Locked} // Changed from drag to drag={!isBox2Locked}
                    whileDrag={{ scale: 1.5 }} 
                    style={{ x: box2X, y: box2Y, cursor: isBox2Locked ? 'default' : 'grab', transition: { type: false }}} // Changed isBox3Locked to isBox2Locked
                    onDrag={correctPosition} // Changed from onDrag={checkIfNearCenterBox2} to onDrag={correctPosition}
                    dragElastic={0}
                    dragMomentum={false}
                    dragConstraints={isBox2Locked} // Changed from dragConstraints to dragConstraints={isBox2Locked}
                    >
                      5’-...GGCCCTGGCGTCATCTCTGGCCTGGCCAAG...-3’

                    </motion.div>
                  </div>
                </div>
        
                <div className='grna-container'>
                  <div className="grna13">
                    <motion.div 
                    drag // Changed from drag={!isBox3Locked} to drag
                    whileDrag={{ scale: 1.5 }} 
                    style={{ x: box3X, y: box3Y, transition: { type: false }}} // Removed cursor property
                    onDrag={checkIfNearCenterBox3} // Changed from onDrag={correctPosition} to onDrag={checkIfNearCenterBox3}
                    dragElastic={0}
                    dragMomentum={false}
                    >
                      5’-GTCATCTCTGGCCTGGCCAAG-3’
                    </motion.div>
                  </div>
                </div>

        <div className='earthdna2'> 
          <div className="earthmutated-region3">
          </div>
        </div>
        <div className="real-dna"> 5'-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GACCGGCCTTGACCTGGGCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-3'</div>
      </div>
    );
};