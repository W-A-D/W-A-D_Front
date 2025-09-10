import explainImage1 from './images/addexplain1.png';
import explainImage2 from './images/addexplain2.png';
import "./AddExplain.css"


function AddExplain() {

  return (
    <div className='wad_addexplain_container'>

      <div className="explain_title">
        <span className='wad_highlight'>WAD</span>를 이럴때 사용해보세요
      </div>

      <div className='explain_main'>

        <div className="explain_subtitle_1">
          <div className="addexplain_Image1">
            <img src={explainImage1} alt="addexplain_image1" />
          </div>
          <div className='explain_subtitle_1_text'>
            <div className="explain_subtitle_1_q">
              기획, 디자인, 개발 중에
              <br />예기치 않은 문제가 발생하거나
              <br />궁금증이 생기셨나요?
            </div>
            <div className="subtitle_1_contents">
              WAD는 OpenAI를 활용하여 실시간으로 맞춤형 솔루션을 제공합니다.
              <br />복잡한 문제 해결과 필요한 정보 검색이 더욱 쉬워지며,
              <br />작업 효율성을 높일 수 있습니다.
            </div>
          </div>
        </div>
        <div className="explain_subtitle_2">
          <div className="addexplain_Image2">
            <img src={explainImage2} alt="addexplain_image2" />
          </div>
          <div className='explain_subtitle_2_text'>
            <div className="explain_subtitle_2_q">
              프로젝트 계획 수립에 어려움이 있으신가요?
            </div>
            <div className="subtitle_2_contents">
              WAD는 OpenAI를 통해 체계적인 일정을 작성하도록 도와드립니다.
              <br />다른 유저들의 프로젝트 계획과 진행 상황을 열람하여
              <br />다양한 인사이트를 얻을 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddExplain;
