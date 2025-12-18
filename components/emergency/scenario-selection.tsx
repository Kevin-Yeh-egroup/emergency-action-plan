"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ScenarioSelectionProps {
  onSelect: (scenario: string) => void
}

const scenarios = [
  {
    id: "unemployment",
    title: "突然失業／收入中斷",
    description:
      "阿明 42 歲，餐飲工作多年，店面突然歇業。第 1 個月靠存款撐住，第 2 個月房租與孩子學費一起到期。他開始用信用卡先擋，但越來越焦慮：「是不是要先找救助？還是先找工作？我真的不知道從哪裡開始。」",
  },
  {
    id: "medical",
    title: "重大醫療／照顧支出突然發生",
    description:
      "小玲的媽媽中風住院，她請假照顧，收入直接減少。醫療費與看護費每天都在增加，她開始延後繳貸款與帳單。她有健保，但不確定還能申請什麼協助，只覺得「快要撐不住」。",
  },
  {
    id: "disaster",
    title: "天災／意外事故造成生活受損",
    description:
      "阿華家裡淹水，電器壞了、房間需要修繕，工作也暫停。他聽過災害補助，但不知道需要哪些文件，也不知道是不是已經錯過時間。他現在只想先把生活恢復，但「每一步都不知道去哪問」。",
  },
  {
    id: "family",
    title: "家庭突發變故",
    description:
      "某個決定讓家庭突然少了一個支撐者。你不只要處理錢，還要處理情緒與家裡的運作。你現在最需要的是：有人陪你把「下一步」先整理出來。",
  },
]

export default function ScenarioSelection({ onSelect }: ScenarioSelectionProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">急難議題協助</h1>
          <p className="text-xl text-muted-foreground">我們用一步一步，陪你找到下一個可行的行動</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">你目前最接近哪一種狀況？</h2>
          <p className="text-muted-foreground">你可以先選情境，再慢慢補充。不需要一開始就知道「要申請什麼」</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="p-6 space-y-4 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold">{scenario.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
              <Button onClick={() => onSelect(scenario.id)} className="w-full">
                我遇到類似狀況
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">其他（我想自己描述）</h3>
          <Button onClick={() => onSelect("other")} variant="outline" className="w-full max-w-md">
            我想用自己的話說明
          </Button>
        </Card>
      </div>
    </div>
  )
}
