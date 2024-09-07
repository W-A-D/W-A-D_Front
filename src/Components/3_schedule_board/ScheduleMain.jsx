import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ScheduleMain.css';
import magnifier from './scheduleboard_images/magnifier.png';
import wadAlien from './scheduleboard_images/wadposter.png';
import profileIcon from './scheduleboard_images/profile.png';
import viewIcon from './scheduleboard_images/view.png';
import likeIcon from './scheduleboard_images/heart.png';
import firstIcon from './scheduleboard_images/first.png';
import prevIcon from './scheduleboard_images/prev.png';
import nextIcon from './scheduleboard_images/next.png';
import lastIcon from './scheduleboard_images/last.png';

function ScheduleMain() {
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); // State to track the selected category
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 7; // Number of posts per page

    const navigate = useNavigate();

    const handleScheduleWriteClick = () => {
        navigate('/scheduleWrite');
    };

    const handlePostClick = (index) => {
        navigate(`/schedule/${index}`);
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/schedules');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Function to filter posts based on the selected category
    const filteredPosts = selectedCategory
        ? posts.filter(post => post.category === selectedCategory)
        : posts;

    // Calculate the current posts to display
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Pagination navigation
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(nextPage => Math.min(nextPage + 1, totalPages));
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // Toggle the category selection
    const toggleCategory = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(''); // Deselect if the same category is clicked
        } else {
            setSelectedCategory(category); // Select the new category
        }
        setCurrentPage(1); // Reset to the first page when category is changed
    };

    return (
        <div className="ScheduleMain_container">
            <div className='ScheduleMain_miniheader'>
                <div className="ScheduleMain_Title">일정 게시판</div>
                <div className='ScheduleMain_postSorter'>
                    <div className='ScheduleMain_SearchBar'>
                        <div className='ScheduleMain_magnifier'><img src={magnifier} alt="SchduleSearchIcon" /></div>
                        <input type="text" className='ScheduleMain_searcharea' />
                    </div>
                    <div className='SchedueMain_CategoryBar'>
                        <div
                            className={`SchedueMain_planningCat ${selectedCategory === '기획' ? 'active' : ''}`}
                            onClick={() => toggleCategory('기획')}
                        >
                            기획
                        </div>
                        <div
                            className={`SchedueMain_designCat ${selectedCategory === '디자인' ? 'active' : ''}`}
                            onClick={() => toggleCategory('디자인')}
                        >
                            디자인
                        </div>
                        <div
                            className={`SchedueMain_frontCat ${selectedCategory === '프론트엔드' ? 'active' : ''}`}
                            onClick={() => toggleCategory('프론트엔드')}
                        >
                            프론트엔드
                        </div>
                        <div
                            className={`SchedueMain_backCat ${selectedCategory === '백엔드' ? 'active' : ''}`}
                            onClick={() => toggleCategory('백엔드')}
                        >
                            백엔드
                        </div>
                    </div>
                </div>
            </div>
            <div className='ScheduleMain_PostContainer'>
                <div className='ScheduleMain_PostArea'>
                    <div className='ScheduleMain_WritePost' onClick={handleScheduleWriteClick}>+</div>

                    {/* Filtered post list */}
                    {currentPosts.map((post, index) => (
                        <div key={index} className='ScheduleMain_Post' onClick={() => handlePostClick(index)}>
                            <div className='ScheduleMain_postHeader'>
                                <div className='ScheduleMain_userInfo'>
                                    <div className='ScheduleMain_profileImg'><img src={profileIcon} alt="프로필이미지" /></div>
                                    <div className='ScheduleMain_profileName'>{post.userName}</div>
                                </div>
                                <div className='ScheduleMain_days_ago'>{post.daysAgo}</div>
                            </div>
                            <div className='ScheduleMain_postInfo'>
                                <div className='ScheduleMain_postCategory'>
                                    {post.category}
                                </div>
                                <div className='ScheduleMain_postTitle'>
                                    {post.title}
                                </div>
                                <div className='ScheduleMain_additionalInfo'>
                                    <div className='ScheduleMain_postView'>
                                        <div className='ScheduleMain_postViewIcon'>
                                            <img src={viewIcon} alt="" />
                                        </div>
                                        <div className='ScheduleMain_postViewText'>
                                            {post.views}
                                        </div>
                                    </div>
                                    <div className='ScheduleMain_postLike'>
                                        <div className='ScheduleMain_postLikeIcon'><img src={likeIcon} alt="" /></div>
                                        <div className='ScheduleMain_postLikeText'>
                                            {post.likes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Filtered post list / */}
                </div>
                <div className='ScheduleMain_AdArea'>
                    <div className='ScheduleMain_Ad1'>
                        <img src={wadAlien} alt="와안외" />
                    </div>
                    <div className='ScheduleMain_Ad2'>
                        AD
                    </div>
                </div>
            </div>
            <div className='ScheduleMain-pagination'>
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
    )
}

export default ScheduleMain;
