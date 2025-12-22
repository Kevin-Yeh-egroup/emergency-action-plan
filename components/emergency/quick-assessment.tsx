"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { formatNumber, formatCurrencyRange } from "@/lib/format-number"

interface QuickAssessmentProps {
  onComplete: (score: number, data: any) => void
  onBack: () => void
}

const assessmentCategories = [
  {
    id: "economic",
    title: "A. 經濟資源",
    questions: [
      {
        id: "income",
        label: "月收入",
        options: [
          { value: "5", label: ">NT$50,000", score: 5 },
          { value: "4", label: "NT$30,000-50,000", score: 4 },
          { value: "3", label: "NT$20,000-30,000", score: 3 },
          { value: "2", label: "NT$10,000-20,000", score: 2 },
          { value: "1", label: "<NT$10,000", score: 1 },
        ],
      },
      {
        id: "stability",
        label: "收入穩定性",
        options: [
          { value: "5", label: "穩定月薪", score: 5 },
          { value: "3", label: "不穩定但固定工作", score: 3 },
          { value: "1", label: "臨時工作", score: 1 },
          { value: "0", label: "無收入", score: 0 },
        ],
      },
      {
        id: "savings",
        label: "儲蓄狀況",
        options: [
          { value: "5", label: "≥3個月生活費", score: 5 },
          { value: "3", label: "1-3個月", score: 3 },
          { value: "1", label: "<1個月", score: 1 },
          { value: "0", label: "無", score: 0 },
        ],
      },
      {
        id: "debt",
        label: "債務狀況",
        options: [
          { value: "5", label: "無債務", score: 5 },
          { value: "3", label: "健康債務", score: 3 },
          { value: "1", label: "警戒債務", score: 1 },
          { value: "0", label: "危險債務", score: 0 },
        ],
      },
      {
        id: "assets",
        label: "其他資產",
        options: [
          { value: "5", label: "有多項資產", score: 5 },
          { value: "3", label: "有部分資產", score: 3 },
          { value: "1", label: "僅有基本資產", score: 1 },
          { value: "0", label: "無", score: 0 },
        ],
      },
    ],
  },
  {
    id: "emergency",
    title: "B. 應急能力",
    questions: [
      {
        id: "funding",
        label: "應急籌款能力",
        options: [
          { value: "5", label: "容易", score: 5 },
          { value: "3", label: "可以但有困難", score: 3 },
          { value: "1", label: "很困難", score: 1 },
          { value: "0", label: "不可能", score: 0 },
        ],
      },
      {
        id: "channels",
        label: "籌款管道",
        options: [
          { value: "5", label: "儲蓄", score: 5 },
          { value: "3", label: "親友協助", score: 3 },
          { value: "2", label: "銀行貸款", score: 2 },
          { value: "0", label: "其他高成本管道", score: 0 },
        ],
      },
      {
        id: "insurance",
        label: "保險覆蓋",
        options: [
          { value: "5", label: "有完整保障", score: 5 },
          { value: "3", label: "有基本保障", score: 3 },
          { value: "1", label: "僅健保", score: 1 },
          { value: "0", label: "無", score: 0 },
        ],
      },
    ],
  },
  {
    id: "financial",
    title: "C. 金融包容性",
    questions: [
      {
        id: "bank_account",
        label: "銀行帳戶",
        options: [
          { value: "5", label: "有", score: 5 },
          { value: "0", label: "無", score: 0 },
        ],
      },
      {
        id: "bank_service",
        label: "銀行服務使用",
        options: [
          { value: "5", label: "熟練", score: 5 },
          { value: "3", label: "基本會用", score: 3 },
          { value: "1", label: "不太會用", score: 1 },
          { value: "0", label: "從未用過", score: 0 },
        ],
      },
      {
        id: "financial_access",
        label: "金融服務可近性",
        options: [
          { value: "5", label: "容易獲得", score: 5 },
          { value: "3", label: "普通", score: 3 },
          { value: "0", label: "困難", score: 0 },
        ],
      },
    ],
  },
  {
    id: "management",
    title: "D. 財務管理能力",
    questions: [
      {
        id: "budget",
        label: "預算規劃",
        options: [
          { value: "5", label: "有", score: 5 },
          { value: "3", label: "偶爾", score: 3 },
          { value: "0", label: "無", score: 0 },
        ],
      },
      {
        id: "accounting",
        label: "記帳習慣",
        options: [
          { value: "5", label: "有", score: 5 },
          { value: "3", label: "偶爾", score: 3 },
          { value: "0", label: "無", score: 0 },
        ],
      },
      {
        id: "saving_habit",
        label: "儲蓄習慣",
        options: [
          { value: "5", label: "定期", score: 5 },
          { value: "3", label: "偶爾", score: 3 },
          { value: "0", label: "無", score: 0 },
        ],
      },
      {
        id: "financial_knowledge",
        label: "金融知識",
        options: [
          { value: "5", label: "良好", score: 5 },
          { value: "3", label: "普通", score: 3 },
          { value: "0", label: "不足", score: 0 },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "E. 社會資本",
    questions: [
      {
        id: "family_support",
        label: "親友支持",
        options: [
          { value: "5", label: "多", score: 5 },
          { value: "3", label: "一些", score: 3 },
          { value: "1", label: "很少", score: 1 },
          { value: "0", label: "無", score: 0 },
        ],
      },
      {
        id: "community",
        label: "社區連結",
        options: [
          { value: "5", label: "強", score: 5 },
          { value: "3", label: "中等", score: 3 },
          { value: "1", label: "弱", score: 1 },
          { value: "0", label: "無", score: 0 },
        ],
      },
      {
        id: "social_resources",
        label: "社會資源了解",
        options: [
          { value: "5", label: "熟悉", score: 5 },
          { value: "3", label: "普通", score: 3 },
          { value: "0", label: "不熟", score: 0 },
        ],
      },
    ],
  },
  {
    id: "resilience",
    title: "F. 心理韌性",
    questions: [
      {
        id: "financial_stress",
        label: "財務壓力感",
        options: [
          { value: "5", label: "低", score: 5 },
          { value: "3", label: "中", score: 3 },
          { value: "0", label: "高", score: 0 },
        ],
      },
      {
        id: "future_confidence",
        label: "未來信心",
        options: [
          { value: "5", label: "高", score: 5 },
          { value: "3", label: "中", score: 3 },
          { value: "0", label: "低", score: 0 },
        ],
      },
    ],
  },
]

export default function QuickAssessment({ onComplete, onBack }: QuickAssessmentProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const currentCategory = assessmentCategories[currentPage]
  
  // 計算總題數
  const totalQuestions = assessmentCategories.reduce((sum, cat) => sum + cat.questions.length, 0)
  
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const calculateScore = () => {
    let totalScore = 0
    assessmentCategories.forEach((cat) => {
      cat.questions.forEach((q) => {
        const answer = answers[q.id]
        if (answer) {
          const option = q.options.find((o) => o.value === answer)
          if (option) totalScore += option.score
        }
      })
    })
    return totalScore
  }

  // 檢查當前頁面所有問題是否已回答
  const allPageQuestionsAnswered = currentCategory.questions.every((q) => answers[q.id])

  // 找到第一個未回答的問題
  const findFirstUnansweredQuestion = () => {
    return currentCategory.questions.find((q) => !answers[q.id])
  }

  const scrollToUnansweredQuestion = () => {
    const firstUnanswered = findFirstUnansweredQuestion()
    if (firstUnanswered) {
      const questionElement = questionRefs.current[firstUnanswered.id]
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: "smooth", block: "center" })
        // 添加高亮效果
        questionElement.classList.add("ring-2", "ring-primary", "ring-offset-2")
        setTimeout(() => {
          questionElement.classList.remove("ring-2", "ring-primary", "ring-offset-2")
        }, 2000)
      }
    }
  }

  const handleNext = () => {
    if (!allPageQuestionsAnswered) {
      scrollToUnansweredQuestion()
      return
    }

    if (currentPage < assessmentCategories.length - 1) {
      setCurrentPage(currentPage + 1)
      // 滾動到頁面頂部
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const finalScore = calculateScore()
      onComplete(finalScore, answers)
    }
  }

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">家庭財務韌性快速評估</h1>
          <p className="text-muted-foreground">這不是審核，也不是資格判定。只是幫你把狀況變清楚</p>

          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>總進度</span>
                <span>
                  {formatNumber(answeredQuestions)} / {formatNumber(totalQuestions)}
                </span>
              </div>
              <Progress value={progress} />
            </div>
          </Card>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{currentCategory.title}</h2>
            <p className="text-sm text-muted-foreground">
              第 {formatNumber(currentPage + 1)} 頁，共 {formatNumber(assessmentCategories.length)} 頁
            </p>
          </div>

          <div className="space-y-6">
            {currentCategory.questions.map((question) => (
              <div
                key={question.id}
                ref={(el) => {
                  questionRefs.current[question.id] = el
                }}
                className="space-y-3 transition-all duration-300 rounded-lg p-2"
              >
                <Label className="text-base font-medium">{question.label}</Label>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                >
                  <div className="space-y-2">
                    {question.options.map((option) => {
                      // 格式化包含金額的標籤，確保有千分號
                      const formattedLabel = option.label.includes("NT$") 
                        ? formatCurrencyRange(option.label.replace(/,/g, ""))
                        : option.label
                      
                      return (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                            {formattedLabel}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-4">
          {currentPage > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
              返回
            </Button>
          )}
          <Button onClick={handleNext} className={currentPage > 0 ? "flex-1" : "flex-1"}>
            {currentPage < assessmentCategories.length - 1 ? "下一步" : "完成評估"}
          </Button>
        </div>
      </div>
    </div>
  )
}
