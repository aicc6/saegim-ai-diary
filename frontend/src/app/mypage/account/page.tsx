"use client";

import { useState } from 'react';
import { getCurrentUser } from '@/lib/fakeAuth';

export default function AccountPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = getCurrentUser();

  const handleDeleteAccount = () => {
    setIsLoading(true);
    // 실제 기능은 구현하지 않음 (UI 목적)
    setTimeout(() => {
      setIsLoading(false);
      alert('계정 탈퇴 기능은 현재 개발 중입니다.');
    }, 1000);
  };

  return (
    <div className="mypage-container">
      <div className="account-header">
        <h1 className="account-title">계정 설정</h1>
        <p className="account-subtitle">계정 관련 고급 설정을 관리합니다.</p>
      </div>

      <div className="account-card">
        <div className="account-section">
          <h2 className="section-title">계정 정보</h2>
          <div className="account-info">
            <div className="info-item">
              <label>이름</label>
              <span>{user?.name}</span>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <label>가입일</label>
              <span>2024년 1월 1일</span>
            </div>
          </div>
        </div>

        <div className="account-section danger-zone">
          <h2 className="section-title danger-title">⚠️ 위험 구역</h2>
          <p className="danger-description">
            아래 작업은 되돌릴 수 없습니다. 신중하게 진행해주세요.
          </p>

          {!showDeleteConfirm ? (
            <div className="delete-account-section">
              <h3>계정 탈퇴</h3>
              <p>
                계정을 탈퇴하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
              </p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                계정 탈퇴하기
              </button>
            </div>
          ) : (
            <div className="delete-confirm-section">
              <h3>계정 탈퇴 확인</h3>
              <div className="warning-box">
                <h4>⚠️ 주의사항</h4>
                <ul>
                  <li>모든 다이어리 데이터가 영구적으로 삭제됩니다.</li>
                  <li>AI 분석 결과 및 리포트가 모두 삭제됩니다.</li>
                  <li>계정 정보 및 개인 설정이 완전히 제거됩니다.</li>
                  <li>이 작업은 되돌릴 수 없습니다.</li>
                </ul>
              </div>

              <div className="form-group">
                <label className="form-label">탈퇴 사유 (선택사항)</label>
                <select
                  className="form-select"
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                >
                  <option value="">사유를 선택해주세요</option>
                  <option value="not-using">사용하지 않음</option>
                  <option value="privacy">개인정보 보호</option>
                  <option value="service-quality">서비스 품질 불만</option>
                  <option value="duplicate-account">중복 계정</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    required
                  />
                  위 내용을 모두 확인했으며, 계정 탈퇴에 동의합니다.
                </label>
              </div>

              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                >
                  {isLoading ? '처리 중...' : '계정 탈퇴 확인'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="account-help">
        <h3>도움이 필요하신가요?</h3>
        <p>
          계정 관련 문의사항이 있으시면 고객센터로 연락해주세요.
        </p>
        <a href="/support" className="btn btn-outline">
          고객센터 문의
        </a>
      </div>
    </div>
  );
}
