"use client"

import { useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function NotFoundContent() {
  const searchParams = useSearchParams()
  const errorId = searchParams?.get("errorId") || searchParams?.get("id")
  const errorCode = searchParams?.get("code")

  useEffect(() => {
    // 記錄 404 錯誤
    if (typeof window !== "undefined") {
      console.error("404 錯誤:", {
        path: window.location.pathname,
        errorId,
        errorCode,
        timestamp: new Date().toISOString(),
      })
    }
  }, [errorId, errorCode])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">404</h1>
          <h2 className="text-xl font-semibold text-muted-foreground">找不到頁面</h2>
          <p className="text-sm text-muted-foreground">
            抱歉，您要尋找的頁面不存在或已被移除。
          </p>
          {errorId && (
            <p className="text-xs text-muted-foreground font-mono mt-2">
              錯誤 ID: {errorId}
            </p>
          )}
          {errorCode && (
            <p className="text-xs text-muted-foreground mt-1">
              錯誤代碼: {errorCode}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              返回首頁
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            重新載入
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">404</h1>
            <h2 className="text-xl font-semibold text-muted-foreground">找不到頁面</h2>
          </div>
        </Card>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  )
}

