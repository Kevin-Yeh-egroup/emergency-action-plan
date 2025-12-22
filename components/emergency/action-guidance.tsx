"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface ActionGuidanceProps {
  onBack: () => void
  onRestart: () => void
}

export default function ActionGuidance({ onBack, onRestart }: ActionGuidanceProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">下一步：申請線上諮詢</h1>
          <p className="text-muted-foreground">我們會用你剛剛填的資料當作起點，不需要你重新說一次</p>
        </div>

        <Card className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-1" />
              <div>
                <p className="font-medium">由社工／財務健康諮詢師協助</p>
                <p className="text-sm text-muted-foreground">專業人員會根據你的情況提供個人化建議</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-1" />
              <div>
                <p className="font-medium">目標：把「能做的事」整理成清楚的行動清單</p>
                <p className="text-sm text-muted-foreground">不再感到迷茫，每一步都有明確方向</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-1" />
              <div>
                <p className="font-medium">若需要急難救助：協助你確認方向、準備資料</p>
                <p className="text-sm text-muted-foreground">減少來回奔波，提高申請效率</p>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full">
            申請線上諮詢
          </Button>
        </Card>

        <Card className="p-6 bg-muted space-y-4 text-center">
          <p className="text-lg">如果你現在很混亂也沒關係</p>
          <p className="text-muted-foreground">你只要完成「一個步驟」就好</p>
          <p className="text-muted-foreground">我們會陪你把下一步做出來</p>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onRestart} className="flex-1 bg-transparent">
            重新開始評估
          </Button>
          <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            返回結果頁
          </Button>
        </div>
      </div>
    </div>
  )
}
