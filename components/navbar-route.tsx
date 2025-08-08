"use client";

import Link from "next/link";
import {LogOut} from "lucide-react";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {UserButton} from "@/components/user-button";
export const NavbarRoute = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");
    return (
        <div className={"flex gap-x-2 ml-auto"}>
            {isPlayerPage || isTeacherPage ? (
                <Link href={"/"}>
                    <Button size={"sm"} variant={"secondary"} className={"text-red-500 hover:text-red-600 bg-red-100/20 hover:bg-red-100/30 shadow-none rounded-none"}>
                        <LogOut className={"size-4"}/>
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href={"/teacher/courses"}>
                    <Button size={"sm"} variant={"secondary"} className={"text-blue-500 hover:text-blue-600 bg-blue-100/20 hover:bg-blue-100/30 shadow-none rounded-none"}>
                        Teacher Mode
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    )
}