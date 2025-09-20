import '../styles/App.css';
import DEAD from './DeadSam'
import CUTTING from './Cutting'
import { useNavigate } from "react-router-dom";
import clickSound from '../sound/correct.mp3';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

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
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const audioRef1 = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
      audioRef1.current = new Audio(clickSound);
      audioRef1.current.volume = 1;
      audioRef1.current.playbackRate = 2;
    }, []);

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

    playCorrectSound();
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
  console.log('Timer state changed - isTimerRunning:', isTimerRunning, 'Time:', time);
}, [isTimerRunning, time]);

  useEffect(() => {
  console.log('Timer useEffect triggered, isTimerRunning:', isTimerRunning);
  let interval;
  if (isTimerRunning) {
    console.log('Starting timer interval');
    interval = setInterval(() => {
      setTime(prevTime => {
        console.log('Timer tick:', prevTime + 1);
        return prevTime + 1;
      });
    }, 1000);
  } else {
    console.log('Timer paused');
  }
  return () => {
    console.log('Clearing timer interval');
    clearInterval(interval);
  };
}, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isDead) {
    navigate("/dead");
    return null;
  }

  if (isSaved) {
  return <CUTTING 
    hearts={hearts} 
    time={time} 
    setHearts={setHearts} 
    onDead={() => setIsDead(true)} 
    onPauseTimer={setIsTimerRunning} // Pass the setter directly
  />;
}

    return (
      <div className="app-container">
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
                You selected the wrong gRNA!
              </div>
            )}
            {showNotice2 && (
              <div className='sth'>
                You selected the correct gRNA!
              </div>
            )}
          </div>
        )}

        <div className='grna-container'>
          <div className="grna1">
            <motion.div 
            drag whileDrag={{ scale: 1.5 }} 
            style={{ x: box1X, y: box1Y, transition: { type: false }}}
            onDrag={checkIfNearCenter}
            onDragEnd={handleDragEnd}
            dragElastic={0}
            dragMomentum={false}
            >
              3'-CACCTCTGCAGACGGCAATGCT-5'
            </motion.div>
          </div>

          <div className="grna2">
            <motion.div 
            drag={!isBox2Locked}
            whileDrag={{ scale: 1.5 }} 
            style={{ x: box2X, y: box2Y, cursor: isBox2Locked ? 'default' : 'grab', transition: { type: false }}}
            onDrag={correctPosition}
            dragElastic={0}
            dragMomentum={false}
            dragConstraints={isBox2Locked}
            >
             3'-CACCTCTTCAGACGGCAATG-5'
            </motion.div>
          </div>
        </div>

        <div className='grna-container'>
          <div className="grna3">
            <motion.div 
            drag whileDrag={{ scale: 1.5 }} 
            style={{ x: box3X, y: box3Y, transition: { type: false }}}
            onDrag={checkIfNearCenterBox3}
            onDragEnd={handleDragEnd}
            dragElastic={0}
            dragMomentum={false}
            >
              3'-CACCTCTTCAGAAGACGGCAATGCT-5'
            </motion.div>
          </div>
        </div>

          <div className='dna'> 
              <div className = "mutated-region">
              </div>
          </div>
          <div className = "real-dna"> 5'-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GTGGAGAAGTCTGCCGTTAC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-3'</div>
      </div>
    );
};