"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, User, Stethoscope, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setAuthToken } from "@/lib/auth/index";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Store token and handle redirection
      setAuthToken(data.token);
      toast.success("Login successful", { description: "Redirecting to your dashboard..." });

      // Role-based routing
      switch (data.user.role) {
        case "PATIENT":
          router.push("/patient/dashboard");
          break;
        case "DOCTOR":
          router.push("/doctor/dashboard");
          break;
        case "ADMIN":
        case "SUPER_ADMIN":
          router.push("/admin/dashboard");
          break;
        default:
          router.push("/dashboard");
      }

    } catch (error) {
      toast.error("Authentication Failed", {
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4"
      >
        <Card className="p-8 shadow-xl rounded-2xl bg-white dark:bg-slate-800 border border-blue-50 dark:border-slate-700">
          <div className="text-center mb-8 space-y-4">
            <div className="mb-6 flex justify-center">
              <Lock className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Medical Imaging Portal
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Secure access to diagnostic imaging services
            </p>
          </div>

          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Professional Email
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  {...form.register("email")}
                  placeholder="name@hospital.com"
                  className="h-12 pl-10 pr-4 rounded-lg focus-visible:ring-blue-200"
                  disabled={isLoading}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-10 pr-11 rounded-lg focus-visible:ring-blue-200"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/80 rounded-full animate-spin border-t-transparent" />
                  Authenticating...
                </div>
              ) : (
                "Access Medical Portal"
              )}
            </Button>

            <div className="text-center text-sm text-slate-600 dark:text-slate-400 space-y-4">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 block"
              >
                Forgot your credentials?
              </Link>
              
              <p className="border-t border-slate-200 dark:border-slate-700 pt-4">
                New to the platform?{" "}
                <Link
                  href="/request-access"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Request clinical access
                </Link>
              </p>
            </div>
          </form>
        </Card>

        {/* Security Compliance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 grid grid-cols-2 gap-4 text-center text-sm"
        >
          <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 dark:text-blue-400">HIPAA Compliant</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 dark:text-blue-400">AES-256 Encryption</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}