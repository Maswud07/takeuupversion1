export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'student' | 'admin';
  plan: 'free' | 'premium' | 'all-in-one';
  streak: number;
  points: number;
  studentClass?: string;
  selectedSubjects?: string[];
}

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: { questionId: string; selectedOptionId: string; isCorrect: boolean }[];
  isFinished: boolean;
  timeLeft: number;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  trend?: 'up' | 'down' | 'same';
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content?: string;
  date?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
  subjects: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}