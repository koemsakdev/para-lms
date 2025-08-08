import Link from "next/link";
import {Button} from "@/components/ui/button";

const AnalyticsPage = () => {
    return (
        <Link href={"/teacher/courses"}>
            <Button size={"sm"} variant={"secondary"}>
                Teacher Mode
            </Button>
        </Link>
    )
}
export default AnalyticsPage