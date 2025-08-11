"use client";

import { useState } from 'react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // 목업: 2초 후 완료
    setTimeout(() => {
      setIsSubmitted(true);
      setMessage('비밀번호 재설정 이메일이 전송되었습니다.');
      setMessageType('success');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-header">
        <div className="reset-password-icon">
          <span className="icon">🔑</span>
        </div>
        <h1 className="reset-password-title">비밀번호 찾기</h1>
        <p className="reset-password-subtitle">
          가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
        </p>
      </div>

      {message && (
        <div className={`reset-password-alert ${messageType === 'success' ? 'alert-success' : 'alert-error'}`}>
          <div className="alert-icon">
            {messageType === 'success' ? '✅' : '❌'}
          </div>
          <div className="alert-content">
            {message}
          </div>
        </div>
      )}

      {!isSubmitted ? (
        <div className="reset-password-card">
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                이메일 주소
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
              <p className="form-help">
                가입 시 사용한 이메일 주소를 정확히 입력해주세요.
              </p>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary reset-button"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    전송 중...
                  </>
                ) : (
                  '재설정 이메일 보내기'
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="reset-password-success">
          <div className="success-icon">
            <span className="icon">📧</span>
          </div>
          <h2 className="success-title">이메일이 전송되었습니다!</h2>
          <p className="success-description">
            입력하신 이메일 주소로 비밀번호 재설정 링크를 보내드렸습니다.
            이메일을 확인하여 비밀번호를 재설정해주세요.
          </p>
          <div className="success-steps">
            <h3>다음 단계:</h3>
            <ol>
              <li>이메일함을 확인해주세요</li>
              <li>비밀번호 재설정 링크를 클릭해주세요</li>
              <li>새로운 비밀번호를 설정해주세요</li>
            </ol>
          </div>
          <div className="success-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
                setMessage('');
              }}
            >
              다시 시도하기
            </button>
          </div>
        </div>
      )}

      <div className="reset-password-help">
        <h3>도움이 필요하신가요?</h3>
        <div className="help-items">
          <div className="help-item">
            <span className="help-icon">📧</span>
            <div className="help-content">
              <h4>이메일을 받지 못하셨나요?</h4>
              <p>스팸함을 확인하거나 이메일 주소를 다시 확인해주세요.</p>
            </div>
          </div>
          <div className="help-item">
            <span className="help-icon">🔒</span>
            <div className="help-content">
              <h4>계정에 문제가 있으신가요?</h4>
              <p>고객센터로 문의하시면 도움을 드리겠습니다.</p>
            </div>
          </div>
        </div>
        <a href="/support" className="btn btn-secondary help-button">
          고객센터 문의
        </a>
      </div>
    </div>
  );
}
