"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const phaseDetails = {
  audience: {
    title: "議題受眾",
    description: "識別和理解目標族群",
    sections: [
      {
        title: "可能遇到此議題的族群",
        items: [
          "因突發事故或疾病導致收入中斷／支出暴增的家庭",
          "單親家庭、主要照顧者失能或突然住院者",
          "弱勢邊緣戶，遇急難但不清楚可用資源",
          "臨時生活陷困但不知道第一步該做什麼的人",
          "對急難資訊量過大、無法理解流程的一般民眾",
        ],
      },
      {
        title: "關鍵痛點",
        items: [
          "急迫時間內缺乏清楚流程",
          "不知道哪些資料是必要的",
          "不知道有哪些協助方式",
          "容易誤信錯誤來源或民間謠言",
        ],
      },
    ],
  },
  strategy: {
    title: "接觸策略",
    description: "多渠道結合（Google Ads × SEO × AISEO × EEAT）",
    sections: [
      {
        title: "Google Ads",
        items: ["急難處理三步驟（安全素材）", "溫暖陪伴感視覺", "CTA：遇到急難，先不用慌"],
      },
      {
        title: "SEO 策略",
        items: [
          "Primary：急難如何處理、急難流程、收入中斷怎麼辦",
          "Secondary：家庭突發狀況、突然住院支出",
          "Content Cluster：流程、案例、checklist、各縣市資源",
        ],
      },
      {
        title: "EEAT 可信度建構",
        items: [
          "作者為財務健康諮詢師",
          "引用實務經驗（無個資）",
          "放上認證（AIEC、IT Matters Award等）",
          "提供透明流程與免責聲明",
        ],
      },
    ],
  },
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
}

export default function PhaseDetails() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">規劃詳細內容</h2>
          <p className="text-muted-foreground text-lg">按階段查看完整細節</p>
        </div>

        <Tabs defaultValue="audience" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="audience">階段1：受眾</TabsTrigger>
            <TabsTrigger value="strategy">階段2：策略</TabsTrigger>
            <TabsTrigger value="tools">階段3–4：工具</TabsTrigger>
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
