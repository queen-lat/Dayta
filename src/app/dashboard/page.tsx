import DataCard from "../components/DataCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#222222]">
      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-5 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-none">
              Affordable
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">
                Data Bundles
              </span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Purchase data for MTN, AirtelTigo, and Telecel with instant
              delivery
            </p>
          </div>

          {/* Info Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                ✓ Instant Activation
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                ⚡ No Airtime Debt Required
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                📱 Not for Turbonet SIM
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto ">
            <DataCard
              Name="AirtelTigo"
              Link="/dashboard/AT-retail"
              Image="/at.png"
              available={true}
            />
            <DataCard
              Name="MTN"
              Link="/dashboard/mtn-retail"
              available={false}
            />

            <DataCard
              Name="Telecel"
              Link="/dashboard/telecel-retail"
              Image="/tele.png"
              available={false}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-500">
            © 2025 Dayta. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
