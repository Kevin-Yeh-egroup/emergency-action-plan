/**
 * 數字格式化工具函數
 */

/**
 * 格式化數字，添加千分號
 * @param num 要格式化的數字
 * @returns 格式化後的字符串
 */
export function formatNumber(num: number | string): string {
  const numStr = typeof num === "string" ? num : num.toString()
  
  // 如果是小數，分別處理整數和小數部分
  if (numStr.includes(".")) {
    const [integerPart, decimalPart] = numStr.split(".")
    return `${formatInteger(integerPart)}.${decimalPart}`
  }
  
  return formatInteger(numStr)
}

/**
 * 格式化整數，添加千分號
 */
function formatInteger(numStr: string): string {
  // 移除可能存在的千分號
  const cleanNum = numStr.replace(/,/g, "")
  
  // 使用正則表達式添加千分號
  return cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * 格式化金額（包含 NT$ 前綴）
 * @param amount 金額字符串，例如 "NT$50000" 或 "50000"
 * @returns 格式化後的金額字符串
 */
export function formatCurrency(amount: string): string {
  // 提取數字部分
  const match = amount.match(/(NT\$?\s*)?([\d,]+)/i)
  if (!match) return amount
  
  const prefix = match[1] || ""
  const numStr = match[2].replace(/,/g, "")
  const formattedNum = formatNumber(numStr)
  
  return `${prefix}${formattedNum}`
}

/**
 * 格式化範圍金額（例如 "NT$30,000-50,000"）
 * @param range 範圍字符串
 * @returns 格式化後的範圍字符串
 */
export function formatCurrencyRange(range: string): string {
  // 匹配範圍格式，例如 "NT$30000-50000" 或 ">NT$50000" 或 "<NT$10000"
  const rangeMatch = range.match(/([<>]?)\s*(NT\$?\s*)?([\d,]+)(\s*-\s*(NT\$?\s*)?([\d,]+))?/i)
  if (!rangeMatch) return range
  
  const prefix = rangeMatch[1] || "" // > 或 <
  const currency1 = rangeMatch[2] || ""
  const num1 = rangeMatch[3].replace(/,/g, "")
  const separator = rangeMatch[4] ? "-" : ""
  const currency2 = rangeMatch[5] || ""
  const num2 = rangeMatch[6]?.replace(/,/g, "") || ""
  
  const formattedNum1 = formatNumber(num1)
  const formattedNum2 = num2 ? formatNumber(num2) : ""
  
  if (separator) {
    return `${prefix}${currency1}${formattedNum1} ${separator} ${currency2}${formattedNum2}`
  }
  
  return `${prefix}${currency1}${formattedNum1}`
}

