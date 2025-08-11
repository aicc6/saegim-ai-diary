"use client";

import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/fakeAuth';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function MainLayout({
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
    <div className="main-layout">
      {/* 왼쪽 사이드바 */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">새김 AI 다이어리</h1>
          <p className="sidebar-user">환영합니다, {user.name}님!</p>
        </div>
        
        <div className="sidebar-menu">
          <a href="/main" className="sidebar-link">
            <span className="sidebar-icon">📝</span>
            메인 페이지
          </a>
          <a href="/mypage/profile" className="sidebar-link">
            <span className="sidebar-icon">👤</span>
            마이페이지
          </a>
          <button onClick={handleLogout} className="sidebar-link logout-button">
            <span className="sidebar-icon">🚪</span>
            로그아웃
          </button>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}