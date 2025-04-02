// pages/dashboard/patient-reports/index.tsx
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Interface for type safety
interface MedicalReport {
  id: number;
  title: string;
  date: string;
  status: "Reviewed" | "Pending" | "Critical";
  description: string;
}

// Status badge configuration
const statusConfig = {
  Reviewed: { class: "bg-green-100 text-green-800 hover:bg-green-100" },
  Pending: { class: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  Critical: { class: "bg-red-100 text-red-800 hover:bg-red-100" },
};

// Report card component
function ReportCard({ report }: { report: MedicalReport }) {
  return (
    <article className="group bg-card rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 border">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div className="space-y-1.5">
          <h2 className="text-lg font-semibold leading-tight">
            {report.title}
          </h2>
          <p className="text-muted-foreground text-sm">
            {report.description}
          </p>
          <time className="text-xs text-muted-foreground block">
            {formatDate(report.date, "long")}
          </time>
        </div>
        <Badge 
          variant="outline" 
          className={statusConfig[report.status].class}
        >
          {report.status}
        </Badge>
      </div>
    </article>
  );
}

export default function PatientReportsPage() {
  // Sample data for patient reports
  const reports: MedicalReport[] = [
    {
      id: 1,
      title: "Chest X-Ray Report",
      date: "2023-04-10",
      status: "Reviewed",
      description: "Findings indicate normal lung structure with no significant abnormalities.",
    },
    {
      id: 2,
      title: "Lung CT Scan Report",
      date: "2023-03-20",
      status: "Pending",
      description: "Small nodules detected. Further analysis and follow-up required.",
    },
    {
      id: 3,
      title: "Pulmonary Function Test",
      date: "2023-02-15",
      status: "Reviewed",
      description: "Results within normal range. No signs of obstruction or restriction.",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          {/* Header with breadcrumb */}
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4">
            <SidebarTrigger 
              className="-ml-1" 
              aria-label="Toggle sidebar"
            />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Medical Reports</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">
                  Medical Reports
                </h1>
                <p className="text-muted-foreground">
                  Review your diagnostic reports and findings
                </p>
              </div>

              {/* Reports list */}
              <section className="space-y-4">
                {reports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </section>

              {/* Empty state */}
              {reports.length === 0 && (
                <div className="flex h-96 items-center justify-center rounded-lg border">
                  <p className="text-muted-foreground">
                    No reports available
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}