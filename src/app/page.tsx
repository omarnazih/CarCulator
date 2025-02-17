import { BellIcon, GaugeIcon, Settings2Icon, TimerIcon } from "lucide-react";
import { VehicleCard } from "@/components/dashboard/vehicle-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MaintenanceCard } from "@/components/dashboard/maintenance-card";
import { FuelLogsCard } from "@/components/dashboard/fuel-logs-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PageHeader } from "@/components/page-header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  // const supabase = await createClient()

  // const { data, error } = await supabase.auth.getUser()
  // if (error || !data?.user) {
  //   redirect('/login')
  // }
  
  return (
    <>
      <PageHeader 
        title="Dashboard"
        description="Overview of your vehicle maintenance and fuel consumption"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex gap-2">
            <BellIcon className="w-6 h-6 text-muted-foreground" />
            <Settings2Icon className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <VehicleCard model="Tesla Model 3" year="2025" plate="ABC 123" />
          <StatsCard
            icon={GaugeIcon}
            iconColor="text-blue-500"
            value="24,567 km"
            subtitle="Last updated today" title={""}/>
          <StatsCard
            icon={TimerIcon}
            iconColor="text-green-500"
            value="7.2 L/100km"
            subtitle="Average consumption" title={""}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <MaintenanceCard />
          <FuelLogsCard />
        </div>

        <QuickActions />
      </div>
    </>
  );
}
