import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface SidebarItemProps {
    name: string;
    href: string;
    icon: LucideIcon
}

export const SidebarItem = (
    {name, href, icon: Icon}: SidebarItemProps,
) => {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (pathname === "/" && href === "/") ||
        pathname === href || pathname?.startsWith(`${href}/`);

    const handleClick = () => {
        router.push(href);
    }
    return (
        <button
            className={cn(
                "flex items-center text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 ",
                isActive && "text-blue-500 hover:text-blue-600 bg-sky-200/20 hover:bg-sky-200/30"
            )}
            onClick={handleClick}
        >
            <div className={"flex items-center gap-x-2 py-3"}>
                <Icon size={22} className={cn(
                    "transition-all text-slate-500 hover:text-slate-600",
                    isActive && "text-blue-500 hover:text-blue-600"
                )} />
                <span>{name}</span>
            </div>
            {isActive && (
                <div className={"border-2 ml-auto border-blue-500 h-full transition-all"}/>
            )}
        </button>
    )
}