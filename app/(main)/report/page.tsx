"use client"
import { BarChart3, FileText, Landmark, Users } from 'lucide-react';
import Link from 'next/link';

// You can replace this with your actual data fetched from an API
const reportData = [
  {
    icon: "chart",
    title: "Q2 Sales Analytics",
    date: "April 1, 2025 - June 30, 2025",
    description: "In-depth analysis of sales performance, customer acquisition, and regional growth.",
    link: "/reports/q2-sales",
  },
  {
    icon: "file",
    title: "Annual Financial Statement",
    date: "Fiscal Year 2024",
    description: "The complete financial overview, including balance sheets and income statements.",
    link: "/reports/fy-2024",
  },
  {
    icon: "users",
    title: "User Engagement Report",
    date: "June 2025",
    description: "Monthly breakdown of user activity, feature adoption, and retention metrics.",
    link: "/reports/user-engagement-jun",
  },
  {
    icon: "landmark",
    title: "Compliance & Audit",
    date: "January 1, 2025 - June 30, 2025",
    description: "Summary of all compliance checks and internal audit findings for H1.",
    link: "/reports/h1-compliance",
  },
    {
    icon: "chart",
    title: "Marketing Campaign ROI",
    date: "May 2025",
    description: "Performance metrics for the 'Summer Splash' marketing campaign.",
    link: "/reports/marketing-may",
  },
  {
    icon: "file",
    title: "Q1 Operations Summary",
    date: "January 1, 2025 - March 31, 2025",
    description: "Overview of operational efficiency, uptime, and support tickets.",
    link: "/reports/q1-operations",
  },
];

// A helper to map string names to actual icon components
const icons: { [key: string]: React.ReactNode } = {
  chart: <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />,
  file: <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
  users: <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
  landmark: <Landmark className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
};

// This block contains custom CSS for animations and backgrounds.
const CustomStyles = () => (
  <style jsx global>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .report-card {
      // Apply the animation to each card
      animation: fadeInUp 0.5s ease-out forwards;
      // Stagger the animation for each card for a nice effect
    }

    .header-bg {
      // A subtle, modern gradient for the header background
      background: radial-gradient(circle at 10% 20%, rgb(89 123 234 / 0.1), transparent 50%);
    }

    .dark .header-bg {
      background: radial-gradient(circle at 10% 20%, rgb(30 255 188 / 0.1), transparent 50%);
    }
  `}</style>
);


export default function ReportPage() {
  return (
    <>
      <CustomStyles />
      <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-gray-200">
        {/* Header Section */}
        <header className="header-bg py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Company Reports
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Access all internal analytics, financial statements, and performance summaries.
            </p>
          </div>
        </header>

        {/* Reports Grid Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reportData.map((report, index) => (
              <div
                key={report.title}
                className="report-card bg-white dark:bg-zinc-800/50 p-6 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm hover:shadow-xl hover:border-green-500/50 dark:hover:border-green-500 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }} // Stagger animation delay
              >
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 dark:bg-zinc-900/80 mb-4">
                      {icons[report.icon]}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-1">{report.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{report.date}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-balance">
                      {report.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link href={report.link}>
                      <span className="inline-flex items-center font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 group">
                        View Report
                        <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}