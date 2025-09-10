import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './MypageMyA.css';
import Modal from 'react-modal';

import defaultProfile from './mypage_images/profile.png';
import edit from './mypage_images/edit.png';
import likeIcon from './mypage_images/heart.png';
import commentIcon from './mypage_images/bubble.png';
import firstIcon from './mypage_images/first.png';
import prevIcon from './mypage_images/prev.png';
import nextIcon from './mypage_images/next.png';
import lastIcon from './mypage_images/last.png';
import xIcon from './mypage_images/X.png';
import editIcon2 from './mypage_images/edit2.png';

function MypageMyA() {
    //서버 통신 함수
    const [profileImage, setProfileImage] = useState(defaultProfile);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/user')
            .then(response => {
                const userData = response.data;
                setProfileImage(userData.profileImage || defaultProfile);
                setUserName(userData.userName);
                setUserId(userData.userId);
                setPassword(userData.password);
                setEmail(userData.email);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedUserData = {
            profileImage,
            userName,
            userId,
            password,
            email
        };

        axios.post('http://localhost:5000/user', updatedUserData)
            .then(response => {
                console.log('User data updated successfully:', response.data);
                closeeditProfileModal();
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    //정렬 함수

    const postsPerPage = 6; // 한 페이지에 표시할 게시물 수
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('latest'); // 정렬 기준: 'latest' 또는 'popular'

    // 예시 데이터, 실제 데이터로 대체해야 함
    const posts = [
        { category: "디자인", title: "UI/UX 디자인 원칙이 궁금해요.", summary: "디자인 작업을 하면서 UI/UX 디자인의 기본 원칙에 대해 궁금합니다. 사용자 중심의 디자인이란 무엇인가요?", daysAgo: "1일 전", likes: 23, comments: 12 },
        { category: "기획", title: "프로젝트 기획서 작성 방법", summary: "효과적인 프로젝트 기획서를 작성하는 방법에 대해 조언을 구하고 싶습니다. 어떤 요소들이 필수적으로 포함되어야 할까요?", daysAgo: "2일 전", likes: 18, comments: 8 },
        { category: "프론트", title: "React에서 상태 관리 방법", summary: "React에서 상태 관리를 효과적으로 할 수 있는 방법은 무엇인가요? 리덕스나 컨텍스트 API의 사용 사례를 알고 싶습니다.", daysAgo: "3일 전", likes: 45, comments: 15 },
        { category: "백", title: "Node.js 비동기 프로그래밍 이해", summary: "Node.js에서 비동기 프로그래밍을 이해하는 데 어려움을 겪고 있습니다. 콜백 함수와 프로미스의 차이점은 무엇인가요?", daysAgo: "1일 전", likes: 30, comments: 10 },
        { category: "디자인", title: "디자인 트렌드 파악 방법", summary: "최신 디자인 트렌드를 효과적으로 파악할 수 있는 방법에 대해 알고 싶습니다. 주로 어떤 자료를 참고하시나요?", daysAgo: "4일 전", likes: 22, comments: 5 },
        { category: "기획", title: "효과적인 마케팅 전략 기획", summary: "효과적인 마케팅 전략을 기획할 때 고려해야 할 요소들은 무엇인가요? 특히, 디지털 마케팅의 중요성에 대해 알고 싶습니다.", daysAgo: "3일 전", likes: 37, comments: 7 },
        { category: "프론트", title: "CSS 그리드 레이아웃 활용법", summary: "CSS 그리드 레이아웃을 사용하여 반응형 웹 디자인을 구현하는 방법에 대해 알고 싶습니다.", daysAgo: "2일 전", likes: 29, comments: 9 },
        { category: "백", title: "RESTful API 설계 원칙", summary: "RESTful API를 설계할 때 어떤 원칙들을 지켜야 하나요? 좋은 API 디자인의 예시가 있다면 공유 부탁드립니다.", daysAgo: "5일 전", likes: 40, comments: 14 },
        { category: "디자인", title: "브랜드 아이덴티티 디자인", summary: "브랜드 아이덴티티를 확립하기 위한 디자인 접근법에 대해 논의하고 싶습니다. 효과적인 브랜딩을 위한 디자인 팁이 있을까요?", daysAgo: "2일 전", likes: 35, comments: 11 },
        { category: "기획", title: "애자일 기법의 이해와 적용", summary: "애자일 기법을 프로젝트에 적용할 때의 장점과 단점은 무엇인가요? 실제 사례를 공유해주시면 감사하겠습니다.", daysAgo: "1일 전", likes: 28, comments: 13 },
        { category: "프론트", title: "Vue.js 컴포넌트 설계 방법", summary: "Vue.js에서 재사용 가능한 컴포넌트를 설계하는 방법에 대해 조언을 구합니다.", daysAgo: "4일 전", likes: 21, comments: 8 },
        { category: "백", title: "데이터베이스 인덱싱 기법", summary: "효율적인 데이터 검색을 위해 데이터베이스에서 인덱싱을 어떻게 활용할 수 있을까요? 실무 예시를 알고 싶습니다.", daysAgo: "3일 전", likes: 25, comments: 6 },
        { category: "디자인", title: "디지털 일러스트레이션 팁", summary: "디지털 일러스트레이션을 처음 시작하는 디자이너에게 줄 수 있는 팁이나 참고 자료가 있을까요?", daysAgo: "5일 전", likes: 33, comments: 10 },
        { category: "기획", title: "비즈니스 모델 캔버스 활용", summary: "비즈니스 모델 캔버스를 활용하여 스타트업의 성공을 어떻게 이끌어낼 수 있을까요?", daysAgo: "2일 전", likes: 27, comments: 9 },
        { category: "프론트", title: "자바스크립트 ES6 문법 총정리", summary: "자바스크립트 ES6에서 새롭게 추가된 문법들을 정리하고, 이를 활용한 코딩 팁을 공유하고 싶습니다.", daysAgo: "1일 전", likes: 48, comments: 16 }
    ];

    const sortedPosts = posts.sort((a, b) => {
        if (sortOrder === 'latest') {
            return parseInt(b.daysAgo) - parseInt(a.daysAgo); // 최신순 정렬
        } else {
            return b.likes - a.likes; // 인기순 정렬
        }
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const maxPageButtons = 5;

    const getPageNumbers = () => {
        const pageGroup = Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons;
        const startPage = pageGroup + 1;
        const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : totalPages));
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setCurrentPage(1); // 정렬 기준 변경 시 페이지를 1로 리셋
    };

    // 라우터 함수
    const navigate = useNavigate();

    const handleMypageMyQClick = () => {
        navigate('/mypageQ');
    };

    const handleMypageMyAClick = () => {
        navigate('/mypageA');
    };

    const handleGotoWADMain = () => {
        navigate('/');
    };

    // 모달 함수
    const [editProfileModalIsOpen, seteditProfileModalIsOpen] = useState(false);
    const [unregisterModalIsOpen, setunregisterModalIsOpen] = useState(false);
    const [unregisterAlarmModalIsOpen, setunregisterAlarmModalIsOpen] = useState(false);

    const openeditProfileModal = () => {
        seteditProfileModalIsOpen(true);
        document.body.classList.add('modal-open'); // 모달이 열렸을 때 클래스 추가
    };

    const closeeditProfileModal = () => {
        seteditProfileModalIsOpen(false);
        document.body.classList.remove('modal-open'); // 모달이 열렸을 때 클래스 추가
    };

    const openunregisterModal = () => {
        setunregisterModalIsOpen(true);
        document.body.classList.add('modal-open'); // 모달이 열렸을 때 클래스 추가
    };

    const closeunregisterModal = () => {
        setunregisterModalIsOpen(false);
        document.body.classList.remove('modal-open'); // 모달이 닫혔을 때 클래스 제거
    };

    const openunregisterAlarmModal = () => {
        setunregisterAlarmModalIsOpen(true);
        setunregisterModalIsOpen(false);
        document.body.classList.add('modal-open'); // 모달이 열렸을 때 클래스 추가
    };

    const closeunregisterAlarmModal = () => {
        setunregisterAlarmModalIsOpen(false);
        handleGotoWADMain();
        document.body.classList.remove('modal-open'); // 모달이 닫혔을 때 클래스 제거
    };

    return (
        <div className='MypageMyA-container'>
            <div className='MypageMyA-blueheaderline' />
            <div className='MypageMyA-maincontainer'>
                <div className='MypageMyA-widget'>
                    <div className='MypageMyA-profile'>
                        <div className='MypageMyA-profileimage'>
                            <img src={profileImage} alt="" />
                        </div>
                        <div className='MypageMyAEdit' onClick={openeditProfileModal}>
                            <img src={edit} alt="" />
                        </div>
                    </div>
                    <div className='MypageMyA-userInfo'>
                        <div className='MypageMyA-user'>
                            <div className='MypageMyA-userName'>{userName}</div>
                            <div className='MypageMyA-sir'>님</div>
                        </div>
                    </div>
                    <div className='MypageMyA-userQnA'>
                        <div className='MypageMyA-userQ' onClick={handleMypageMyQClick}>작성질문</div>
                        <div className='MypageMyA-userA' onClick={handleMypageMyAClick}>작성답변</div>
                    </div>
                    <div className='MypageMyA-unregister' onClick={openunregisterModal}>회원탈퇴</div>
                </div>
                <div className='MypageMyA0-postBigContainer'>
                    <div className='MypageMyA-postcontainer'>
                        <div className='MypageMyA-postcontainerHeader'>
                            작성답변
                        </div>
                        <div className='MypageMyA-postFilter'>
                            <div className={`MypageMyA-LikeFilter ${sortOrder === 'popular' ? 'active' : ''}`} onClick={() => handleSortChange('popular')}>
                                -인기순
                            </div>
                            <div className={`MypageMyA-LatestFilter ${sortOrder === 'latest' ? 'active' : ''}`} onClick={() => handleSortChange('latest')}>
                                -최근순
                            </div>
                        </div>
                        <div className='MypageMyA-postList'>
                            {currentPosts.map((post, index) => (
                                <div key={index} className='MypageMyA-postbox'>
                                    <div className='MypageMyA-A-Mark'>A</div>
                                    <div className='MypageMyA-Post'>
                                        <div className='MypageMyA-postInfo'>
                                            <div className='MypageMyA-postheader'>
                                                <div className='MypageMyA-postCategory'>
                                                    {post.category}
                                                </div>
                                                <div className='MypageMyA-postTitle'>
                                                    {post.title}
                                                </div>
                                            </div>
                                            <div className='MypageMyA-days-ago'>
                                                {post.daysAgo}
                                            </div>
                                        </div>

                                        <div className='MypageMyA-postSummary'>
                                            {post.summary}
                                        </div>
                                        <div className='MypageMyA-additionalInfo'>
                                            <div className='MypageMyA-postLike'>
                                                <div className='MypageMyA-postLikeIcon'>
                                                    <img src={likeIcon} alt="" />
                                                </div>
                                                <div className='MypageMyA-postLikeText'>
                                                    {post.likes}
                                                </div>
                                            </div>
                                            <div className='MypageMyA-postComment'>
                                                <div className='MypageMyA-postCommentIcon'>
                                                    <img src={commentIcon} alt="" />
                                                </div>
                                                <div className='MypageMyA-postCommentText'>
                                                    {post.comments}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='MypageMyA-pagination'>
                        <button onClick={handleFirstPage}>
                            <img src={firstIcon} alt="First" width="20" height="20" />
                        </button>
                        <button onClick={handlePrevPage}>
                            <img src={prevIcon} alt="Previous" width="20" height="20" />
                        </button>
                        {getPageNumbers().map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => handleClick(pageNumber)}
                                className={pageNumber === currentPage ? 'active' : ''}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        <button onClick={handleNextPage}>
                            <img src={nextIcon} alt="Next" width="20" height="20" />
                        </button>
                        <button onClick={handleLastPage}>
                            <img src={lastIcon} alt="Last" width="20" height="20" />
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={editProfileModalIsOpen}
                onRequestClose={closeeditProfileModal}
                contentLabel="회원정보 수정"
                className="editProfileModal"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={false}
            >
                <div className="editProfileModal-Container">
                    <div className='editProfileModal-Header'>
                        <div className='editProfileModal-Title'>프로필 편집</div>
                        <div className='editProfileModal-xIcon' onClick={closeeditProfileModal}>
                            <img src={xIcon} alt="xIcon" />
                        </div>
                    </div>
                    <div className='editProfileModal-Contents'>
                        <div className='editProfileModal-ProfileLeft'>
                            <div className='editProfileModal-profile'>
                                <div className='editProfileModal-profileimage'>
                                    <img src={profileImage} alt="프로필 이미지" />
                                </div>
                                <div className='editProfileModal-editImg'>
                                    <input
                                        type="file"
                                        id="profileImageUpload"
                                        style={{ display: 'none' }}
                                        onChange={handleProfileImageChange}
                                    />
                                    <label htmlFor="profileImageUpload" className='editProfileModal-editImg'>
                                        <img src={edit} alt="editIcon" />
                                    </label>
                                </div>
                            </div>
                            <div className='editProfileModal-userInfo'>
                                <div className='editProfileModal-user'>
                                    <div className='editProfileModal-userName'>
                                        <input
                                            type="text"
                                            className='editProfileModal-userNameInput'
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='editProfileModal-ProfileRight'>
                            <div className='editProfileModal-IdBox'>
                                <div className='editProfileModal-IdText'>
                                    아이디
                                </div>
                                <div className='editProfileModal-userId'>
                                    <input
                                        type="text"
                                        className='editProfileModal-userIdInput'
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                    <div className='editProfileModal-editIcon2'>
                                        <img src={editIcon2} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className='editProfileModal-PwBox'>
                                <div className='editProfileModal-PwText'>
                                    비밀번호
                                </div>
                                <div className='editProfileModal-userPw'>
                                    <input
                                        type="password"
                                        className='editProfileModal-userPwInput'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className='editProfileModal-editIcon2'>
                                        <img src={editIcon2} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className='editProfileModal-EmailBox'>
                                <div className='editProfileModal-EmailText'>
                                    이메일
                                </div>
                                <div className='editProfileModal-userEmail'>
                                    <input
                                        type="email"
                                        className='editProfileModal-userEmailInput'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className='editProfileModal-editIcon2'>
                                        <img src={editIcon2} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='editProfileModal-Save' onClick={handleSave}>
                        <span>저장하기</span>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={unregisterModalIsOpen}
                onRequestClose={closeunregisterModal}
                contentLabel="회원탈퇴"
                className="unregisterModal"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={false}
            >
                <div className="unregisterModal-Container">
                    <div className='unregisterModal-xIcon' onClick={closeunregisterModal}>
                        <img src={xIcon} alt="xIcon" />
                    </div>
                    <div className='unregisterModal-contents'>
                        <div className='unregisterModal-Title'>
                            회원탈퇴
                        </div>
                        <div className='unregisterModal-WarningText'>
                            탈퇴하시면 모든 활동 기록이 삭제됩니다.<br />그래도 탈퇴하시겠어요?
                        </div>
                    </div>
                    <div className='unregisterModal-userSelect'>
                        <div className='unregisterModal-cancel' onClick={closeunregisterModal}>
                            <span>취소하기</span>
                        </div>
                        <div className='unregisterModal-unregister' onClick={openunregisterAlarmModal}>
                            <span>탈퇴하기</span>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={unregisterAlarmModalIsOpen}
                onRequestClose={closeunregisterModal}
                contentLabel="회원탈퇴알림"
                className="unregisterAlarmModal"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={false}
            >
                <div className="unregisterAlarmModal-Container">
                    <div className='unregisterAlarmModal-Title'>
                        회원탈퇴 완료
                    </div>
                    <div className='unregisterAlarmModal-AlarmText'>
                        회원 탈퇴가 완료되었습니다.
                    </div>
                    <div className='unregisterAlarmModal-cancel' onClick={closeunregisterAlarmModal}>
                        <span>홈페이지로 가기</span>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default MypageMyA;
