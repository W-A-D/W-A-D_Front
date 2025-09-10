import React from 'react';
import Modal from 'react-modal';
import './MypageHeader.css';
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function MypageHeader() {
    const navigate = useNavigate();
    const handleGotoWADMain = () => {
        navigate('/');
    }; 
    const handleGotoGeneralMain = () => {
        navigate('/general');
    };
    const handleGotoScheduleMain = () => {
        navigate('/schedule');
    };

    return (
        <div className="mypage-Desktop-Header">
            <div className="mypage-main-logoText" onClick={handleGotoWADMain}>WAD</div>
            <div className="mypage-headerRight">
                <div className="mypage-general" onClick={handleGotoGeneralMain}>일반 게시판</div>
                <div className="mypage-schedule" onClick={handleGotoScheduleMain}>일정 게시판</div>
                <div className="mypage-mypage">마이페이지</div>
                <div className="mypage-logout">로그아웃</div>
            </div>
        </div>
    )

}

export default MypageHeader;