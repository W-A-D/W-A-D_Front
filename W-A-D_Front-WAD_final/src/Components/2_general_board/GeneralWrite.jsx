import "./GeneralWrite.css";
import backImg from './generalboard_images/backimg.png';
import fileImg from './generalboard_images/fileimg.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // axios 임포트

function GeneralWrite() {
  const [selectedOption, setSelectedOption] = useState('');  // 선택된 옵션을 저장할 상태 변수
  const [title, setTitle] = useState(''); // 제목 상태
  const [content, setContent] = useState(''); // 내용 상태
  // const [file, setFile] = useState(null); // 선택된 파일 상태
  // const [fileName, setFileName] = useState('파일 첨부'); // 파일 이름 상태

  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFile(URL.createObjectURL(file)); // 선택된 파일의 URL 설정
  //     setFileName(file.name); // 파일 이름 설정
  //     setFile(file); // 파일 상태 설정
  //   }
  // };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };



  const handleSubmit = async () => {

    const accessToken=localStorage.getItem('accessToken')

    const data={
      title:title,
      type:selectedOption,
      content:content
    }

    try {
      const response = await axios.post('http://43.203.243.173:8080/board/save', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/json', 
        },
        withCredentials: true,
    });
      if (response.status === 200) {
        alert('등록이 완료되었습니다.');
        navigate('/general'); // 성공 시 일반 게시판 페이지로 이동
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };


  return (
    <div className="GeneralWrite_container">
      <div className="general-board-title-container">
        <div className="board-title-contents">
          <div className="back_image" onClick={() => navigate('/general')}>
            <img src={backImg} alt="back_image" />
          </div>
          <div className="board-write-text">게시물 작성하기</div>
        </div>
        <div>
          <button className="board-submit-buttom" onClick={handleSubmit}>등록하기</button>
        </div>
      </div>

      <div className="board-input-container">
        <div className="title-check-container">
          <div>
            <label>
              <input
                type="text"
                className="title1"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </label>
          </div>
          <div className="radio-container">
            <label>
              <input
                type="radio"
                name="option"
                value="기획"
                checked={selectedOption === '기획'}
                onChange={handleOptionChange}
              />
              기획             
            </label>
            <label>
              <input
                type="radio"
                name="option"
                value="디자인"
                checked={selectedOption === '디자인'}
                onChange={handleOptionChange}
              />
              디자인             
            </label>
            <label>
              <input
                type="radio"
                name="option"
                value="프론트엔드"
                checked={selectedOption === '프론트엔드'}
                onChange={handleOptionChange}
              />
              프론트엔드             
            </label>
            <label>
              <input
                type="radio"
                name="option"
                value="백엔드"
                checked={selectedOption === '백엔드'}
                onChange={handleOptionChange}
              />
              백엔드             
            </label>
          </div>
        </div>

        <div>
          <label>
            <textarea
              className="contents1"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={handleContentChange}
              required
            />
          </label>
        </div>

        <div className="input_file" onClick={() => document.getElementById('fileInput').click()}>
          <div className="file_image">
            <img src={fileImg} alt="file_image" />
          </div>
          <div className="file_text">
            {/* {fileName} */}
          </div>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            // onChange={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralWrite;
