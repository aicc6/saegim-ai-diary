"use client";

import { useState } from 'react';
import { updateProfile } from '@/lib/fakeAuth';

export default function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage('새 비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    // 실제로는 여기서 비밀번호 변경 API를 호출합니다
    const result = updateProfile({ password: newPassword });
    
    if (result.success) {
      setMessage('비밀번호가 성공적으로 변경되었습니다.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setMessage(result.error || '비밀번호 변경에 실패했습니다.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="page-content">
      <h1>비밀번호 변경</h1>
      
      {message && (
        <div className={`alert ${message.includes('성공') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="currentPassword" className="form-label">
            현재 비밀번호
          </label>
          <input
            type="password"
            id="currentPassword"
            className="form-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">
            새 비밀번호
          </label>
          <input
            type="password"
            id="newPassword"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            새 비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? '변경 중...' : '비밀번호 변경'}
        </button>
      </form>
    </div>
  );
}
