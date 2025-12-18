/**
 * 錯誤處理工具函數
 */

export interface ErrorInfo {
  message: string
  code?: string
  id?: string
  status?: number
  timestamp?: string
}

/**
 * 解析錯誤訊息，提取錯誤代碼和 ID
 */
export function parseError(error: string | Error): ErrorInfo {
  const errorMessage = typeof error === "string" ? error : error.message
  const errorInfo: ErrorInfo = {
    message: errorMessage,
    timestamp: new Date().toISOString(),
  }

  // 解析格式: "404: NOT_FOUND\nCode: NOT_FOUND\nID: hkg1::dctsf-1766048196676-6fbd9cb82398"
  const lines = errorMessage.split("\n")
  
  for (const line of lines) {
    // 提取狀態碼
    const statusMatch = line.match(/^(\d+):\s*(.+)$/)
    if (statusMatch) {
      errorInfo.status = parseInt(statusMatch[1], 10)
      errorInfo.code = statusMatch[2].trim()
      continue
    }

    // 提取錯誤代碼
    const codeMatch = line.match(/^Code:\s*(.+)$/i)
    if (codeMatch) {
      errorInfo.code = codeMatch[1].trim()
      continue
    }

    // 提取錯誤 ID
    const idMatch = line.match(/^ID:\s*(.+)$/i)
    if (idMatch) {
      errorInfo.id = idMatch[1].trim()
      continue
    }
  }

  return errorInfo
}

/**
 * 記錄錯誤到控制台（開發環境）或錯誤追蹤服務（生產環境）
 */
export function logError(error: Error | string, context?: Record<string, unknown>) {
  const errorInfo = parseError(error)
  
  const logData = {
    ...errorInfo,
    context,
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  }

  // 開發環境：輸出到控制台
  if (process.env.NODE_ENV === "development") {
    console.error("錯誤詳情:", logData)
  }

  // 生產環境：可以發送到錯誤追蹤服務
  // 例如：Sentry, LogRocket, 或其他服務
  if (process.env.NODE_ENV === "production") {
    // TODO: 整合錯誤追蹤服務
    // sendToErrorTrackingService(logData)
  }

  return errorInfo
}

/**
 * 格式化錯誤訊息供使用者顯示
 */
export function formatErrorMessage(error: Error | string): string {
  const errorInfo = parseError(error)
  
  // 根據錯誤代碼返回友善的訊息
  switch (errorInfo.code) {
    case "NOT_FOUND":
      return "找不到請求的資源，請確認網址是否正確。"
    case "UNAUTHORIZED":
      return "您沒有權限存取此資源。"
    case "FORBIDDEN":
      return "此操作被禁止。"
    case "INTERNAL_SERVER_ERROR":
      return "伺服器發生錯誤，請稍後再試。"
    default:
      return errorInfo.message || "發生未預期的錯誤，請稍後再試。"
  }
}



