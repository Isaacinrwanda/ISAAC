
export enum InterviewState {
  COVER_PAGE,
  SETUP,
  INTERVIEWING,
  FEEDBACK,
  ERROR,
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface FeedbackReport {
  overallAssessment: string;
  keyStrengths: string;
  areasForImprovement: string;
  score: number;
  scoreRationale: string;
}

export interface InterviewConfig {
  company: string;
  role: string;
}