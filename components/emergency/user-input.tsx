"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Mic, X } from "lucide-react"

interface UserInputProps {
  scenario: string
  onSubmit: (data: { text: string; files: File[] }) => void
  onBack: () => void
}

const scenarioTitles: Record<string, string> = {
  unemployment: "突然失業／收入中斷",
  medical: "重大醫療／照顧支出突然發生",
  disaster: "天災／意外事故造成生活受損",
  family: "家庭突發變故",
  other: "其他狀況",
}

export default function UserInput({ scenario, onSubmit, onBack }: UserInputProps) {
  const [text, setText] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSelectFile = () => {
    // 模擬已選擇檔案，創建一個假的 File 對象
    const mockFile = new File(
      ["模擬檔案內容"],
      "範例檔案.pdf",
      { type: "application/pdf" }
    )
    // 使用 Object.defineProperty 設置 size 屬性
    Object.defineProperty(mockFile, "size", {
      value: 1024 * 50, // 50 KB
      writable: false,
    })
    setFiles([mockFile])
  }

  const handleSubmit = () => {
    onSubmit({ text, files })
  }

  const isOtherScenario = !scenario || scenario === "other"
  const scenarioTitle = scenarioTitles[scenario] || "其他狀況"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">你可以先提供你手上有的資訊</h1>
          {!isOtherScenario && (
            <p className="text-muted-foreground">你選擇的情境：{scenarioTitle}</p>
          )}
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">文字輸入</label>
            <div className="relative">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="請描述目前發生什麼事、從什麼時候開始、你最擔心的是哪一件事"
                className="min-h-[200px] pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-3 p-2 rounded-full hover:bg-muted transition-colors"
                title="語音輸入"
              >
                <Mic className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">檔案上傳</label>
            {files.length === 0 ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">支援：圖片 / PDF / 文件</p>
                  <p className="text-xs text-muted-foreground">不需要一次備齊，你可以先上傳最關鍵的一張或一份</p>
                </div>
                <Button variant="outline" onClick={handleSelectFile}>
                  選擇檔案
                </Button>
              </div>
            ) : (
              <div className="border border-border rounded-lg p-4 space-y-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">已選擇 {files.length} 個檔案</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const mockFile = new File(
                        ["模擬檔案內容"],
                        `範例檔案_${files.length + 1}.pdf`,
                        { type: "application/pdf" }
                      )
                      Object.defineProperty(mockFile, "size", {
                        value: 1024 * 50,
                        writable: false,
                      })
                      setFiles([...files, mockFile])
                    }}
                  >
                    新增檔案
                  </Button>
                </div>
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-background rounded border border-border">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-foreground truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            返回
          </Button>
          <Button onClick={handleSubmit} className="flex-1" disabled={!text && files.length === 0}>
            繼續下一步
          </Button>
        </div>
      </div>
    </div>
  )
}
