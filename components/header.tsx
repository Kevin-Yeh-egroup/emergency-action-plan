"use client"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">急</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">急難救助計畫</h1>
            <p className="text-xs text-muted-foreground">行動計畫規劃說明</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#phases" className="text-sm text-muted-foreground hover:text-foreground transition">
            2階段
          </a>
          <a href="#structure" className="text-sm text-muted-foreground hover:text-foreground transition">
            工作架構
          </a>
          <a href="#allocation" className="text-sm text-muted-foreground hover:text-foreground transition">
            人力分配
          </a>
        </nav>
      </div>
    </header>
  )
}
