"use client"

import { useState } from "react"
import Header from "@/components/emergency/header"
import QuickAssessment from "@/components/emergency/quick-assessment"
import AIChat from "@/components/emergency/ai-chat"
import AssessmentResult from "@/components/emergency/assessment-result"
import ActionGuidance from "@/components/emergency/action-guidance"
import TransitionScreen from "@/components/emergency/transition-screen"

export type FlowStep = "assessment" | "ai-chat" | "result" | "action"

export default function EmergencyAssistancePage() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("assessment")
  const [showTransition, setShowTransition] = useState(false)
  const [transitionMessage, setTransitionMessage] = useState("")
  const [userInputData, setUserInputData] = useState<{ text: string; files: File[] }>({ text: "", files: [] })
  const [assessmentScore, setAssessmentScore] = useState(0)
  const [assessmentData, setAssessmentData] = useState<any>({})

  const goToStep = (step: FlowStep, message?: string) => {
    if (message) {
      setTransitionMessage(message)
      setShowTransition(true)
      setTimeout(() => {
        setShowTransition(false)
        setCurrentStep(step)
      }, 3000)
    } else {
      setCurrentStep(step)
    }
  }

  const handleAssessmentComplete = (score: number, data: any) => {
    setAssessmentScore(score)
    setAssessmentData(data)
    goToStep("result", "我們正在把你的答案整理成「可行的下一步」\n你不用自己判斷")
  }

  if (showTransition) {
    return <TransitionScreen message={transitionMessage} />
  }

  return (
    <main className="min-h-screen bg-background">
      <Header currentStep={currentStep} onStepChange={setCurrentStep} />

      {currentStep === "assessment" && (
        <QuickAssessment onComplete={handleAssessmentComplete} onBack={() => {}} />
      )}

      {currentStep === "ai-chat" && (
        <AIChat
          onComplete={() => goToStep("result", "你已經做得很好了\n接下來只需要選一個下一步")}
          onBack={() => setCurrentStep("assessment")}
          onBackToResult={() => setCurrentStep("result")}
        />
      )}

      {currentStep === "result" && (
        <AssessmentResult
          score={assessmentScore}
          data={assessmentData}
          userInput={userInputData}
          onContinue={() => setCurrentStep("action")}
          onAIChat={() => setCurrentStep("ai-chat")}
        />
      )}

      {currentStep === "action" && (
        <ActionGuidance onBack={() => setCurrentStep("result")} onRestart={() => setCurrentStep("assessment")} />
      )}
    </main>
  )
}
