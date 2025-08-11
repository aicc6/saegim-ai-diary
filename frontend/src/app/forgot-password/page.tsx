"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    // 실제 구현에서는 이메일 전송 로직이 들어갑니다
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>새김 AI 다이어리</h1>
            <p>비밀번호 재설정</p>
          </div>

          <div className="auth-success">
            <div className="success-icon">📧</div>
            <h2>이메일이 전송되었습니다</h2>
            <p>
              <strong>{email}</strong>로 비밀번호 재설정 링크를 보내드렸습니다.
            </p>
            <p>이메일을 확인하여 비밀번호를 재설정해주세요.</p>
          </div>

          <div className="auth-links">
            <a href="/login" className="auth-link">로그인으로 돌아가기</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>새김 AI 다이어리</h1>
          <p>비밀번호를 잊으셨나요?</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="가입한 이메일을 입력해주세요"
              required
              className="form-input"
            />
            <p className="form-help">가입한 이메일 주소로 비밀번호 재설정 링크를 보내드립니다.</p>
          </div>

          <button type="submit" className="auth-button">
            재설정 이메일 보내기
          </button>

          <div className="auth-links">
            <a href="/login" className="auth-link">로그인으로 돌아가기</a>
          </div>
        </form>
      </div>
    </div>
  );
}
