import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Main content */}
      <main className="flex flex-col items-center w-full px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">
          Affordable Data Bundle
        </h2>

        {/* Info text */}
        <div className="flex flex-col md:flex-row text-sm text-gray-700 space-y-2 md:space-y-0 md:space-x-10 mt-2 mb-8 text-center">
          <p>📌 Buy affordable data bundle on MTN and AirtelTigo</p>
          <p>Recipient number shouldn’t owe Airtime</p>
          <p>Doesn’t work for Turbonet SIM</p>
        </div>

        {/* Airtime section */}
        <div className="w-full flex flex-col items-center mb-10">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">AIRTIME</h3>
          <Image
            src="/airtime-logos.png"
            alt="Airtime Logos"
            width={200}
            height={200}
            className="rounded-xl"
          />
        </div>

        {/* Data bundle section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          <div>
            <Image
              src="/mtn.svg"
              alt="MTN"
              width={250}
              height={250}
              className="mx-auto rounded-xl"
            />
            <p className="mt-2 font-medium text-gray-700">MTN</p>
          </div>

          <div>
            <Image
              src="/airteltigo.png"
              alt="AirtelTigo"
              width={250}
              height={250}
              className="mx-auto rounded-xl"
            />
            <p className="mt-2 font-medium text-gray-700">AirtelTigo</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500 text-sm pb-6">
        Copyright © 2025 Dayta.com
      </footer>
    </div>
  );
}
