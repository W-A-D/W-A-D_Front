import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTop from './Components/ScrolltoTop';

import './index.css'

import WADpublicheader from './Components/1_mainpage/WADpublicheader'
import WADpublic from './Components/1_mainpage/WADpublic'

import Intro from './Components/1_mainpage/Intro'
import AddExplain from './Components/1_mainpage/AddExplain'
import Footer from './Components/1_mainpage/Footer'
import WADmain from './Components/1_mainpage/WADmain'
import Header from './Components/1_mainpage/Header'

import GeneralMain from './Components/2_general_board/GeneralMain';
import GeneralHeader from './Components/2_general_board/GeneralHeader';
import GeneralDetail from './Components/2_general_board/GeneralDetail';
import GeneralWrite from './Components/2_general_board/GeneralWrite';

import ScheduleMain from './Components/3_schedule_board/ScheduleMain';
import ScheduleWrite from './Components/3_schedule_board/ScheduleWrite';
import ScheduleHeader from './Components/3_schedule_board/ScheduleHeader';
import ScheduleDetail from './Components/3_schedule_board/ScheduleDetail';

import MypageHeader from './Components/4_mypage/MypageHeader';
import MypageMyQ from './Components/4_mypage/MypageMyQ';
import MypageMyA from './Components/4_mypage/MypageMyA';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<div><WADpublicheader /><WADpublic /><Intro /><AddExplain /><Footer /></div>} />
        <Route path="/mainpage" element={<div><Header /><WADmain /><Intro /><AddExplain /><Footer /></div>} />
        
        <Route path="/general" element={<div><GeneralHeader /><GeneralMain /></div>} />
        <Route path="/generalWrite" element={<div><GeneralHeader /><GeneralWrite /></div>} />
        <Route path="/GeneralDetail/:boardPostId" element={<div><GeneralHeader /><GeneralDetail /></div>} />
        
        <Route path="/schedule" element={<div><ScheduleHeader /><ScheduleMain /></div>} />
        <Route path="/scheduleWrite" element={<div><ScheduleHeader /><ScheduleWrite /></div>} />
        <Route path="/schedule/:scpostid" element={<div><ScheduleHeader /><ScheduleDetail /></div>} />

        <Route path="/mypageQ" element={<div><MypageHeader /><MypageMyQ /></div>} />
        <Route path="/mypageA" element={<div><MypageHeader /><MypageMyA /></div>} />
      </Routes>
    </Router>
  </React.StrictMode>
)
