"use client"

import { Button } from "@/components/ui/button"
import type { FlowStep } from "@/app/page"

const steps = [
  { id: "assessment", label: "家庭財務韌性快速評估" },
  { id: "ai-chat", label: "問問AI" },
  { id: "result", label: "初判" },
  { id: "action", label: "行動" },
]

interface HeaderProps {
  currentStep: FlowStep
  onStepChange: (step: FlowStep) => void
}

export default function Header({ currentStep, onStepChange }: HeaderProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">家庭財務韌性快速評估</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                暫停
              </Button>
              <Button variant="default" size="sm">
                線上諮詢
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      index <= currentIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-sm ${index <= currentIndex ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-px w-8 ${index < currentIndex ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
