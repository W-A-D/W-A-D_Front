import "./GeneralMain.css";
import heart from "./generalboard_images/heart.png";
import comment from "./generalboard_images/comment.png";
import gpt from "./generalboard_images/chatgpt.png";
import submitimg from "./generalboard_images/submit.png";
import Ximg from "./generalboard_images/X.png";
import searchimg from './generalboard_images/search.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function GeneralMain() {
    const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리
    const [sortOrder, setSortOrder] = useState("latest"); // 정렬 기준
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const QNAPerPage = 3; // 한 페이지에 표시할 게시물 수
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    const addMessage = (sender, message) => {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    };

    const handleSendMessage = async () => {
        const message = userInput.trim();
        if (message.length === 0) return;

        addMessage("user", message);
        setUserInput("");
        setLoading(true);

        const summaryRequest = `Summarize the core of the answer to the user's input in 3 steps in Korean: ${message}`;

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [{ role: "user", content: summaryRequest }],
                    max_tokens: 1024,
                    top_p: 1,
                    temperature: 1,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.5,
                    stop: ["문장 생성 중단 단어"],
                }),
            });

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content || "No response";
            addMessage("bot", aiResponse);
        } catch (error) {
            console.error("오류 발생!", error);
            addMessage("bot", "오류 발생!");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const toggleCategory = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(""); // 같은 카테고리 클릭 시 선택 해제
        } else {
            setSelectedCategory(category); // 새로운 카테고리 선택
            setCurrentPage(1); // 카테고리 변경 시 페이지 초기화
        }
    };

    const [GPTModalIsOpen, setGPTModalIsOpen] = useState(false);

    const openGPTModal = () => {
        setGPTModalIsOpen(true);
    };

    const closeGPTModal = () => {
        setGPTModalIsOpen(false);
    };

    const navigate = useNavigate();

    // const viewQnaDetail = (id) => {
    //     navigate(`/generalDetail/${id}`); 
    // };

    const viewQnaDetail = async (boardPostId) => {
        try {
            // await axios.post(`apiurl/${id}/view`); // 조회수 업데이트
            navigate(`/GeneralDetail/${boardPostId}`); // boardPostId로 이동
        } catch (error) {
            console.error(error);
        }
    };

    const [generalpost, setGeneralpost] = useState([]);

    const calculateDaysAgo = (createdAt) => {
        const date1 = new Date(createdAt);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://43.203.243.173:8080/board/posts');
                const postsWithDaysAgo = response.data.map((post) => {
                    return {
                        ...post,
                        daysAgo: calculateDaysAgo(post.createdAt),
                    };
                });
    
                setGeneralpost(postsWithDaysAgo);
            } catch (error) {
                console.error('Failed to fetch generalpost', error);
            }
        };
    
        fetchPosts();
    }, []); 
    

// Filter the posts by selected category
const filteredPosts = generalpost.filter(
    (qna) => !selectedCategory || qna.type === selectedCategory
);

// Sort the posts based on the selected sort order
const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOrder === "latest") {
        return parseInt(a.daysAgo) - parseInt(b.daysAgo); // Sort by latest
    } else {
        return b.likes - a.likes; // Sort by most liked
    }
});

    // 페이지네이션을 위한 게시물 슬라이스
    const indexOfLastQNA = currentPage * QNAPerPage;
    const indexOfFirstQNA = indexOfLastQNA - QNAPerPage;
    const currentQNAPosts = sortedPosts.slice(indexOfFirstQNA, indexOfLastQNA);

    const totalPages = Math.ceil(sortedPosts.length / QNAPerPage);

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="GeneralMain_container">
            <div className="general-main-contents">
                <div className="general-main-title-container">
                    <div className="general-main-title">일반 게시판</div>
                    <div className="GeneralMain_SearchBar">
                    <div className='GeneralMain_magnifier'>
                        <img src={searchimg} alt="generalSearchIcon" /></div>
                        <input type="text" className='GeneralMain_searcharea' />
                    </div>
                    <div className="GeneralMain_CategoryBar">
                        <div
                            className={`GeneralMain_planningCat ${
                                selectedCategory === "기획" ? "active" : ""
                            }`}
                            onClick={() => toggleCategory("기획")}
                        >
                            기획
                        </div>
                        <div
                            className={`GeneralMain_designCat ${
                                selectedCategory === "디자인" ? "active" : ""
                            }`}
                            onClick={() => toggleCategory("디자인")}
                        >
                            디자인
                        </div>
                        <div
                            className={`GeneralMain_frontCat ${
                                selectedCategory === "프론트엔드" ? "active" : ""
                            }`}
                            onClick={() => toggleCategory("프론트엔드")}
                        >
                            프론트엔드
                        </div>
                        <div
                            className={`GeneralMain_backCat ${
                                selectedCategory === "백엔드" ? "active" : ""
                            }`}
                            onClick={() => toggleCategory("백엔드")}
                        >
                            백엔드
                        </div>
                    </div>
                </div>

                <div className="general-board-main-contents">
                    <div className="QNA-contents">
                        <div className="general-order-option">
                            <div
                                className={`GeneralQNA-LikeFilter ${
                                    sortOrder === "popular" ? "active" : ""
                                }`}
                                onClick={() => handleSortChange("popular")}
                            >
                                -인기순
                            </div>
                            <div
                                className={`GeneralQNA-LatestFilter ${
                                    sortOrder === "latest" ? "active" : ""
                                }`}
                                onClick={() => handleSortChange("latest")}
                            >
                                -최근순
                            </div>
                        </div>
                        <div className="general-QNA-main-container">
                            <div className="general-board-QNA-container">
                                <div className="plus-QNA" onClick={() => navigate("/generalWrite")}>
                                    <span>+</span>
                                </div>
                                {currentQNAPosts.map((qna) => (
                                    <div 
                                        key={qna.boardpostid} 
                                        className="general-QNA"
                                        onClick={() => viewQnaDetail(qna.boardpostid)} // Updated to navigate on click
                                    >
                                        <div className="QNA-title-container">
                                            <div className="Q-title">
                                                <div className="QNA-Q">
                                                    <span>Q</span>
                                                </div>
                                                <div className="QNA-title">
                                                    <div className="QNA-section">{qna.type}</div>
                                                    <div className="QNA-real-title">
                                                        {qna.title}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="QNA-enroll">{qna.daysAgo}일 전</div>
                                        </div>
                                        <div className="QNA-detail">{qna.content}</div>
                                        <div className="QNA-like-comment">
                                            <div className="QNA-like">
                                                <img src={heart} alt="like-img" />
                                                <span>{qna.likes}</span>
                                            </div>
                                            <div className="QNA-comment">
                                                <img src={comment} alt="comment-img" />
                                                <span>{qna.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="AD-container">
                                <span>AD</span>
                            </div>
                            <div className="chatgpt-img" onClick={openGPTModal}>
                                <img src={gpt} alt="gpt-img" />
                            </div>
                        </div>

                        {/* 페이징 */}
                        <div className="GeneralMain-pagination">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`general-paging-button ${
                                        currentPage === index + 1 ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={GPTModalIsOpen}
                    onRequestClose={closeGPTModal}
                    contentLabel="챗지피티"
                    className="gptmodal"
                    overlayClassName="gptoverlay"
                >
                    <div className="gptModal-container">
                        <div className="gptModal-title-container">
                            <span>Open Ai 검색하기</span>
                            <div className="X-img" onClick={closeGPTModal}>
                                <img src={Ximg} alt="close-img" />
                            </div>
                        </div>
                        <div className="gptModal-chat">
                            {loading && (
                                <span className="gptModal-messageWait">
                                    답변을 기다리고 있습니다
                                </span>
                            )}
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`gptModal-message ${msg.sender}`}
                                >
                                    {msg.sender === "user" && <p>{msg.message}</p>}
                                    {msg.sender === "bot" && (
                                        <>
                                            <img src={gpt} alt="GPT" />
                                            <div className="message-content">
                                                <p>{msg.message}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="gptModal-inputDiv">
                            <input
                                type="text"
                                placeholder="질문을 입력해주세요."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div
                                className="submit-img"
                                onClick={handleSendMessage}
                            >
                                <img src={submitimg} alt="gptsubmit-img" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default GeneralMain;
