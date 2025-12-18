/**
 * 評估分析工具
 * 根據快篩答案和使用者輸入，判斷優先介入面向
 */

interface AssessmentData {
  [questionId: string]: string
}

interface UserInputData {
  text: string
  files?: File[] | unknown[]
}

/**
 * 計算各類別的分數
 */
export function calculateCategoryScores(answers: AssessmentData) {
  const categories = {
    economic: 0,      // A. 經濟資源
    emergency: 0,    // B. 應急能力
    financial: 0,    // C. 金融包容性
    management: 0,   // D. 財務管理能力
    social: 0,       // E. 社會資本
    resilience: 0,   // F. 心理韌性
  }

  // A. 經濟資源 (25分)
  const economicQuestions = ["income", "stability", "savings", "debt", "assets"]
  economicQuestions.forEach((qId) => {
    const answer = answers[qId]
    if (answer) {
      const score = parseInt(answer) || 0
      categories.economic += score
    }
  })

  // B. 應急能力 (15分)
  const emergencyQuestions = ["funding", "channels", "insurance"]
  emergencyQuestions.forEach((qId) => {
    const answer = answers[qId]
    if (answer) {
      const score = parseInt(answer) || 0
      categories.emergency += score
    }
  })

  // C. 金融包容性 (15分)
  const financialQuestions = ["bank_account", "bank_service", "financial_access"]
  financialQuestions.forEach((qId) => {
    const answer = answers[qId]
    if (answer) {
      const score = parseInt(answer) || 0
      categories.financial += score
    }
  })

  // D. 財務管理能力 (20分)
  const managementQuestions = ["budget", "accounting", "saving_habit", "financial_knowledge"]
  managementQuestions.forEach((qId) => {
    const answer = answers[qId]
    if (answer) {
      const score = parseInt(answer) || 0
      categories.management += score
    }
  })

  // E. 社會資本 (15分)
  const socialQuestions = ["family_support", "community", "social_resources"]
  socialQuestions.forEach((qId) => {
    const answer = answers[qId]
    if (answer) {
      const score = parseInt(answer) || 0
      categories.social += score
    }
  })

  // F. 心理韌性 (10分)
  const resilienceQuestions = ["financial_stress", "future_confidence"]
  resilienceQuestions.forEach((qId) => {
    const answer = answers[qId]
    if (answer) {
      const score = parseInt(answer) || 0
      categories.resilience += score
    }
  })

  return categories
}

/**
 * 分析使用者輸入文字，提取關鍵字
 */
function analyzeUserInput(text: string): {
  keywords: string[]
  hasDebt: boolean
  hasUnemployment: boolean
  hasMedical: boolean
  hasDisaster: boolean
} {
  const lowerText = text.toLowerCase()
  
  const debtKeywords = ["債務", "貸款", "欠款", "還款", "卡債", "負債", "借錢"]
  const unemploymentKeywords = ["失業", "沒工作", "無業", "待業", "離職", "被解雇"]
  const medicalKeywords = ["醫療", "看病", "住院", "醫藥費", "治療", "手術", "健保"]
  const disasterKeywords = ["災害", "天災", "意外", "事故", "淹水", "火災", "地震"]
  
  return {
    keywords: [],
    hasDebt: debtKeywords.some((keyword) => lowerText.includes(keyword)),
    hasUnemployment: unemploymentKeywords.some((keyword) => lowerText.includes(keyword)),
    hasMedical: medicalKeywords.some((keyword) => lowerText.includes(keyword)),
    hasDisaster: disasterKeywords.some((keyword) => lowerText.includes(keyword)),
  }
}

/**
 * 判斷優先介入面向
 */
export function identifyPriorityInterventions(
  answers: AssessmentData | null | undefined,
  userInput: UserInputData | null | undefined
): string[] {
  // 處理空值情況
  if (!answers) {
    answers = {}
  }
  if (!userInput) {
    userInput = { text: "", files: [] }
  }
  
  const priorities: string[] = []
  const categoryScores = calculateCategoryScores(answers)
  const inputAnalysis = analyzeUserInput(userInput.text || "")

  // 計算各類別的百分比（相對於滿分）
  const categoryPercentages = {
    economic: (categoryScores.economic / 25) * 100,
    emergency: (categoryScores.emergency / 15) * 100,
    financial: (categoryScores.financial / 15) * 100,
    management: (categoryScores.management / 20) * 100,
    social: (categoryScores.social / 15) * 100,
    resilience: (categoryScores.resilience / 10) * 100,
  }

  // 1. 緊急經濟援助
  // 條件：經濟資源低 (<60%) 或 應急能力低 (<60%) 或 收入不穩定/無收入
  if (
    categoryPercentages.economic < 60 ||
    categoryPercentages.emergency < 60 ||
    answers.stability === "0" ||
    answers.stability === "1" ||
    answers.income === "0" ||
    answers.income === "1" ||
    answers.savings === "0"
  ) {
    priorities.push("緊急經濟援助")
  }

  // 2. 債務管理
  // 條件：債務狀況差 (警戒/危險) 或 使用者輸入提到債務
  if (
    answers.debt === "0" ||
    answers.debt === "1" ||
    inputAnalysis.hasDebt
  ) {
    priorities.push("債務管理")
  }

  // 3. 儲蓄培養
  // 條件：儲蓄狀況差 (<60%) 或 儲蓄習慣差
  if (
    answers.savings === "0" ||
    answers.savings === "1" ||
    answers.saving_habit === "0" ||
    categoryPercentages.management < 50
  ) {
    priorities.push("儲蓄培養")
  }

  // 4. 金融教育
  // 條件：金融知識不足 或 銀行服務使用不熟練
  if (
    answers.financial_knowledge === "0" ||
    answers.financial_knowledge === "3" ||
    answers.bank_service === "0" ||
    answers.bank_service === "1" ||
    categoryPercentages.financial < 60
  ) {
    priorities.push("金融教育")
  }

  // 5. 就業支持
  // 條件：收入不穩定/無收入 或 使用者輸入提到失業
  if (
    answers.stability === "0" ||
    answers.stability === "1" ||
    answers.income === "0" ||
    inputAnalysis.hasUnemployment
  ) {
    priorities.push("就業支持")
  }

  // 6. 金融服務連結
  // 條件：無銀行帳戶 或 金融服務可近性差
  if (
    answers.bank_account === "0" ||
    answers.financial_access === "0" ||
    categoryPercentages.financial < 50
  ) {
    priorities.push("金融服務連結")
  }

  // 如果沒有符合任何條件，至少顯示最緊急的
  if (priorities.length === 0) {
    if (categoryPercentages.economic < 70) {
      priorities.push("緊急經濟援助")
    } else if (categoryPercentages.management < 70) {
      priorities.push("儲蓄培養")
    } else {
      priorities.push("金融教育")
    }
  }

  return priorities
}



