import '../styles/App.css';
import EARTHSAVED from './EarthSaved'
import { useNavigate } from "react-router-dom";
import clickSound from '../sound/correct.mp3';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

export default function EARTHTEMPLATE({ hearts, time, setHearts, setTime, onDead, onPauseTimer }) {
    const [isBox3Locked, setIsBox3Locked] = useState(false);
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
      let interval;
      if (isTimerRunning && !isSaved && !isDead) {
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isTimerRunning, isSaved, isDead]);

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
      const draggable = document.querySelector(".grna4 div");
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

  const checkIfNearCenterBox2 = () => {
    if (isDead) return; 

    console.log("Dragging box 2, checking distance...");
    const draggable = document.querySelector(".grna2 div");
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
      box2X.set(0, { type: "spring", stiffness: 50 });
      box2Y.set(0, { type: "spring", stiffness: 50 });
    }
  };

  const correctPosition = () => { 
    if (isDead) return;
    if (isBox3Locked) return;

    playCorrectSound();
    console.log("You selected the correct gRNA!!!");

    const mutatedRegion = document.querySelector(".earthmutated-region3");
      if (!mutatedRegion) return { x: 0, y: 0 };

    const box3 = document.querySelector(".grna8 div");
    if (!box3) return;
    const greenBox = box3.getBoundingClientRect();
    const container = document.querySelector(".grna8");
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
      box3X.stop();
      box3Y.stop();

      animate(box3X, targetX, { type: "spring", stiffness: 100, onComplete: () => {
            setIsBox3Locked(true);
            box3X.set(targetX);
            box3X.stop();
            }
           });
      animate(box3Y, targetY, { type: "spring", stiffness: 100, onComplete: () => {
            setIsBox3Locked(true);
            box3Y.set(targetY);
            box3Y.stop(); 
            } 
          });
        
        setIsSaved(true);
    }
  }

  useEffect(() => {
  let interval;
  if (isTimerRunning) {
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [isTimerRunning]);

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
    return <EARTHSAVED score={score}/>

  }

    return (
      <div className="app-container">
        <h3 className='template2'>
            Repair Template
        </h3>
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

          <div className='grna-container'>
          <div className="grna8">
            <motion.div 
            drag={!isBox3Locked}
            whileDrag={{ scale: 1.5 }} 
            style={{ x: box3X, y: box3Y, cursor: isBox3Locked ? 'default' : 'grab', transition: { type: false }}}
            onDrag={correctPosition}
            dragElastic={0}
            dragMomentum={false}
            dragConstraints={isBox3Locked}
            >
              5’-...GGCCCTGGCGTCATCTCTGGCCTGGCCAAG...-3’
            </motion.div>
          </div>
        </div>
        </div>

          <div className='earthdna2'> 
              <div className = "earthmutated-region3">
              </div>
          </div>
          <div className = "real-dna"> 5'-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GACCGGCCTTGACCTGGGCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-3'</div>
      </div>
    );
};