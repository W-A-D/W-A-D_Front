import Modal from 'react-modal';
import './GeneralHeader.css';

import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function GeneralHeader() {
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
    const handleGotoMypageMain = () => {
        navigate('/mypageQ');
    };
    return (
        <div className="general-Desktop-Header">
            <div className="general-main-logoText" onClick={handleGotoWADMain}>WAD</div>
            <div className="general-headerRight">
                <div className="general-general" onClick={handleGotoGeneralMain}>일반 게시판</div>
                <div className="general-schedule" onClick={handleGotoScheduleMain}>일정 게시판</div>
                <div className="general-mypage" onClick={handleGotoMypageMain}>마이페이지</div>
                <div className="general-logout">로그아웃</div>
            </div>
        </div>
    )

}

export default GeneralHeader;