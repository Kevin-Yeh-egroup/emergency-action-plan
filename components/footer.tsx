"use client"

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4">關於本計畫</h4>
            <p className="text-sm text-slate-400">完整的急難救助議題規劃方案，協助團隊理解整體策略方向。</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">快速導航</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#phases" className="hover:text-white transition">
                  4階段規劃
                </a>
              </li>
              <li>
                <a href="#structure" className="hover:text-white transition">
                  工作項目
                </a>
              </li>
              <li>
                <a href="#allocation" className="hover:text-white transition">
                  人力分配
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">版本資訊</h4>
            <p className="text-sm text-slate-400">行動計畫 v1</p>
            <p className="text-sm text-slate-400">完整規劃</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">聯絡資訊</h4>
            <p className="text-sm text-slate-400">急難救助議題團隊</p>
            <p className="text-sm text-slate-400">project@example.com</p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">© 2025 急難救助計畫。保留所有權利。</p>
          <p className="text-sm text-slate-400">規劃設計版本 v1 - 用於團隊內部說明</p>
        </div>
      </div>
    </footer>
  )
}
