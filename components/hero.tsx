"use client"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-background py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-slate-100/50 opacity-0 dark:opacity-100" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">完整規劃方案 v1</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            急難救助議題
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">行動計畫</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            從受眾分析到工作執行，完整的4階段規劃架構，幫助您和團隊清楚理解整個急難救助倡議的策略方向和實施細節。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
              查看完整規劃
            </button>
            <button className="px-6 py-3 border border-border hover:bg-muted rounded-lg font-medium transition">
              下載檔案
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
