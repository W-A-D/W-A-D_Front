import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';
import './ScheduleWrite.css';
import GotoScheduleBoardMain from './scheduleboard_images/arrow-back.png';
import UncheckedIcon from './scheduleboard_images/uncheck_1.png';
import CheckedIcon from './scheduleboard_images/check.png';
import arrowLeft from './scheduleboard_images/arrow-left.png';
import arrowRight from './scheduleboard_images/arrow-right.png';

function ScheduleWrite() {
  const [value, onChange] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [schedules, setSchedules] = useState([{ startDay: '', endDay: '', title: '' }]);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  const handleAddScheduleForm = () => {
    setSchedules([...schedules, { startDay: '', endDay: '', title: '' }]);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = schedules.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    );
    setSchedules(updatedSchedules);
  };

  const renderSchedulesOnCalendar = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('YYYY.MM.DD');
      const matchingSchedule = schedules.find(schedule =>
        moment(date).isBetween(schedule.startDay, schedule.endDay, null, '[]')
      );

      if (matchingSchedule) {
        const isStartDate = dateStr === matchingSchedule.startDay;
        const isEndDate = dateStr === matchingSchedule.endDay;

        return (
          <div
            className={`schedule-highlight 
              ${isStartDate ? 'start' : ''} 
              ${isEndDate ? 'end' : ''}
              ${isStartDate && isEndDate ? 'single-day' : ''}`}
          />
        );
      }
    }
    return null;
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    setMessages([]);
    setLoading(true);

    const summaryRequest = `Summarize the core of the answer to the user's input in 3 steps in Korean: ${message}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: summaryRequest }],
          max_tokens: 1024,
          top_p: 1,
          temperature: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
          stop: ['문장 생성 중단 단어'],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'No response';
      addMessage('bot', aiResponse);
    } catch (error) {
      console.error('오류 발생!', error);
      addMessage('bot', '오류 발생!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatResponse = (text) => {
    return text.split('\n').map((line, index) => <div key={index}>{line}</div>);
  };

  const GobacktoScheduleBoardMain = useNavigate();
  const handleBacktoScheduleMain = () => {
    GobacktoScheduleBoardMain('/schedule');
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!selectedCategory) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i];
      if (!schedule.startDay.trim() || !schedule.endDay.trim() || !schedule.title.trim()) {
        alert(`일정 ${i + 1}의 시작일자, 종료일자, 제목을 모두 입력해주세요.`);
        return;
      }
    }

    // 카테고리 한글 변환
    let categoryKorean;
    switch (selectedCategory) {
      case 'planning':
        categoryKorean = '기획';
        break;
      case 'design':
        categoryKorean = '디자인';
        break;
      case 'front':
        categoryKorean = '프론트엔드';
        break;
      case 'back':
        categoryKorean = '백엔드';
        break;
      default:
        categoryKorean = '';
    }

    // 일정 데이터 변환
    const dateRanges = schedules.map(schedule => ({
      startDate: schedule.startDay,
      endDate: schedule.endDay,
      content: schedule.title
    }));

    // 전송할 데이터 생성
    const data = {
      title,
      type: categoryKorean,
      dateRanges
    };

    try {
      // LocalStorage에서 accessToken 가져오기
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('Access Token이 없습니다. 다시 로그인 해주세요.');
      }

      // 서버로 일정 저장 요청
      const response = await axios.post('http://43.203.243.173:8080/schedule/save', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,  // 액세스 토큰을 Authorization 헤더에 추가
        },
      });

      if (response.status === 200) {
        console.log('Success:', response.data);
        alert('일정이 성공적으로 등록되었습니다.');
        // 페이지 이동 처리    
        GobacktoScheduleBoardMain('/schedule');
      } else {
        throw new Error('Failed to create schedule');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        alert('인증 실패: 다시 로그인해주세요.');
      } else {
        alert('일정 등록에 실패했습니다.');
      }
    }
  };

  return (
    <div className="ScheduleWrite_container">
      <div className="Schedulewrite_miniheader">
        <div className='Schedule_miniheader_left'>
          <div className='GotoScheduleBoardMain' onClick={handleBacktoScheduleMain}>
            <img src={GotoScheduleBoardMain} alt="handleBacktoScheduleMain" />
          </div>
          <div className='ScheduleWriteText'>
            일정 게시글 작성하기
          </div>
        </div>
        <div className='Upload_Schedule' onClick={handleSubmit}>
          등록하기
        </div>
      </div>

      <div className='ScheduleWriteMain'>
        <div className='ScheduleWriteLeftArea'>
          <div className="ScheduleCategory">
            <div onClick={() => handleCategorySelect('planning')} className={selectedCategory === 'planning' ? 'category-selected' : ''}>
              <img
                src={selectedCategory === 'planning' ? CheckedIcon : UncheckedIcon}
                alt="planning"
                className="category-icon"
              />
              <span>기획</span>
            </div>
            <div onClick={() => handleCategorySelect('design')} className={selectedCategory === 'design' ? 'category-selected' : ''}>
              <img
                src={selectedCategory === 'design' ? CheckedIcon : UncheckedIcon}
                alt="design"
                className="category-icon"
              />
              <span>디자인</span>
            </div>
            <div onClick={() => handleCategorySelect('front')} className={selectedCategory === 'front' ? 'category-selected' : ''}>
              <img
                src={selectedCategory === 'front' ? CheckedIcon : UncheckedIcon}
                alt="front"
                className="category-icon"
              />
              <span>프론트엔드</span>
            </div>
            <div onClick={() => handleCategorySelect('back')} className={selectedCategory === 'back' ? 'category-selected' : ''}>
              <img
                src={selectedCategory === 'back' ? CheckedIcon : UncheckedIcon}
                alt="back"
                className="category-icon"
              />
              <span>백엔드</span>
            </div>
          </div>

          <div className="calendar">
            <Calendar
              onChange={onChange}
              value={value}
              calendarType='gregory'
              showNeighboringMonth={true}
              formatDay={(locale, date) => moment(date).format("D")}
              formatMonthYear={(locale, date) => moment(date).format("YYYY M월")}
              nextLabel={<img src={arrowRight} alt="Next Month" className='arrowRight' />}
              prevLabel={<img src={arrowLeft} alt="Previous Month" className='arrowLeft' />}
              next2Label={null}
              prev2Label={null}
              tileContent={renderSchedulesOnCalendar}
            />
          </div>
        </div>

        <div className='ScheduleWriteRightArea'>
          <div className='ScheduleWrite_Title'>
            <label>
              <input type="text" className="schedule-title" placeholder="제목을 입력해주세요" required value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </div>

          <div className='ScheduleWrite_Main'>
            <div className='ScheduleWrite_Main_title'>새로운 일정 추가하기</div>
            {schedules.map((schedule, index) => (
              <div key={index} className='Schedule_form'>
                <div className='Schedule_term'>
                  <div className='Schedule_StartDay'>
                    <input
                      type='text'
                      className='Schedule_StartDay_input'
                      value={schedule.startDay}
                      placeholder="시작일자 YYYY.MM.DD"
                      onChange={(e) => handleScheduleChange(index, 'startDay', e.target.value)}
                    />
                  </div>
                  <div> ~ </div>
                  <div className='Schedule_EndDay'>
                    <input
                      type='text'
                      className='Schedule_EndDay_input'
                      value={schedule.endDay}
                      placeholder="종료일자 YYYY.MM.DD"
                      onChange={(e) => handleScheduleChange(index, 'endDay', e.target.value)}
                    />
                  </div>
                </div>
                <div className='Schedule-project-title'>
                  <textarea
                    className='Schedule-project-title-input'
                    placeholder='제목'
                    value={schedule.title}
                    onChange={(e) => handleScheduleChange(index, 'title', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <div className='Schedule-addButton' onClick={handleAddScheduleForm}>+</div>
          </div>

          <div className='Schedule_By_OpenAi_header'>일정 계획이 어려우시다면, <span>OpenAI를 사용해보세요!</span></div>
          <div className='Schedule_By_OpenAi_body'>
            <div className='User-Request'>
              <input type="text" className='User-Request-input' placeholder="예) 00 서비스 프로젝트를 진행할건데, 디자인 플랜을 만들어줘." value={userInput} onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown} />
            </div>
            <div className='Ai-Respond'>
              {loading && <span className="messageWait" />}
              {messages
                .filter(msg => msg.sender === 'bot') // Filter only bot messages
                .map((msg, index) => (
                  <div key={index} className="message bot">
                    {formatResponse(msg.message)}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleWrite;
