"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"
import { logError, formatErrorMessage, parseError } from "@/lib/error-handler"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const errorInfo = parseError(error)
  
  useEffect(() => {
    // 記錄錯誤到控制台或錯誤追蹤服務
    logError(error, {
      digest: error.digest,
      stack: error.stack,
    })
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">發生錯誤</h1>
          <h2 className="text-xl font-semibold text-muted-foreground">
            {formatErrorMessage(error)}
          </h2>
          {(error.digest || errorInfo.id) && (
            <p className="text-xs text-muted-foreground font-mono">
              錯誤 ID: {error.digest || errorInfo.id}
            </p>
          )}
          {errorInfo.code && (
            <p className="text-xs text-muted-foreground">
              錯誤代碼: {errorInfo.code}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            請嘗試重新載入頁面，或返回首頁。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            重試
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              返回首頁
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">
              開發模式：查看詳細錯誤
            </summary>
            <pre className="mt-2 p-4 bg-muted rounded-md text-xs overflow-auto max-h-48">
              {error.stack}
            </pre>
          </details>
        )}
      </Card>
    </div>
  )
}

