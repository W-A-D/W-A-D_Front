import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';

import './ScheduleDetail.css';
import GotoScheduleBoardMain from './scheduleboard_images/arrow-back.png';
import defaultProfile from './scheduleboard_images/profile.png';
import arrowLeft from './scheduleboard_images/arrow-left.png';
import arrowRight from './scheduleboard_images/arrow-right.png';
import grayBar from './scheduleboard_images/grayBar.png';
import viewIcon from './scheduleboard_images/view.png';
import likeIcon from './scheduleboard_images/heart.png';

function ScheduleDetail() {
    const navigate = useNavigate();
    const { scpostid } = useParams(); // URL의 scpostid 파라미터를 가져옴
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://43.203.243.173:8080/schedule/post/${scpostid}`);
                setPost(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('해당 게시글을 찾을 수 없습니다.');
                } else {
                    setError('게시글을 불러오는 중 오류가 발생했습니다.');
                }
            }
        };

        if (scpostid) {
            fetchPost();
        }
    }, [scpostid]);

    const renderSchedulesOnCalendar = ({ date, view }) => {
        if (view === 'month' && post?.dateRanges) {
            const dateStr = moment(date).format('YYYY.MM.DD');
            const matchingSchedule = post.dateRanges.find(schedule =>
                moment(date).isBetween(schedule.startDate, schedule.endDate, null, '[]')
            );

            if (matchingSchedule) {
                const isStartDate = dateStr === matchingSchedule.startDate;
                const isEndDate = dateStr === matchingSchedule.endDate;

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

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ScheduleDetail_container">
            <div className='GotoScheduleBoardMain' onClick={() => navigate('/schedule')}>
                <img src={GotoScheduleBoardMain} alt="handleBacktoScheduleMain" />
            </div>
            <div className='ScheduleDetailMainArea'>
                <div className='ScheduleDetailLeftArea'>
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
                <div className='ScheduleDetailRightArea'>
                    <div className="scheduleDetail_postheader">
                        <div className="ScheduleDetail_category">{post.type}</div>
                        <div className="ScheduleDetail_title">{post.title}</div>
                    </div>

                    <div className="ScheduleDetail_body">
                        <div className="ScheduleDetail_postInfo">
                            <div className="ScheduleDetail_userInfo">
                                <div className="ScheduleDetail_profileImg">
                                    <img src={defaultProfile} alt="프로필 이미지" />
                                </div>
                                <div className="ScheduleDetail_profileName">{post.username}</div>
                            </div>
                            <div className="ScheduleDetail_date">
                                {moment(post.createdAt).fromNow()} 작성
                            </div>
                        </div>
                        <div className='ScheduleDetail_grayBar1'>
                            <img src={grayBar} alt="grayBar1" />
                        </div>
                        <div className='ScheduleDetail_mainContents'>
                            {post.dateRanges && post.dateRanges.map((schedule, index) => (
                                <div key={index} className="ScheduleDetail_item">
                                    <div className="ScheduleDetail_term">
                                        {schedule.startDate} ~ {schedule.endDate}
                                    </div>
                                    <div className="ScheduleDetail_title">
                                        {schedule.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='ScheduleDetail_grayBar2'>
                            <img src={grayBar} alt="grayBar2" />
                        </div>
                    </div>
                    <div className='ScheduleDetail_additionalInfo'>
                        <div className='ScheduleDetail_postView'>
                            <div className='ScheduleDetail_postViewIcon'>
                                <img src={viewIcon} alt="" />
                            </div>
                            <div className='ScheduleDetail_postViewText'>
                                {post.views || 0}
                            </div>
                        </div>
                        <div className='ScheduleDetail_postLike'>
                            <div className='ScheduleDetail_postLikeIcon'><img src={likeIcon} alt="" /></div>
                            <div className='ScheduleDetail_postLikeText'>
                                {post.likes || 0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleDetail;
