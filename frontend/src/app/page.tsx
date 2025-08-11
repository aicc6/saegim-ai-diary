"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 항상 로그인 페이지로 리다이렉션
    router.push('/login');
  }, [router]);

  return null;
}