import Sidebar from "@/components/sidebar/Sidebar";
import TopNav from "@/components/topnav/TopNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex justify-start ">
        <div className="w-1/4">
          <Sidebar />
        </div>

        <div className="w-full">
          <TopNav />
          {children}
        </div>
      </div>
    </div>
  );
}
