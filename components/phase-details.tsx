"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const phaseDetails = {
  tools: {
    title: "互動工具",
    description: "彈性模組化設計",
    sections: [
      {
        title: "主互動工具",
        items: [
          "急難事件三步驟自我檢查",
          "家庭急難壓力快速量表",
          "急難資料 checklist（非補助導向）",
          "急難狀況分類器（AI自動分類）",
        ],
      },
      {
        title: "AI引導式問答",
        items: [
          "發生了什麼事？什麼時候發生？",
          "對家庭造成最大影響是什麼？",
          "最困擾或最需要處理的是哪一部分？",
          "現在最擔心的事情有哪些？",
          "家裡是否有短期可用的支持？",
        ],
      },
      {
        title: "自動摘要生成",
        items: [
          "使用者版（A+C）：急迫程度、立即行動、推薦資源",
          "諮詢師版（A+B+C）：完整摘要、分類、建議、可能資源",
          "預約導流：依急迫程度推薦後續服務",
        ],
      },
    ],
  },
  retention: {
    title: "留存策略",
    description: "透過登入誘因、回訪提醒和年度回顧建立持久用戶關係",
    sections: [
      {
        title: "登入誘因",
        items: [
          "個人化財務健康報告",
          "定期評估與追蹤",
          "專屬資源推薦",
        ],
      },
      {
        title: "回訪提醒",
        items: [
          "定期財務狀況檢查",
          "重要事件提醒",
          "新資源通知",
        ],
      },
      {
        title: "年度回顧",
        items: [
          "年度財務韌性報告",
          "成長歷程回顧",
          "未來規劃建議",
        ],
      },
    ],
  },
}

export default function PhaseDetails() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">規劃詳細內容</h2>
          <p className="text-muted-foreground text-lg">按階段查看完整細節</p>
        </div>

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="tools">階段3：互動工具</TabsTrigger>
            <TabsTrigger value="retention">階段4：留存策略</TabsTrigger>
          </TabsList>

          {Object.entries(phaseDetails).map(([key, phase]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-border/50 p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </Card>

              <div className="grid gap-6">
                {phase.sections.map((section, idx) => (
                  <Card key={idx} className="border-border/50 p-6 hover:shadow-md transition">
                    <h4 className="text-lg font-bold text-foreground mb-4">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
