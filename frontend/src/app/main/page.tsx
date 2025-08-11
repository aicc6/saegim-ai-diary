"use client";

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="welcome-section">
        <h1>환영합니다!</h1>
        <p>새김 AI 다이어리와 함께 특별한 하루를 기록해보세요.</p>
      </div>
      
      <div className="features-section">
        <h2>주요 기능</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>AI 다이어리</h3>
            <p>AI가 도와주는 스마트한 일기 작성</p>
          </div>
          <div className="feature-card">
            <h3>감정 분석</h3>
            <p>일기 내용 기반 감정 상태 분석</p>
          </div>
          <div className="feature-card">
            <h3>회고 리포트</h3>
            <p>월간/연간 자동 회고 리포트 생성</p>
          </div>
        </div>
      </div>
    </div>
  );
}
