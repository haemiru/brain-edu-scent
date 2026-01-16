
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import ChildInfoForm from './components/ChildInfoForm';
import SurveyForm from './components/SurveyForm';
import Dashboard from './components/Dashboard';
import ReportView from './components/ReportView';
import { ChildInfo, SurveyResponse, AssessmentResult } from './types';
import { QUESTIONNAIRE } from './constants';

enum Step {
  INFO,
  SURVEY,
  RESULT
}

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.INFO);
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);
  const [responses, setResponses] = useState<SurveyResponse>({});

  const currentQuestions = useMemo(() => {
    if (!childInfo) return [];
    return QUESTIONNAIRE[childInfo.ageGroup];
  }, [childInfo]);

  const assessmentResults = useMemo<AssessmentResult[]>(() => {
    if (!childInfo || !currentQuestions.length) return [];

    return currentQuestions.map(category => {
      const catResponses = responses[category.id] || {};
      // Fix: Explicitly cast Object.values to number[] to resolve 'unknown' type error in reduce
      const score = (Object.values(catResponses) as number[]).reduce((sum, val) => sum + val, 0);
      const maxScore = category.questions.length * 5;
      const percentage = Math.round((score / maxScore) * 100);

      return {
        categoryId: category.id,
        categoryTitle: category.title,
        score,
        maxScore,
        percentage
      };
    });
  }, [childInfo, currentQuestions, responses]);

  const handleInfoSubmit = (info: ChildInfo) => {
    setChildInfo(info);
    setStep(Step.SURVEY);
    window.scrollTo(0, 0);
  };

  const handleResponseChange = (categoryId: string, questionId: number, value: number) => {
    setResponses(prev => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] || {}),
        [questionId]: value
      }
    }));
  };

  const handleComplete = () => {
    setStep(Step.RESULT);
    window.scrollTo(0, 0);
  };

  const getTitle = () => {
    switch(step) {
      case Step.INFO: return "시작하기";
      case Step.SURVEY: return "설문 응답";
      case Step.RESULT: return "분석 결과";
      default: return "";
    }
  };

  return (
    <Layout title={getTitle()}>
      {step === Step.INFO && <ChildInfoForm onSubmit={handleInfoSubmit} />}
      
      {step === Step.SURVEY && (
        <SurveyForm
          categories={currentQuestions}
          responses={responses}
          onResponseChange={handleResponseChange}
          onComplete={handleComplete}
        />
      )}

      {step === Step.RESULT && childInfo && (
        <div className="space-y-12 animate-in fade-in duration-1000">
          <div className="text-center">
            <h2 className="text-3xl font-black text-slate-800 mb-2">분석이 완료되었습니다!</h2>
            <p className="text-slate-500">{childInfo.name} 아동의 감각 데이터 시각화 결과입니다.</p>
          </div>

          <Dashboard results={assessmentResults} />
          
          <div className="pt-8 border-t border-slate-200">
            <ReportView childInfo={childInfo} results={assessmentResults} />
          </div>

          <div className="flex justify-center pb-12">
            <button 
              onClick={() => {
                setStep(Step.INFO);
                setResponses({});
                setChildInfo(null);
                window.scrollTo(0, 0);
              }}
              className="px-8 py-3 text-slate-500 font-bold hover:text-indigo-600 transition-colors"
            >
              처음으로 돌아가기
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
