// app/dashboard/patient/profile/page.tsx

"use client"
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { User, Lock, HeartPulse } from "lucide-react";

export default function PatientProfilePage() {
  const { data: session } = useSession();

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
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarImage src={session?.user?.image ?? undefined} />
                    <AvatarFallback className="bg-primary/10 text-2xl">
                      {session?.user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
                  <p className="text-muted-foreground">{session?.user?.email}</p>
                  <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-800">
                    Patient
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" /> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={session?.user?.name || ""} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={session?.user?.email || ""} readOnly />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input value="+233 24 123 4567" readOnly />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input value="January 1, 1980" readOnly />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Security Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" value="********" readOnly />
                    <Button variant="outline" className="mt-2">
                      Change Password
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Not Enabled
                    </Badge>
                    <Button variant="outline" className="mt-2">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <HeartPulse className="h-5 w-5" /> Medical Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Blood Type</Label>
                    <Input value="O+" readOnly />
                  </div>
                  <div>
                    <Label>Primary Care Physician</Label>
                    <Input value="Dr. Kwame Asare" readOnly />
                  </div>
                  <div>
                    <Label>Allergies</Label>
                    <Input value="Penicillin, Pollen" readOnly />
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <Input value="+233 24 765 4321" readOnly />
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  Request Information Update
                </Button>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}