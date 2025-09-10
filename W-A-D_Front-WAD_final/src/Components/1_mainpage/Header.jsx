import { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-scroll';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Header.css';

Modal.setAppElement('#root');

function WADheader() {
    const navigate = useNavigate();
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

            console.log('로그아웃 성공:', response.data);    
            // 페이지 이동
            navigate('/');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };
    return (
        <div className="main-Desktop-Header">
            <div className="main-logoText">WAD</div>
            <div className="main-headerRight">
                <Link to="intro-section" smooth={true} duration={500} className="main-about" >ABOUT</Link>
                <div className="main-signIn-Up" onClick={handleLogoutClick}>로그아웃</div>
            </div>
        </div>
    )
}
export default WADheader;