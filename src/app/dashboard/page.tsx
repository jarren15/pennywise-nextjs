import { ChartAreaInteractive } from "@/components/layout/dashboard/chart-area-interactive";
import { DataTable } from "@/components/layout/dashboard/data-table";
import { SectionCards } from "@/components/layout/dashboard/section-cards";
import data from "./data.json";

export default function Dashboard() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
