"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2>메뉴</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            href="/dashboard" 
            className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            대시보드
          </Link>

          <div className="sidebar-section">
            <h3>마이페이지</h3>
            <Link 
              href="/mypage/profile" 
              className={`sidebar-link ${isActive('/mypage/profile') ? 'active' : ''}`}
            >
              프로필 정보
            </Link>
            
            <Link 
              href="/mypage/password" 
              className={`sidebar-link ${isActive('/mypage/password') ? 'active' : ''}`}
            >
              비밀번호 변경
            </Link>
            
            <Link 
              href="/mypage/reset-password" 
              className={`sidebar-link ${isActive('/mypage/reset-password') ? 'active' : ''}`}
            >
              비밀번호 찾기
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}