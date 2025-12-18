"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

interface UserInputProps {
  scenario: string
  onSubmit: (data: { text: string; files: File[] }) => void
  onBack: () => void
}

export default function UserInput({ scenario, onSubmit, onBack }: UserInputProps) {
  const [text, setText] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = () => {
    onSubmit({ text, files })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">你可以先提供你手上有的資訊</h1>
          <p className="text-muted-foreground">不用專業、也不用完整</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">文字輸入</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="請描述目前發生什麼事、從什麼時候開始、你最擔心的是哪一件事"
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">檔案上傳</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm font-medium">支援：圖片 / PDF / 文件</p>
                <p className="text-xs text-muted-foreground">不需要一次備齊，你可以先上傳最關鍵的一張或一份</p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf,.doc,.docx"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" asChild>
                  <span>選擇檔案</span>
                </Button>
              </label>
              {files.length > 0 && (
                <div className="text-sm text-left space-y-1">
                  <p className="font-medium">已選擇 {files.length} 個檔案：</p>
                  {files.map((file, i) => (
                    <p key={i} className="text-muted-foreground">
                      {file.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
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
