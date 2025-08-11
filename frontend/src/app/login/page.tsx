"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/fakeAuth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = signIn(formData.email, formData.password);
    if (result.success) {
      router.push('/main');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo1234'
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>새김 AI 다이어리</h1>
          <p>당신의 하루를 기록하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="비밀번호를 입력하세요"
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="auth-button">
            로그인
          </button>

          <button 
            type="button" 
            onClick={handleDemoLogin}
            className="auth-button demo-button"
            style={{ 
              backgroundColor: '#6c757d', 
              marginTop: '10px',
              width: '100%'
            }}
          >
            데모 계정으로 로그인
          </button>

          <div className="auth-links">
            <a href="/signup" className="auth-link">회원가입</a>
            <span className="auth-divider">|</span>
            <a href="/forgot-password" className="auth-link">비밀번호 찾기</a>
          </div>

          <div className="auth-demo-info">
            <p><strong>데모 계정 정보:</strong></p>
            <p>이메일: demo@example.com</p>
            <p>비밀번호: demo1234</p>
          </div>
        </form>
      </div>
    </div>
  );
}