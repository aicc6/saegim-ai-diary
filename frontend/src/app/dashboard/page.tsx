"use client";

import { getCurrentUser } from '@/lib/fakeAuth';

export default function DashboardPage() {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="page-content">
      <div className="welcome-card">
        <h2>환영합니다, {user.name}님!</h2>
        <p>오늘도 좋은 하루 되세요.</p>
      </div>

      <div className="info-section">
        <h3>사용 가이드</h3>
        <ul>
          <li>왼쪽 사이드바의 마이페이지에서 개인정보를 관리할 수 있습니다.</li>
          <li>프로필 정보 수정, 비밀번호 변경 등이 가능합니다.</li>
          <li>필요한 경우 비밀번호 찾기 기능을 이용할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}