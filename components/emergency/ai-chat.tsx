"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface AIChatProps {
  onComplete: () => void
  onBack: () => void
  onBackToResult?: () => void
}

interface Message {
  role: "ai" | "user"
  content: string
}

const initialMessages: Message[] = [{ role: "ai", content: "這件事大約從什麼時候開始？" }]

export default function AIChat({ onComplete, onBack, onBackToResult }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user" as const, content: input }]
    setMessages(newMessages)
    setInput("")

    setTimeout(() => {
      let aiResponse = ""
      if (newMessages.length < 4) {
        aiResponse = "最近一週，你最擔心的支出是哪一筆？（房租／醫療／學費／還款／其他）"
      } else if (newMessages.length < 6) {
        aiResponse = "家中還有人能協助分擔收入或照顧嗎？"
      } else {
        aiResponse = "你手上是否有能證明狀況的文件？（解雇通知／診斷證明／災害證明）"
      }
      setMessages([...newMessages, { role: "ai", content: aiResponse }])
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">問問 AI</h1>
          <p className="text-muted-foreground">你不用自己想要補什麼資料，AI 會用「最少問題」幫你把狀況拼起來</p>
        </div>

        <Card className="p-6 space-y-4 min-h-[400px] flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((message, i) => (
              <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="輸入你的回答..."
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            返回評估
          </Button>
          {onBackToResult && (
            <Button variant="outline" onClick={onBackToResult} className="flex-1 bg-transparent">
              返回結果頁
            </Button>
          )}
          <Button onClick={onComplete} className="flex-1">
            完成補問
          </Button>
        </div>
      </div>
    </div>
  )
}
