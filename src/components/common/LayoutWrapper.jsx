"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const hideLayout = pathname === "/payment-success" || pathname === "/payment-failure";
    const hideFooter = pathname.startsWith("/book-tickets");


    return (
        <>
            {!hideLayout && <Header />}
            <main className={!hideLayout ? "pt-[82px]" : ""}>
                {children}
            </main>
            {!hideLayout && !hideFooter && <Footer />}
        </>
    );
}