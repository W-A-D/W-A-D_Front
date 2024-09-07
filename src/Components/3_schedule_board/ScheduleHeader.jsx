import Modal from 'react-modal';
import './ScheduleHeader.css';
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function ScheduleHeader() {
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
        <div className="schedule-Desktop-Header">
            <div className="schedule-main-logoText" onClick={handleGotoWADMain}>WAD</div>
            <div className="schedule-headerRight">
                <div className="schedule-general" onClick={handleGotoGeneralMain}>일반 게시판</div>
                <div className="schedule-schedule" onClick={handleGotoScheduleMain}>일정 게시판</div>
                <div className="schedule-mypage" onClick={handleGotoMypageMain}>마이페이지</div>
                <div className="schedule-logout">로그아웃</div>
            </div>
        </div>
    )

}

export default ScheduleHeader;