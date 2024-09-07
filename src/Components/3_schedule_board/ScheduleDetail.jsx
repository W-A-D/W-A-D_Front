import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
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

    const ReturntoScheduleBoardMain = useNavigate();
    const handleReturntoScheduleMain = () => {
        ReturntoScheduleBoardMain('/schedule');
    };

    const [value, onChange] = useState(new Date());
    const { id } = useParams(); // URL의 id 파라미터를 가져옴
    const [post, setPost] = useState(null);

    useEffect(() => {
        // 특정 ID에 해당하는 글을 가져옴
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/schedules/${id}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const renderSchedulesOnCalendar = ({ date, view }) => {
        if (view === 'month' && post?.scheduleData) {
            const dateStr = moment(date).format('YYYY.MM.DD');
            const matchingSchedule = post.scheduleData.find(schedule =>
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

    if (!post) return <div>Loading...</div>;

    return (
        <div className="ScheduleDetail_container">
            <div className='GotoScheduleBoardMain' onClick={handleReturntoScheduleMain}>
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
                        <div className="ScheduleDetail_category">{post.category}</div>
                        <div className="ScheduleDetail_title">{post.title}</div>
                    </div>

                    <div className="ScheduleDetail_body">
                        <div className="ScheduleDetail_postInfo">
                            <div className="ScheduleDetail_userInfo">
                                <div className="ScheduleDetail_profileImg">
                                    <img src={post.profileIcon || defaultProfile} alt="프로필 이미지" />
                                </div>
                                <div className="ScheduleDetail_profileName">{post.userName}</div>
                            </div>
                            <div className="ScheduleDetail_date">{post.daysAgo}</div>
                        </div>
                        <div className='ScheduleDetail_grayBar1'>
                            <img src={grayBar} alt="grayBar1" />
                        </div>
                        <div className='ScheduleDetail_mainContents'>
                            {post.scheduleData.map((schedule, index) => (
                                <div key={index} className="ScheduleDetail_item">
                                    <div className="ScheduleDetail_term">
                                        {schedule.startDay} ~ {schedule.endDay}
                                    </div>
                                    <div className="ScheduleDetail_title">
                                        {schedule.title}
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
                                {post.views}
                            </div>
                        </div>
                        <div className='ScheduleDetail_postLike'>
                            <div className='ScheduleDetail_postLikeIcon'><img src={likeIcon} alt="" /></div>
                            <div className='ScheduleDetail_postLikeText'>
                                {post.likes}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ScheduleDetail;
