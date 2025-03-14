import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"

interface ReportCard {
  title: string
  description: string
  updateInfo: string
  actionText: string
  actionHref: string
  icon: React.ReactNode
  variant: "default" | "emerald" | "blue" | "purple" | "orange"
}

const reports: ReportCard[] = [
{
    title: "Monthly Reports",
    description: "Comprehensive monthly fuel consumption and cost analysis",
    updateInfo: "Last updated: Jan 31, 2025",
    actionText: "View Report",
    actionHref: "/reports/monthly",
    variant: "emerald",
    icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    )
},
{
    title: "Efficiency Reports",
    description: "Detailed analysis of fuel efficiency and consumption patterns",
    updateInfo: "Real-time",
    actionText: "View Report",
    actionHref: "/reports/efficiency",
    variant: "blue",
    icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    )
},
{
    title: "Cost Analysis",
    description: "Financial breakdown of fuel expenses and cost trends",
    updateInfo: "Updated daily",
    actionText: "View Report",
    actionHref: "/reports/cost",
    variant: "purple",
    icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    )
},
{
    title: "Comparative Analysis",
    description: "Month-over-month and year-over-year comparisons",
    updateInfo: "Monthly",
    actionText: "View Report",
    actionHref: "/reports/comparative",
    variant: "orange",
    icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
    )
},
{
    title: "Environmental Impact",
    description: "Carbon footprint and environmental impact analysis",
    updateInfo: "Quarterly",
    actionText: "View Report",
    actionHref: "/reports/environmental",
    variant: "emerald",
    icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    )
},
{
    title: "Custom Report",
    description: "Generate custom reports based on specific parameters",
    updateInfo: "On demand",
    actionText: "Create Report",
    actionHref: "/reports/custom",
    variant: "default",
    icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
    )
}
]

const variantStyles = {
    emerald: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    purple: "text-purple-600 bg-purple-50 hover:bg-purple-100",
    orange: "text-orange-600 bg-orange-50 hover:bg-orange-100",
    default: "text-gray-600 bg-gray-50 hover:bg-gray-100"
}

export default function ReportsPage() {
  return (
    <>
      <PageHeader 
        title="Reports"
        description="View detailed reports and analytics"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                    {report.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <span className="text-sm text-gray-500">{report.updateInfo}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{report.description}</p>
                    <Button
                      asChild
                      variant="ghost"
                      className={`mt-4 px-4 py-2 ${variantStyles[report.variant]}`}
                    >
                      <Link href={report.actionHref}>
                        {report.actionText}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
