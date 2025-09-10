import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './ScheduleHeader.css';
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function ScheduleHeader() {
    const navigate = useNavigate();
    const handleGotoWADMain = () => {
        navigate('/mainpage');
    }; 
    const handleGotoGeneralMain = () => {
        navigate('/general');
    };
    const handleGotoScheduleMain = () => {
        navigate('/schedule');
    };
    const handleGotoMypageMain = () => {
        navigate('/mypageQ');
    };
    const handleLogoutClick = async () => {
        const accessToken=localStorage.getItem('accessToken')

        try {
            // 로그아웃 요청
            const response = await axios.post('http://43.203.243.173:8080/logout',{
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }
            }) 
                // localStorage.clear();

                localStorage.removeItem('accessToken')
                localStorage.removeItem('UserId');
                navigate('/'); 
            //console.log('로그아웃 성공:', response.data);    
            // 페이지 이동
            navigate('/');
            alert('로그아웃 성공:', response.data);
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <div className="schedule-Desktop-Header">
            <div className="schedule-main-logoText" onClick={handleGotoWADMain}>WAD</div>
            <div className="schedule-headerRight">
                <div className="schedule-general" onClick={handleGotoGeneralMain}>일반 게시판</div>
                <div className="schedule-schedule" onClick={handleGotoScheduleMain}>일정 게시판</div>
                <div className="schedule-mypage" onClick={handleGotoMypageMain}>마이페이지</div>
                <div className="schedule-logout" onClick={handleLogoutClick}>로그아웃</div>
            </div>
        </div>
    )

}

export default ScheduleHeader;