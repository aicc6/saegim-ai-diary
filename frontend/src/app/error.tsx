"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-content">
        <h2>문제가 발생했습니다</h2>
        <p>죄송합니다. 오류가 발생했습니다.</p>
        <button
          className="btn btn-primary"
          onClick={() => reset()}
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
