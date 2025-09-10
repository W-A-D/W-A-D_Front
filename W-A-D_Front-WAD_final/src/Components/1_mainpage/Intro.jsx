import aiImage from './images/ai.png';
import "./Intro.css"

import { Element } from 'react-scroll';

function Intro() {
  return (
    <Element name="intro-section" className='wad_intro_container'>
      <div className='wad_text_container'>
        <div className="wad_title">
          <div className="wad_title_text">What is <span className='wad_highlight'>WAD</span>?</div>
        </div>
        <div className="wad_sub_title">
          <div className="wad_sub_title_text">OpenAI를 활용하여 기획, 디자인, 개발에 대한 맞춤 솔루션을 제공하고,
            <br />프로젝트를 체계적으로 진행하도록 일정 계획 및 공유를 지원하는 서비스입니다.
          </div>
        </div>
      </div>
      <div className="intro_aiImage">
        <img src={aiImage} alt="Open AI" />
      </div>
    </Element>
  )
}

export default Intro;
