"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/fakeAuth';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = signUp(formData.email, formData.password, formData.name);
    if (result.success) {
      router.push('/main');
    } else {
      setError(result.error || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>새김 AI 다이어리</h1>
          <p>회원가입하고 특별한 하루를 기록하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="홍길동"
              required
              className="form-input"
            />
          </div>

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
              placeholder="8자 이상 입력해주세요"
              required
              className="form-input"
            />
            <p className="form-help">영문, 숫자, 특수문자 조합 8자 이상</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="비밀번호를 다시 입력해주세요"
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="auth-button">
            회원가입
          </button>

          <div className="auth-links">
            <span>이미 계정이 있으신가요?</span>
            <a href="/login" className="auth-link">로그인</a>
          </div>
        </form>
      </div>
    </div>
  );
}