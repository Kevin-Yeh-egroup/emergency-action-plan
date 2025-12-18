"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface QuickAssessmentProps {
  onComplete: (score: number, data: any) => void
  onBack: () => void
}

const assessmentCategories = [
  {
    id: "economic",
    title: "A. 經濟資源",
    maxScore: 25,
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
    maxScore: 15,
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
]

export default function QuickAssessment({ onComplete, onBack }: QuickAssessmentProps) {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const category = assessmentCategories[currentCategory]
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

  const handleNext = () => {
    if (currentCategory < assessmentCategories.length - 1) {
      setCurrentCategory(currentCategory + 1)
    } else {
      const finalScore = calculateScore()
      onComplete(finalScore, answers)
    }
  }

  const handleBack = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1)
    } else {
      onBack()
    }
  }

  const allCategoryQuestionsAnswered = category.questions.every((q) => answers[q.id])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">快速快篩</h1>
          <p className="text-muted-foreground">這不是審核，也不是資格判定。只是幫你把狀況變清楚</p>

          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>總進度</span>
                <span>
                  {answeredQuestions} / {totalQuestions}
                </span>
              </div>
              <Progress value={progress} />
            </div>
          </Card>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{category.title}</h2>
            <p className="text-sm text-muted-foreground">
              卡片 {currentCategory + 1}/{assessmentCategories.length}
            </p>
          </div>

          <div className="space-y-6">
            {category.questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <Label className="text-base font-medium">{question.label}</Label>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                >
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                        <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
            返回
          </Button>
          <Button onClick={handleNext} className="flex-1" disabled={!allCategoryQuestionsAnswered}>
            {currentCategory < assessmentCategories.length - 1 ? "下一步" : "完成快篩"}
          </Button>
        </div>
      </div>
    </div>
  )
}
