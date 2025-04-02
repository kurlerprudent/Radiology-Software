// pages/dashboard/patient-appointments/index.tsx
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { formatDateTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

const statusConfig = {
  Confirmed: { label: "Confirmed", class: "bg-green-100 text-green-800" },
  Pending: { label: "Pending", class: "bg-yellow-100 text-yellow-800" },
  Completed: { label: "Completed", class: "bg-blue-100 text-blue-800" },
  Cancelled: { label: "Cancelled", class: "bg-red-100 text-red-800" },
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <article className="group bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md border hover:border-primary/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div className="space-y-1.5">
          <h2 className="text-lg font-semibold leading-tight">
            Consultation with{" "}
            <span className="text-primary">{appointment.doctor}</span>
          </h2>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={`${appointment.date}T${appointment.time}`}>
                {formatDateTime(appointment.date, appointment.time)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <StethoscopeIcon className="h-4 w-4" />
              <span>{appointment.type}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className={statusConfig[appointment.status].class}>
            {statusConfig[appointment.status].label}
          </Badge>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function PatientAppointmentsPage() {
  const appointments: Appointment[] = [
    {
      id: 1,
      doctor: "Dr. Mensah",
      date: "2023-04-15",
      time: "10:00",
      type: "Follow-up Consultation",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Boateng",
      date: "2023-04-20",
      time: "14:30",
      type: "Initial Consultation",
      status: "Pending",
    },
    {
      id: 3,
      doctor: "Dr. Asare",
      date: "2023-03-30",
      time: "09:00",
      type: "Routine Checkup",
      status: "Completed",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4">
            <SidebarTrigger 
              className="-ml-1" 
              aria-label="Toggle navigation"
            />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Appointments</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">
                  Upcoming Appointments
                </h1>
                <p className="text-muted-foreground">
                  Manage your scheduled consultations and medical visits
                </p>
              </div>

              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                  />
                ))}
              </div>

              {appointments.length === 0 && (
                <div className="flex h-96 items-center justify-center rounded-lg border">
                  <div className="text-center space-y-2">
                    <CalendarIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No upcoming appointments scheduled
                    </p>
                    <Button variant="outline" className="mt-4">
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function StethoscopeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A9 9 0 0 1 18 8.2" />
      <path d="M2 9.3a15 15 0 0 0 4.2 2.7" />
      <path d="M16 9a6 6 0 0 1 6 6v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a6 6 0 0 1 6-6" />
      <circle cx="15" cy="7" r="1" />
      <circle cx="9" cy="7" r="1" />
    </svg>
  );
}