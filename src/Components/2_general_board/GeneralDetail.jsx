import "./GeneralDetail.css";
import backImg from './generalboard_images/backimg.png';
import heart from "./generalboard_images/heart.png";
import userprofile from "./generalboard_images/userprofile.png";
import commentimg from "./generalboard_images/comment.png";
import seeimg from "./generalboard_images/see.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function GeneralDetail() {
  const { boardPostId } = useParams(); // URL에서 boardPostId를 가져옵니다.
  const [submitComment, setComment] = useState(''); // 제목 상태
  const [qnaItem, setQnaItem] = useState({}); // 게시물 데이터를 저장할 상태
  const [boardComments, setBoardComments] = useState([]); // 댓글 데이터를 저장할 상태

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchQnaItem = async () => {
      try {
        const response = await axios.get(`http://43.203.243.173:8080/board/post/${boardPostId}`);
        const data = response.data;
        setQnaItem({
          ...data,
          daysAgo: calculateDaysAgo(data.createdAt),
        }); // 게시물 데이터를 상태에 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchQnaItem();
  }, [boardPostId]);
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://43.203.243.173:8080/comments/post/${boardPostId}`);
      const data = response.data;

      if (Array.isArray(data)) {
        setBoardComments(data);
      } else if (data) {
        setBoardComments([data]); // 댓글이 한 개일 경우 객체를 배열로 변환
      } else {
        setBoardComments([]);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [boardPostId]);


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 생성
  const handleCommentSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      boardPostId: boardPostId,
      content: submitComment
    };

    try {
      const response = await axios.post(`http://43.203.243.173:8080/comments/save`, data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert('등록이 완료되었습니다.');
        setComment(''); // 댓글 작성 후 입력 필드 초기화
        fetchComments(); // 댓글 목록 다시 가져오기 (새로고침 효과)
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const calculateDaysAgo = (createdAt) => {
    const date1 = new Date(createdAt);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const navigate = useNavigate();
  const GeneralMain = () => {
    navigate('/general');
  };

  return (
    <div className="GeneralDetail-container">
      <div className="back_image2" onClick={GeneralMain}>
        <img src={backImg} alt="back_image" />
      </div>
      <div className="GeneralDetail-main-container">
        <div className="QNA-detail-container">
          <div className="QNA-detail-top">
            <div className="detail-profile">
              <div className="detail-profile-img">
                <img src={userprofile} alt="user-img" />
              </div>
              <div className="detail-profile-username">{qnaItem.username}</div>
            </div>
            <div className="QNA-detail-ago">{qnaItem.daysAgo}일 전</div>
          </div>
          <div className="QNA-detail-main">
            <div className="QNA-detail-title">
              <div className="QNA-detail-section">
                {qnaItem.type}
              </div>
              <div className="QNA-detail-title">
                {qnaItem.title}
              </div>
            </div>
            <div className="QNA-detail-contents">
              {qnaItem.content}
            </div>
            <div className="QNA-detail-see-like-comment">
              <div className="QNA-detail-see-img">
                <img src={seeimg} alt="see-img" />
                <span>4</span>
              </div>
              <div className="QNA-detail-like-img">
                <img src={heart} alt="like-img" />
                <span>0</span>
              </div>
              <div className="QNA-detail-comment-img">
                <img src={commentimg} alt="comment-img" />
                <span>1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="QNA-detail-comment-write">
          <label>
            <textarea
              type="text"
              placeholder="답변을 입력해주세요."
              value={submitComment}
              onChange={handleCommentChange}
            />
          </label>
          <button className="detail-comment-submit-button" onClick={handleCommentSubmit}>답변하기</button>
        </div>
        {Array.isArray(boardComments) && boardComments.map((boardComment) => (
          <div key={boardComment.commentId} className="QNA-detail-comment">
            <div className="comment-detail-top">
              <div className="comment-detail-profile">
                <div className="detail-profile-img">
                  <img src={userprofile} alt="user-img" />
                </div>
                <div className="comment-detail-profile-username">{boardComment.username}</div>
              </div>
              <div className="comment-detail-ago">{calculateDaysAgo(boardComment.createdAt)}일 전</div>
            </div>
            <div className="comment-detail-contents">{boardComment.content}</div>
            <div className="comment-detail-like-comment">
              <div className="comment-detail-like">
                <img src={heart} alt="like-img" />
                <span>0</span>
              </div>
              <div className="comment-detail-comment">
                <img src={commentimg} alt="comment-img" />
                <span>0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneralDetail;
