import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="bg-bgColor w-full text-[#fff]">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <SidebarTrigger />
              <div className=" min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                
                {children}
              </div>
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
