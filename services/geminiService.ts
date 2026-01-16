
import { GoogleGenAI } from "@google/genai";
import { AssessmentResult, ChildInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateProfessionalReport = async (
  childInfo: ChildInfo,
  results: AssessmentResult[]
): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  
  const resultsContext = results.map(r => 
    `- ${r.categoryTitle}: ${r.score}/${r.maxScore} (${r.percentage}%)`
  ).join("\n");

  const prompt = `
  다음은 ${childInfo.name}(성별: ${childInfo.gender}, 연령그룹: ${childInfo.ageGroup}) 아동의 감각 반응 및 수면 평가 결과 데이터입니다.
  이 데이터를 바탕으로 전문가 수준의 분석 보고서를 작성해주세요.
  
  데이터 요약:
  ${resultsContext}
  
  보고서 요구 사항 (반드시 마크다운 형식을 사용하세요):
  1. 제목은 # 를 사용하고 섹션은 ## 또는 ### 를 사용하여 구조화하세요.
  2. 전체적인 감각 프로파일 요약 및 총평 (따뜻하고 격려하는 톤으로 작성)
  3. 영역별 심층 분석 (해석 및 발달적 관점을 포함하여 불렛 포인트나 번호 매기기로 정리)
  4. 통합 분석 및 맞춤형 프로그램 제언 (가정에서 실천 가능한 구체적인 가이드라인 제시)
  5. 텍스트에 생동감을 주기 위해 적절한 강조와 구조를 사용하되, 원시 마크다운 기호가 그대로 노출되지 않도록 깔끔하게 작성하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "보고서를 생성할 수 없습니다. 다시 시도해주세요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("보고서 생성 중 오류가 발생했습니다.");
  }
};
