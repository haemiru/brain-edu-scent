
import React, { useState } from 'react';
import { ChildInfo, AgeGroup } from '../types';

interface Props {
  onSubmit: (info: ChildInfo) => void;
}

const ChildInfoForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ChildInfo>({
    name: '',
    ageGroup: 'CHILD',
    gender: 'M'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">아이 정보 입력</h2>
        <p className="text-slate-500">정확한 분석을 위해 아이의 기본 정보를 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">이름 (또는 별명)</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="아이 이름을 입력하세요"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">연령대 선택</label>
          <div className="grid grid-cols-3 gap-3">
            {(['INFANT', 'TODDLER', 'CHILD'] as AgeGroup[]).map(group => (
              <button
                key={group}
                type="button"
                onClick={() => setFormData({ ...formData, ageGroup: group })}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                  formData.ageGroup === group
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {group === 'INFANT' ? '영아(0-12m)' : group === 'TODDLER' ? '유아(1-3y)' : '아동(4y+)'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">성별</label>
          <div className="flex gap-4">
            {['M', 'F'].map(gender => (
              <label key={gender} className="flex-1 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  className="hidden"
                  checked={formData.gender === gender}
                  onChange={() => setFormData({ ...formData, gender: gender as 'M' | 'F' })}
                />
                <div className={`py-3 text-center rounded-xl border font-semibold transition-all ${
                  formData.gender === gender
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-500 group-hover:bg-slate-50'
                }`}>
                  {gender === 'M' ? '남아' : '여아'}
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 mt-4"
        >
          평가 시작하기
        </button>
      </form>
    </div>
  );
};

export default ChildInfoForm;
