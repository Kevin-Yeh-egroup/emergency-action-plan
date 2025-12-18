"use client"

import { Card } from "@/components/ui/card"

const phases = [
  {
    number: 1,
    title: "議題受眾",
    icon: "👥",
    description: "識別可能遇到急難的族群，深入理解他們的痛點和需求",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    number: 2,
    title: "接觸策略",
    icon: "🎯",
    description: "透過Google Ads、SEO、AISEO和EEAT建構多渠道接觸方案",
    color: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    number: 3,
    title: "互動工具",
    icon: "⚙️",
    description: "開發自我檢查工具、壓力量表和AI問答系統引導用戶",
    color: "from-teal-500/20 to-teal-500/5",
  },
  {
    number: 4,
    title: "留存策略",
    icon: "📈",
    description: "透過登入誘因、回訪提醒和年度回顧建立持久用戶關係",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
]

export default function PhasesOverview() {
  return (
    <section id="phases" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">4階段完整規劃</h2>
          <p className="text-muted-foreground text-lg">從認識受眾到建立持久關係</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase) => (
            <Card
              key={phase.number}
              className={`group bg-gradient-to-br ${phase.color} border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 p-6`}
            >
              <div className="flex flex-col h-full gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{phase.icon}</span>
                  <span className="text-3xl font-bold text-muted-foreground group-hover:text-foreground/50 transition">
                    {phase.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
