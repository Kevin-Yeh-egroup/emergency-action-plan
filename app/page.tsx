"use client"

import { useState } from "react"
import Header from "@/components/emergency/header"
import ScenarioSelection from "@/components/emergency/scenario-selection"
import UserInput from "@/components/emergency/user-input"
import QuickAssessment from "@/components/emergency/quick-assessment"
import AIChat from "@/components/emergency/ai-chat"
import AssessmentResult from "@/components/emergency/assessment-result"
import ActionGuidance from "@/components/emergency/action-guidance"
import TransitionScreen from "@/components/emergency/transition-screen"

export type FlowStep = "scenario" | "input" | "assessment" | "ai-chat" | "result" | "action"

export default function EmergencyAssistancePage() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("scenario")
  const [showTransition, setShowTransition] = useState(false)
  const [transitionMessage, setTransitionMessage] = useState("")
  const [selectedScenario, setSelectedScenario] = useState<string>("")
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

  const handleScenarioSelect = (scenario: string) => {
    setSelectedScenario(scenario)
    goToStep("input", "我們正在整理你的情境\n請自在的輸入或告訴我們您的情況")
  }

  const handleUserInputSubmit = (data: { text: string; files: File[] }) => {
    setUserInputData(data)
    goToStep("assessment", "我們正在確認你的急迫程度\n只會問最必要的問題")
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

      {currentStep === "scenario" && <ScenarioSelection onSelect={handleScenarioSelect} />}

      {currentStep === "input" && (
        <UserInput
          scenario={selectedScenario}
          onSubmit={handleUserInputSubmit}
          onBack={() => setCurrentStep("scenario")}
        />
      )}

      {currentStep === "assessment" && (
        <QuickAssessment onComplete={handleAssessmentComplete} onBack={() => setCurrentStep("input")} />
      )}

      {currentStep === "ai-chat" && (
        <AIChat
          onComplete={() => goToStep("result", "你已經做得很好了\n接下來只需要選一個下一步")}
          onBack={() => setCurrentStep("assessment")}
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
        <ActionGuidance onBack={() => setCurrentStep("result")} onRestart={() => setCurrentStep("scenario")} />
      )}
    </main>
  )
}
