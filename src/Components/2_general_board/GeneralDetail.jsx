import "./GeneralDetail.css"
import backImg from './generalboard_images/backimg.png';
import heart from "./generalboard_images/heart.png";
import userprofile from "./generalboard_images/userprofile.png"
import comment from "./generalboard_images/comment.png";
import seeimg from "./generalboard_images/see.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'; 
import { useParams } from "react-router-dom";


function GeneralDetail() {
  const { boardPostId } = useParams(); // URL에서 boardPostId를 가져옵니다.
  const [qnaItem, setQnaItem] = useState([]); // 게시물 데이터를 저장할 상태

  const calculateDaysAgo = (createdAt) => {
    const date1 = new Date(createdAt);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

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
  }, [boardPostId]); // boardPostId가 변경될 때마다 데이터를 다시 가져옵니다.


    
  const commentDetail = [
    {
      id: "1",
      userName: "애옹"
    },
    {
      id: "2",
      userName: "야옹"
    },
    {
      id: "3",
      userName: "미야옹"
    },
    {
      id: "4",
      userName: "먀아"
    }
  ]

  const navigate = useNavigate();
  const GeneralMain = () => {
    navigate('/general')
  }

  return (
    <div className="GeneralDetail-container" >
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
              <div className="detail-profile-username">{qnaItem.UserId}</div>
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
                <span>
                  {/* {qnaItem.likes} */}
                  5</span>
              </div>
              <div className="QNA-detail-comment-img">
                <img src={comment} alt="comment-img" />
                <span>
                  {/* {qnaItem.comments} */}
                  3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="QNA-detail-comment-write">
          <label>
            <textarea
              type="text"
              placeholder="답변을 입력해주세요."
            />
          </label>
          <button className="detail-comment-submit-button">답변하기</button>
        </div>
        {commentDetail.map((commentdetail, id) => (
          <div key={id} className="QNA-detail-comment">
            <div className="comment-detail-top">
              <div className="comment-detail-profile">
                <div className="detail-profile-img">
                  <img src={userprofile} alt="user-img" />
                </div>
                <div className="comment-detail-profile-username">{commentdetail.userName}</div>
              </div>
              <div className="comment-detail-ago">1일 전</div>
            </div>
            <div className="comment-detail-contents">
              치료가 필요할 정도로 심각한 탕후루 송 중독입니다.
            </div>
            <div className="comment-detail-like-comment">
              <div className="comment-detail-like">
                <img src={heart} alt="like-img" />
                <span>3</span>
              </div>
              <div className="comment-detail-comment">
                <img src={comment} alt="comment-img" />
                <span>5</span>
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default GeneralDetail;