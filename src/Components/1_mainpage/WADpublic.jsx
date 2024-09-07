import { useState } from 'react';
import Modal from 'react-modal';
import WADpublicImg1 from './images/morphis-calendar-and-clock-for-time-management 1.png';
import boardIcon1 from './images/chat bubbles.png';
import boardIcon2 from './images/calender.png';
import arrowIcon from './images/arrow.png';
// import uncheckIcon from './images/uncheck-1.png';
// import checkIcon from './images/check.png';
import './WADpublic.css';

function WADpublic() {

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
                                <input type="text" className="id" placeholder="아이디" required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="password" className="password" placeholder="비밀번호" required />
                            </label>
                        </div>
                        <div className="checkbox-login-container">
                            <label>
                                <input type="checkbox" name="keep" checked={agreements.keep} onChange={handleKeepChange} />
                                <span className="checkbox-custom"></span>
                                <span>로그인 상태 유지</span>
                            </label>
                        </div>
                    </div>
                    <div className="modal-login-container">
                        <div>아이디 찾기</div><div> | </div><div>비밀번호 찾기</div><div> | </div><div onClick={openSignupModal}>회원가입</div>
                    </div>
                    <div className="modal-login-footer">
                        <button className="modal-login-button">로그인</button>
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
                                <input type="text" className="id" placeholder="아이디" required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="password" className="password" placeholder="비밀번호" required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="email" className="email" placeholder="이메일" required />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="text" className="nickname" placeholder="닉네임" required />
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
                    <button>가입하기</button>
                </div>
            </Modal>


        </div>
    );
}


export default WADpublic;
