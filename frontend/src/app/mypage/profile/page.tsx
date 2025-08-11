"use client";

import { useState, useEffect } from 'react';
import { getCurrentUser, updateProfile } from '@/lib/fakeAuth';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const result = updateProfile(formData);
    
    if (result.success) {
      setMessage('프로필이 성공적으로 업데이트되었습니다.');
      setMessageType('success');
    } else {
      setMessage(result.error || '프로필 업데이트에 실패했습니다.');
      setMessageType('error');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="mypage-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-text">{formData.name[0]}</span>
        </div>
        <h1 className="profile-title">프로필 설정</h1>
      </div>

      {message && (
        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="profile-card">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <p className="form-help">다른 사용자에게 표시되는 이름입니다.</p>
          </div>

          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <p className="form-help">로그인 및 알림에 사용되는 이메일입니다.</p>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? '업데이트 중...' : '프로필 업데이트'}
            </button>
          </div>
        </form>
      </div>

      <div className="profile-sections">
        <div className="profile-section-card">
          <h2>보안 설정</h2>
          <p>계정 보안을 위한 설정을 관리합니다.</p>
          <div className="security-buttons">
            <a href="/mypage/password" className="btn btn-secondary">
              비밀번호 변경
            </a>
            <a href="/mypage/reset-password" className="btn btn-secondary">
              비밀번호 찾기
            </a>
          </div>
        </div>

        <div className="profile-section-card">
          <h2>계정 관리</h2>
          <p>계정 삭제 등 고급 설정을 관리합니다.</p>
          <a href="/mypage/account" className="btn btn-outline">
            계정 설정
          </a>
        </div>
      </div>
    </div>
  );
}