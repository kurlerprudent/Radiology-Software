"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User, Stethoscope, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added router import

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const router = useRouter(); // Initialize router
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  interface LoginFormData {
    email: string;
    password: string;
  }

  const onSubmit: (data: LoginFormData) => Promise<void> = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful login logic
      if (selectedRole === "patient") {
        router.push("/dashboard"); // Navigate to patient dashboard
      } else if (selectedRole === "doctor") {
        router.push("/doctor-dashboard"); // Navigate to doctor dashboard
      }
      // Add admin routing if needed
      
    } catch (err) {
      setError("Invalid credentials or network error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4"
      >
        <Card className="p-8 shadow-xl rounded-2xl mt-15 bg-white dark:bg-slate-800">
          <div className="text-center mb-8">
            <div className="mb-6 flex justify-center">
              <Lock className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Secure Login</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Access your medical diagnostics portal
            </p>
          </div>

          <Tabs 
            value={selectedRole} 
            onValueChange={setSelectedRole}
            className="mb-6"
          >
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="patient">
                <User className="w-4 h-4 mr-2" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="doctor">
                <Stethoscope className="w-4 h-4 mr-2" />
                Doctor
              </TabsTrigger>
              <TabsTrigger value="admin">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                {selectedRole === "patient" ? "Patient ID/Email" : 
                 selectedRole === "doctor" ? "Medical License Email" : 
                 "Admin Email"}
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <Input
                  {...form.register("email")}
                  placeholder={
                    selectedRole === "patient" ? "patient@example.com" : 
                    selectedRole === "doctor" ? "doctor@hospital.gh" : 
                    "admin@radiodiagnos.gh"
                  }
                  className="h-12 pl-10"
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <Input
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-10 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Request access
              </Link>
            </p>
          </form>
        </Card>

        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex items-center justify-center gap-4 opacity-70"
        >
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Shield className="w-4 h-4" />
            HIPAA Compliant
          </div>
          <div className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Lock className="w-4 h-4" />
            AES-256 Encryption
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}