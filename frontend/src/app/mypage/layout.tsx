"use client";

import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/fakeAuth';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>새김 AI 다이어리</h1>
            <p>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mypage-layout">
      {/* 왼쪽 사이드바 */}
      <nav className="mypage-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">새김 AI 다이어리</h1>
          <p className="sidebar-user">환영합니다, {user.name}님!</p>
        </div>
        
        <div className="sidebar-menu">
          <a href="/main" className="sidebar-link">
            <span className="sidebar-icon">🏠</span>
            메인 페이지
          </a>
          
          <div className="menu-section">
            <h3 className="menu-section-title">마이페이지</h3>
            <a href="/mypage/profile" className="sidebar-link">
              <span className="sidebar-icon">👤</span>
              프로필 정보
            </a>
            <a href="/mypage/password" className="sidebar-link">
              <span className="sidebar-icon">🔒</span>
              비밀번호 변경
            </a>
            <a href="/mypage/reset-password" className="sidebar-link">
              <span className="sidebar-icon">🔑</span>
              비밀번호 찾기
            </a>
            <a href="/mypage/account" className="sidebar-link">
              <span className="sidebar-icon">⚙️</span>
              계정 설정
            </a>
          </div>
          
          <button onClick={handleLogout} className="sidebar-link logout-button">
            <span className="sidebar-icon">🚪</span>
            로그아웃
          </button>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="mypage-content">
        {children}
      </main>
    </div>
  );
}
