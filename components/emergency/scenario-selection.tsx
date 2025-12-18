"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Briefcase, HeartPulse, Home, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScenarioSelectionProps {
  onSelect: (scenario: string) => void
}

const scenarios = [
  {
    id: "unemployment",
    title: "突然失業／收入中斷",
    description:
      "阿明 42 歲，餐飲工作多年，店面突然歇業。第 1 個月靠存款撐住，第 2 個月房租與孩子學費一起到期。他開始用信用卡先擋，但越來越焦慮：「是不是要先找救助？還是先找工作？我真的不知道從哪裡開始。」",
    icon: Briefcase,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "medical",
    title: "重大醫療／照顧支出突然發生",
    description:
      "小玲的媽媽中風住院，她請假照顧，收入直接減少。醫療費與看護費每天都在增加，她開始延後繳貸款與帳單。她有健保，但不確定還能申請什麼協助，只覺得「快要撐不住」。",
    icon: HeartPulse,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    id: "disaster",
    title: "天災／意外事故造成生活受損",
    description:
      "阿華家裡淹水，電器壞了、房間需要修繕，工作也暫停。他聽過災害補助，但不知道需要哪些文件，也不知道是不是已經錯過時間。他現在只想先把生活恢復，但「每一步都不知道去哪問」。",
    icon: Home,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    id: "family",
    title: "家庭突發變故",
    description:
      "某個決定讓家庭突然少了一個支撐者。你不只要處理錢，還要處理情緒與家裡的運作。你現在最需要的是：有人陪你把「下一步」先整理出來。",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
]

export default function ScenarioSelection({ onSelect }: ScenarioSelectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleScenarioClick = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">急難議題協助</h1>
          <p className="text-xl text-muted-foreground">我們用一步一步，陪你找到下一個可行的行動</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">你目前最接近哪一種狀況？</h2>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon
            const isExpanded = expandedId === scenario.id

            return (
              <Card
                key={scenario.id}
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-out cursor-pointer hover:border-primary",
                  isExpanded && "border-primary border-2 shadow-lg",
                  isExpanded && scenario.bgColor
                )}
                onClick={() => handleScenarioClick(scenario.id)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-lg transition-transform duration-300", scenario.bgColor, isExpanded && "scale-110")}>
                      <Icon className={cn("h-6 w-6 transition-transform duration-300", scenario.color, isExpanded && "scale-110")} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{scenario.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground transition-transform duration-300 rotate-180" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300" />
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500 ease-out",
                      isExpanded 
                        ? "max-h-96 opacity-100 mt-4 pt-4 border-t border-border" 
                        : "max-h-0 opacity-0"
                    )}
                  >
                    {isExpanded && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="border border-border rounded-lg p-4 bg-background/50 backdrop-blur-sm shadow-sm">
                          <p className="text-[14pt] leading-relaxed text-foreground">{scenario.description}</p>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelect(scenario.id)
                          }}
                          className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200"
                          size="lg"
                        >
                          我遇到類似狀況，我想尋求協助
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
