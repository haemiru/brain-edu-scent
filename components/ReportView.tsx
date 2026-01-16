
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateProfessionalReport } from '../services/geminiService';
import { AssessmentResult, ChildInfo } from '../types';

interface Props {
  childInfo: ChildInfo;
  results: AssessmentResult[];
}

const ReportView: React.FC<Props> = ({ childInfo, results }) => {
  const [reportText, setReportText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const text = await generateProfessionalReport(childInfo, results);
        setReportText(text);
      } catch (err) {
        setError("AI 리포트를 생성하는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [childInfo, results]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
        <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium">AI가 {childInfo.name} 아동의 데이터를 정밀 분석하여 보고서를 작성 중입니다...</p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full bg-indigo-300 animate-bounce`} style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-8 rounded-2xl border border-red-200 text-center">
        <p className="font-bold mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold"
        >
          재시도
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-900 text-white p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-black mb-1">감각 분석 리포트</h2>
            <p className="text-slate-400 text-sm">발행일: {new Date().toLocaleDateString('ko-KR')}</p>
          </div>
          <div className="bg-indigo-600/30 border border-indigo-400/30 px-4 py-2 rounded-xl">
            <span className="text-xs font-bold text-indigo-200 block">대상 아동</span>
            <span className="font-bold text-lg">{childInfo.name}</span>
          </div>
        </div>
        <div className="flex gap-4 text-sm text-slate-300">
          <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">그룹: {childInfo.ageGroup}</span>
          <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">성별: {childInfo.gender === 'M' ? '남아' : '여아'}</span>
        </div>
      </div>
      
      <div className="p-8 prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-strong:text-indigo-600 prose-li:text-slate-600">
        <ReactMarkdown>{reportText}</ReactMarkdown>
      </div>

      <div className="p-8 border-t border-slate-100 flex justify-end gap-3 no-print">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          PDF로 저장 / 인쇄
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .rounded-2xl { border-radius: 0 !important; border: none !important; box-shadow: none !important; }
          .bg-slate-900 { background-color: #0f172a !important; -webkit-print-color-adjust: exact; }
          .text-white { color: white !important; }
        }
      `}</style>
    </div>
  );
};

export default ReportView;
