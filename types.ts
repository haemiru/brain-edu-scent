
export type AgeGroup = 'INFANT' | 'TODDLER' | 'CHILD';

export interface Question {
  id: number;
  text: string;
}

export interface Category {
  id: string;
  title: string;
  questions: Question[];
}

export interface Questionnaire {
  INFANT: Category[];
  TODDLER: Category[];
  CHILD: Category[];
}

export interface SurveyResponse {
  [categoryId: string]: {
    [questionId: number]: number;
  };
}

export interface AssessmentResult {
  categoryId: string;
  categoryTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface ChildInfo {
  name: string;
  ageGroup: AgeGroup;
  ageInMonths?: number;
  gender: 'M' | 'F' | 'OTHER';
}
