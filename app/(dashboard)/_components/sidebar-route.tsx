"use client";

import {BarChart, Compass, Layout, List} from "lucide-react";
import {SidebarItem} from "@/app/(dashboard)/_components/sidebar-item";
import {usePathname} from "next/navigation";

const studentRoutes = [
    {
        name: "Dashboard",
        href: "/",
        icon: Layout
    },
    {
        name: "Courses",
        href: "/courses",
        icon: Compass
    }
];

const teacherRoutes = [
    {
        name: "Courses",
        href: "/teacher/courses",
        icon: List
    },
    {
        name: "Analytics",
        href: "/teacher/analytics",
        icon: BarChart
    }
];

export const SidebarRoute = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : studentRoutes;
    return (
        <div className={"flex flex-col w-full"}>
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    name={route.name}
                    href={route.href}
                    icon={route.icon}
                />
            ))}
        </div>
    )
}