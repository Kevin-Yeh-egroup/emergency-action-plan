"use client"

import { Card } from "@/components/ui/card"

const workItems = [
  {
    category: "內容製作",
    color: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-200 dark:border-blue-900",
    items: [
      { label: "急難議題文章", count: "×3" },
      { label: "流程懶人包", count: "×1" },
      { label: "Checklists", count: "×1" },
      { label: "FAQ", count: "×1" },
    ],
  },
  {
    category: "行銷資源",
    color: "from-cyan-500/10 to-cyan-500/5",
    borderColor: "border-cyan-200 dark:border-cyan-900",
    items: [
      { label: "Ads 圖片", count: "×10" },
      { label: "直式影片", count: "×2" },
      { label: "社群貼文", count: "×4" },
      { label: "合作單位公告", count: "×1" },
    ],
  },
  {
    category: "資源資料庫",
    color: "from-teal-500/10 to-teal-500/5",
    borderColor: "border-teal-200 dark:border-teal-900",
    items: [
      { label: "急難資源整理", count: "持續" },
      { label: "民間資源整理", count: "持續" },
      { label: "各縣市特色資源", count: "持續" },
      { label: "每季檢查更新", count: "定期" },
    ],
  },
  {
    category: "技術開發",
    color: "from-emerald-500/10 to-emerald-500/5",
    borderColor: "border-emerald-200 dark:border-emerald-900",
    items: [
      { label: "工具模組配置", count: "核心" },
      { label: "AI問答模板", count: "核心" },
      { label: "三步驟工具上架", count: "核心" },
      { label: "後台系統開發", count: "核心" },
    ],
  },
  {
    category: "QA測試",
    color: "from-purple-500/10 to-purple-500/5",
    borderColor: "border-purple-200 dark:border-purple-900",
    items: [
      { label: "互動工具易用性", count: "必備" },
      { label: "AI回答一致性", count: "必備" },
      { label: "結果頁邏輯", count: "必備" },
      { label: "登入流程", count: "必備" },
    ],
  },
]

const teamAllocation = [
  {
    role: "財務健康諮詢師",
    type: "主力",
    responsibilities: ["評估案件", "線上諮詢", "資源建議", "內容初審"],
    color: "bg-blue-500/10 border-blue-200 dark:border-blue-900",
  },
  {
    role: "工讀生團隊",
    type: "支援",
    responsibilities: ["資源資料庫(7位)", "議題爬蟲(5位)", "QA測試(5位)", "文章分類(5位)"],
    color: "bg-slate-500/10 border-slate-200 dark:border-slate-900",
  },
  {
    role: "創業引導員",
    type: "選用",
    responsibilities: ["收入提升評估", "信扶專案面談", "轉介服務"],
    color: "bg-cyan-500/10 border-cyan-200 dark:border-cyan-900",
  },
  {
    role: "行銷與編輯",
    type: "支援",
    responsibilities: ["Ads投放", "SEO優化", "社群經營", "內容發佈"],
    color: "bg-emerald-500/10 border-emerald-200 dark:border-emerald-900",
  },
]

export default function WorkStructure() {
  return (
    <section id="structure" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Work Items */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">工作項目清單</h2>
          <p className="text-muted-foreground text-lg mb-12">按類別分解所有必要工作</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {workItems.map((category, idx) => (
              <Card key={idx} className={`bg-gradient-to-br ${category.color} border ${category.borderColor} p-5`}>
                <h3 className="font-bold text-foreground mb-4 text-sm">{category.category}</h3>
                <div className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-start gap-2">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-xs font-semibold text-foreground/70 whitespace-nowrap">{item.count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Allocation */}
        <div id="allocation">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">人力分配</h2>
          <p className="text-muted-foreground text-lg mb-12">議題專案配置</p>

          <div className="grid md:grid-cols-2 gap-6">
            {teamAllocation.map((team, idx) => (
              <Card key={idx} className={`${team.color} border p-6`}>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground">{team.role}</h3>
                  <p className="text-sm text-muted-foreground">{team.type}</p>
                </div>
                <ul className="space-y-2">
                  {team.responsibilities.map((resp, respIdx) => (
                    <li key={respIdx} className="flex gap-2 text-sm">
                      <span className="text-blue-500 font-bold">→</span>
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
