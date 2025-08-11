export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const STORAGE_KEY = 'auth_user';

// 초기 사용자 데이터
const DEMO_USER: User = {
  id: "1",
  email: "demo@example.com",
  password: "demo1234",
  name: "데모 사용자"
};

// 현재 로그인된 사용자 가져오기
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

// 회원가입
export function signUp(email: string, password: string, name: string): { success: boolean; error?: string } {
  // 이메일 중복 체크
  const currentUser = getCurrentUser();
  if (currentUser?.email === email) {
    return { success: false, error: '이미 사용 중인 이메일입니다.' };
  }

  // 새 사용자 생성
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    name
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return { success: true };
}

// 로그인
export function signIn(email: string, password: string): { success: boolean; error?: string } {
  // 데모 계정 확인
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER));
    return { success: true };
  }

  // 저장된 사용자 확인
  const storedUser = getCurrentUser();
  if (storedUser?.email === email && storedUser?.password === password) {
    return { success: true };
  }
  
  return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
}

// 로그아웃
export function signOut(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// 개발용: 모든 인증 데이터 초기화
export function clearAuthData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// 프로필 업데이트
export function updateProfile(updates: Partial<User>): { success: boolean; error?: string } {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: '로그인이 필요합니다.' };
  }

  // 이메일 중복 체크
  if (updates.email && updates.email !== currentUser.email) {
    const storedUser = getCurrentUser();
    if (storedUser?.email === updates.email) {
      return { success: false, error: '이미 사용 중인 이메일입니다.' };
    }
  }

  const updatedUser = { ...currentUser, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  return { success: true };
}

// 비밀번호 변경
export function changePassword(currentPassword: string, newPassword: string): { success: boolean; error?: string } {
  const user = getCurrentUser();
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' };
  }

  if (user.password !== currentPassword) {
    return { success: false, error: '현재 비밀번호가 일치하지 않습니다.' };
  }

  user.password = newPassword;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true };
}