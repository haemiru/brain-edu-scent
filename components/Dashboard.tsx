
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { AssessmentResult } from '../types';

interface Props {
  results: AssessmentResult[];
}

const Dashboard: React.FC<Props> = ({ results }) => {
  const radarData = results.map(r => ({
    subject: r.categoryTitle,
    value: r.percentage,
    fullMark: 100,
  }));

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Radar Chart Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 text-center">종합 감각 프로파일 요약</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="감각 점수"
                  dataKey="value"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 text-center">영역별 점수 분포 (%)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={radarData} layout="vertical" margin={{ left: 40, right: 30 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="subject" type="category" tick={{ fill: '#64748B', fontSize: 11 }} width={80} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-slate-200 p-2 rounded shadow-sm text-xs font-bold">
                          {payload[0].value}%
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {radarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detail Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((r, idx) => (
          <div key={r.categoryId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-500">{r.categoryTitle}</span>
                <span className="text-xs font-bold text-slate-400">{r.score} / {r.maxScore}</span>
              </div>
              <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute top-0 left-0 h-full transition-all duration-1000"
                  style={{ width: `${r.percentage}%`, backgroundColor: COLORS[idx % COLORS.length] }}
                />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-800">{r.percentage}%</span>
              <span className="text-xs font-bold text-slate-400">수준</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
