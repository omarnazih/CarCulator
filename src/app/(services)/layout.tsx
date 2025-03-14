
import { SideBar } from "@/components/side-bar";


export default function ServicesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen">
            <SideBar />
            <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
    );
}
