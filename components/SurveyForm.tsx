
import React from 'react';
import { Category, SurveyResponse } from '../types';

interface Props {
  categories: Category[];
  responses: SurveyResponse;
  onResponseChange: (categoryId: string, questionId: number, value: number) => void;
  onComplete: () => void;
}

const LIKERT_OPTIONS = [
  { value: 1, label: '전혀 그렇지 않다' },
  { value: 2, label: '거의 그렇지 않다' },
  { value: 3, label: '보통이다' },
  { value: 4, label: '자주 그렇다' },
  { value: 5, label: '매우 그렇다' }
];

const SurveyForm: React.FC<Props> = ({ categories, responses, onResponseChange, onComplete }) => {
  const isCategoryComplete = (cat: Category) => {
    return cat.questions.every(q => responses[cat.id]?.[q.id]);
  };

  const isAllComplete = categories.every(isCategoryComplete);

  return (
    <div className="space-y-12">
      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
        <h3 className="font-bold text-indigo-900 mb-2">평가 가이드</h3>
        <p className="text-sm text-indigo-700 leading-relaxed">
          아이의 일상적인 행동을 관찰하신 내용을 바탕으로 5점 척도로 선택해 주세요. 
          질문을 꼼꼼히 읽고 가장 적절한 답변을 체크해 주시기 바랍니다.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-800">{category.title}</h3>
            {isCategoryComplete(category) && (
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">완료</span>
            )}
          </div>
          <div className="divide-y divide-slate-100">
            {category.questions.map((q) => (
              <div key={q.id} className="p-6">
                <p className="text-slate-700 font-medium mb-4 leading-snug">
                  <span className="text-indigo-500 mr-2 font-bold">{q.id}.</span>
                  {q.text}
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {LIKERT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onResponseChange(category.id, q.id, opt.value)}
                      className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all border ${
                        responses[category.id]?.[q.id] === opt.value
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-lg font-bold">{opt.value}</span>
                      <span className="text-[10px] text-center leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-6 flex justify-center">
        <button
          disabled={!isAllComplete}
          onClick={onComplete}
          className={`px-12 py-4 rounded-2xl font-bold shadow-xl transition-all ${
            isAllComplete
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 scale-105 active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isAllComplete ? '결과 확인하기' : '모든 문항을 작성해주세요'}
        </button>
      </div>
    </div>
  );
};

export default SurveyForm;
