import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import WADpublicImg1 from './images/morphis-calendar-and-clock-for-time-management 1.png';
import boardIcon1 from './images/chat bubbles.png';
import boardIcon2 from './images/calender.png';
import arrowIcon from './images/arrow.png';
// import uncheckIcon from './images/uncheck-1.png';
// import checkIcon from './images/check.png';
import './WADpublic.css';

function WADpublic() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const [signupData, setSignupData] = useState({
        UserId: '',
        email: '',
        username: '',
        password: '',
    });

    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
    const [allAgree, setAllAgree] = useState(false);
    const [agreements, setAgreements] = useState({
        terms: false,
        privacy: false,
        marketing: false,
    });

    const openLoginModal = () => {
        setLoginModalIsOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalIsOpen(false);
    };

    const openSignupModal = () => {
        setSignupModalIsOpen(true);
        setLoginModalIsOpen(false);
    };

    const closeSignupModal = () => {
        setSignupModalIsOpen(false);
    };

    const handleAllAgreeChange = (e) => {
        const isChecked = e.target.checked;
        setAllAgree(isChecked);
        setAgreements({
            terms: isChecked,
            privacy: isChecked,
            marketing: isChecked,
        });
    };

    const handleAgreementChange = (e) => {
        const { name, checked } = e.target;
        setAgreements((prevAgreements) => {
            const newAgreements = {
                ...prevAgreements,
                [name]: checked,
            };

            setAllAgree(
                newAgreements.terms &&
                newAgreements.privacy &&
                newAgreements.marketing
            );

            return newAgreements;
        });
    };

    const handleKeepChange = (e) => {
        setAgreements((prevAgreements) => ({
            ...prevAgreements,
            keep: e.target.checked,
        }));
    };

    //로그인

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginSubmit = async () => {
        try {
            // 로그인 요청
            const response = await axios.post('http://43.203.243.173:8080/login', null, {
                params: {
                    username: loginData.username,
                    password: loginData.password,
                },
                withCredentials: true,
            });

            // 성공적으로 로그인한 경우
            if (response.status === 200) {

                console.log(response.data);
                const accessToken = response.headers['access'];

                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                } else {
                    console.error('Access 토큰을 찾을 수 없습니다.');
                }

                console.log('로그인 성공');
                navigate('/mainpage');
            }
        } catch (error) {
            // 로그인 실패 처리
            if (error.response && error.response.status === 401) {
                console.log('로그인 실패');
            } else {
                console.error('로그인 중 오류 발생', error);
            }
        }
    };

    const handleSignupSubmit = async () => {
        try {
            const response = await axios.post('http://43.203.243.173:8080/join', null, {
                params: {
                    UserId: signupData.UserId,
                    email: signupData.email,
                    username: signupData.username,
                    password: signupData.password,
                },
            });

            if (response.data === "이미 존재하는 아이디입니다") {
                console.log("이미 존재하는 아이디입니다.");
            } else {
                localStorage.setItem("UserId", signupData.UserId)
                console.log("회원가입이 완료되었습니다.");
                alert("회원가입이 완료되었습니다.")
            }
        } catch (error) {
            console.error('회원가입 실패', error);
        }
    };

    return (
        <div className={`WADpublic_container ${loginModalIsOpen || signupModalIsOpen ? 'modal-open' : ''}`}>
            <div className="WADpublic-Content">
                <div className="WADpublic-Text">
                    <span className="WADpublic-WAD">W</span>
                    <span className="WADpublic-OtherText">hat<br /></span>
                    <span className="WADpublic-WAD WADpublic-A">A</span>
                    <span className="WADpublic-OtherText WADpublic-reYou">re you<br /></span>
                    <span className="WADpublic-WAD WADpublic-D">D</span>
                    <span className="WADpublic-OtherText WADpublic-oing">oing?</span>
                </div>
                <div className="WADpublic-Icon1">
                    <img src={WADpublicImg1} alt="WADpublicIcon" className="WADpublicIcon" />
                </div>
            </div>
            <div className="WADpublic-Boards">
                <div className="WADpublic-generalBoard" onClick={openLoginModal}>
                    <div className="WADpublic-boardIcon1">
                        <img src={boardIcon1} alt="boardIcon1" className="boardIcon1" />
                    </div>
                    <div className="WADpublic-boardText1">질문 검색/작성 바로가기</div>
                    <div className="WADpublic-arrowIcon">
                        <img src={arrowIcon} alt="arrowIcon" className="arrowIcon" />
                    </div>
                </div>
                <div className="WADpublic-scheduleBoard" onClick={openLoginModal}>
                    <div className="WADpublic-boardIcon2">
                        <img src={boardIcon2} alt="boardIcon2" className="boardIcon2" />
                    </div>
                    <div className="WADpublic-boardText2">일정 관리 바로가기</div>
                    <div className="WADpublic-arrowIcon">
                        <img src={arrowIcon} alt="arrowIcon" className="arrowIcon" />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                contentLabel="로그인"
                className="modal1"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    <div className='modal-login'>로그인</div>
                    <div className="input-container">
                        <div>
                            <label>
                                <input type="text" name="username" className="id" placeholder="아이디" value={loginData.username} onChange={handleLoginChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="password" name="password" className="password" placeholder="비밀번호" value={loginData.password} onChange={handleLoginChange} required />
                            </label>
                        </div>

                    </div>
                    <div className="modal-login-container">
                        <span>계정이 필요하신가요?</span>
                        <div style={{ color: '#467AFF' }} onClick={openSignupModal}>회원가입</div>
                    </div>
                    <div className="modal-login-footer">
                        <button className="modal-login-button" onClick={handleLoginSubmit}>로그인</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={signupModalIsOpen}
                onRequestClose={closeSignupModal}
                contentLabel="회원가입"
                className="modal2"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    <div className='modal-join'>회원가입</div>
                    <div className="input-container">
                        <div>
                            <label>
                                <input type="text" name="username" className="id" placeholder="아이디" value={signupData.username} onChange={handleSignupChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="password" name="password" className="password" placeholder="비밀번호" value={signupData.password} onChange={handleSignupChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="email" name="email" className="email" placeholder="이메일" value={signupData.email} onChange={handleSignupChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="text" name="UserId" className="nickname" placeholder="닉네임" value={signupData.UserId} onChange={handleSignupChange} required />
                            </label>
                        </div>
                    </div>
                    <div className="checkbox-join-container">
                        <label className={`all-agree-label ${allAgree ? 'checked' : ''}`}>
                            <input type="checkbox" checked={allAgree} onChange={handleAllAgreeChange} />
                            <span className="checkbox-custom"></span>
                            아래 약관을 모두 동의합니다.
                        </label>
                        <label>
                            <input type="checkbox" name="terms" checked={agreements.terms} onChange={handleAgreementChange} />
                            <span className="checkbox-custom"></span>
                            이용약관 동의 (필수)
                        </label>
                        <label>
                            <input type="checkbox" name="privacy" checked={agreements.privacy} onChange={handleAgreementChange} />
                            <span className="checkbox-custom"></span>
                            개인정보 수집 이용 동의 (필수)
                        </label>
                        <label>
                            <input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} />
                            <span className="checkbox-custom"></span>
                            혜택|이벤트 광고 수신 (선택)
                        </label>
                    </div>
                </div>
                <div className="modal-join-footer">
                    <button onClick={handleSignupSubmit}>가입하기</button>
                </div>
            </Modal>

        </div>
    );
}


export default WADpublic;
