import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import mainImg1 from './images/morphis-calendar-and-clock-for-time-management 1.png';
import boardIcon1 from './images/chat bubbles.png';
import boardIcon2 from './images/calender.png';
import arrowIcon from './images/arrow.png';
// import uncheckIcon from './images/uncheck-1.png';
// import checkIcon from './images/check.png';
import './WADmain.css';

function WADmain() {

  const navigate1 = useNavigate();
  const handleGeneralBoardClick = () => {
    navigate1('/general');
  };

  const navigate2 = useNavigate();
  const handleScheduleBoardClick = () => {
    navigate2('/schedule');
  };

  return (
    <div className="main_container">

      <div className="main-Content">
        <div className="main-Text">
          <span className="main-WAD">W</span>
          <span className="main-OtherText">hat<br /></span>
          <span className="main-WAD main-A">A</span>
          <span className="main-OtherText main-reYou">re you<br /></span>
          <span className="main-WAD main-D">D</span>
          <span className="main-OtherText main-oing">oing?</span>
        </div>
        <div className="main-Icon1">
          <img src={mainImg1} alt="mainIcon" className="mainIcon" />
        </div>
      </div>
      <div className="main-Boards">
        <div className="main-generalBoard" onClick={handleGeneralBoardClick}>
          <div className="main-boardIcon1">
            <img src={boardIcon1} alt="boardIcon1" className="boardIcon1" />
          </div>
          <div className="main-boardText1">질문 검색/작성 바로가기</div>
          <div className="main-arrowIcon">
            <img src={arrowIcon} alt="arrowIcon" className="arrowIcon" />
          </div>
        </div>
        <div className="main-scheduleBoard" onClick={handleScheduleBoardClick}>
          <div className="main-boardIcon2">
            <img src={boardIcon2} alt="boardIcon2" className="boardIcon2" />
          </div>
          <div className="main-boardText2">일정 관리 바로가기</div>
          <div className="main-arrowIcon">
            <img src={arrowIcon} alt="arrowIcon" className="arrowIcon" />
          </div>
        </div>
      </div>


    </div>
  );
}


export default WADmain;
