"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"
import { formatNumber } from "@/lib/format-number"
import { identifyPriorityInterventions } from "@/lib/assessment-analyzer"

interface AssessmentResultProps {
  score: number
  data: any
  userInput?: { text: string; files: File[] }
  onContinue: () => void
  onAIChat: () => void
}

export default function AssessmentResult({ score, data, userInput = { text: "", files: [] }, onContinue, onAIChat }: AssessmentResultProps) {
  const getLevel = () => {
    // 財務韌性良好（75-100分）
    if (score >= 75 && score <= 100) {
      return { 
        level: "財務韌性良好", 
        color: "text-green-600", 
        bgColor: "bg-green-50 dark:bg-green-950/20",
        borderColor: "border-green-200 dark:border-green-800",
        icon: CheckCircle2, 
        signal: "🟢",
        signalColor: "text-green-600"
      }
    }
    // 接近韌性（60-74分）
    if (score >= 60 && score <= 74) {
      return { 
        level: "接近韌性", 
        color: "text-yellow-600", 
        bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        icon: AlertTriangle, 
        signal: "🟡",
        signalColor: "text-yellow-600"
      }
    }
    // 財務脆弱（40-59分）
    if (score >= 40 && score <= 59) {
      return { 
        level: "財務脆弱", 
        color: "text-orange-600", 
        bgColor: "bg-orange-50 dark:bg-orange-950/20",
        borderColor: "border-orange-200 dark:border-orange-800",
        icon: AlertTriangle, 
        signal: "🟠",
        signalColor: "text-orange-600"
      }
    }
    // 極度脆弱（0-39分）
    return { 
      level: "極度脆弱", 
      color: "text-red-600", 
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-200 dark:border-red-800",
      icon: AlertCircle, 
      signal: "🔴",
      signalColor: "text-red-600"
    }
  }

  const { level, color, bgColor, borderColor, icon: Icon, signal, signalColor } = getLevel()

  const getRecommendation = () => {
    // 財務韌性良好（75-100分）：恭喜、正面鼓勵
    if (score >= 75) return "恭喜！您的財務韌性良好，可以自主處理財務事務"
    // 接近韌性（60-74分）：需要一些協助
    if (score >= 60) return "建議多學習財務知識、進行更深入的評估後再行動，或諮詢專業人員獲得更多協助"
    // 財務脆弱（40-59分）：需要更多協助
    if (score >= 40) return "建議尋求專業人員協助討論財務狀況，制定改善計畫"
    // 極度脆弱（0-39分）：強烈建議專人介入
    return "強烈建議立即尋求專業人員介入協助，共同討論並處理財務問題"
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">初判結果</h1>
          <p className="text-muted-foreground">根據你的回答，我們整理出以下評估</p>
        </div>

        <Card className={`p-8 space-y-6 ${bgColor} border-2 ${borderColor}`}>
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className={`text-8xl ${signalColor} drop-shadow-lg`}>{signal}</div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">韌性等級判定</p>
                <p className={`text-3xl font-bold ${color} flex items-center justify-center gap-2`}>
                  <Icon className="h-8 w-8" />
                  {level}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-2">總分</p>
              <p className="text-5xl font-bold">
                {formatNumber(score)} <span className="text-2xl text-muted-foreground">/ {formatNumber(100)}</span>
              </p>
            </div>
            <div className="pt-2">
              <p className="text-lg text-muted-foreground">{getRecommendation()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">為什麼會是這個判斷？</h2>
          <ul className="space-y-2">
            {score < 60 && (
              <>
                <li className="flex gap-2 text-sm">
                  <span className="text-red-600">▼</span>
                  <span>經濟資源不足：收入／存款難以支撐基本生活</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-red-600">▼</span>
                  <span>應急能力偏低：緊急支出時缺乏低成本因應方式</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-red-600">▼</span>
                  <span>壓力偏高：已影響判斷與行動力，需要陪走</span>
                </li>
              </>
            )}
            {score >= 60 && score < 75 && (
              <>
                <li className="flex gap-2 text-sm">
                  <span className="text-orange-600">▼</span>
                  <span>部分資源需要強化：建議補充資料以獲得更多協助</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-green-600">▲</span>
                  <span>基本應急能力尚可：可以開始準備申請流程</span>
                </li>
              </>
            )}
            {score >= 75 && (
              <>
                <li className="flex gap-2 text-sm">
                  <span className="text-green-600">▲</span>
                  <span>財務狀況穩健：具備良好的應急能力</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-green-600">▲</span>
                  <span>可以自主處理：建議持續維持良好財務習慣</span>
                </li>
              </>
            )}
          </ul>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">優先介入面向識別</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(() => {
              const allInterventions = ["緊急經濟援助", "債務管理", "儲蓄培養", "金融教育", "就業支持", "金融服務連結"]
              const priorityInterventions = identifyPriorityInterventions(data, userInput)
              
              return allInterventions.map((item) => {
                const isPriority = priorityInterventions.includes(item)
                return (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      checked={isPriority} 
                      readOnly
                      className="rounded" 
                    />
                    <span className={isPriority ? "font-medium text-foreground" : "text-muted-foreground"}>
                      {item}
                    </span>
                  </div>
                )
              })
            })()}
          </div>
          {(() => {
            const priorityInterventions = identifyPriorityInterventions(data, userInput)
            if (priorityInterventions.length > 0) {
              return (
                <p className="text-sm text-muted-foreground mt-4">
                  根據您的回答，我們識別出 <span className="font-medium text-foreground">{priorityInterventions.length}</span> 個優先介入面向
                </p>
              )
            }
            return null
          })()}
        </Card>

        <Card className="p-6 bg-muted text-center space-y-4">
          <p className="text-lg font-medium">如果你希望有人陪你把細節釐清</p>
          <Button onClick={onAIChat} variant="outline" size="lg">
            問問 AI
          </Button>
        </Card>

        <Button onClick={onContinue} size="lg" className="w-full">
          查看下一步行動
        </Button>
      </div>
    </div>
  )
}
