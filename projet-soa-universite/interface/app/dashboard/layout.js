import Sidebar from "@/components/side-bar";

export default function DashboardLayout({children}){
    return <main className="dashboard-layout">
        <Sidebar/>
        {children}
    </main>
}