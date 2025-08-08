import Link from "next/link";
import {Button} from "@/components/ui/button";

const CoursePage = () => {
    return (
        <div>
            <Link href={"/teacher/create"}>
                <Button variant={"secondary"} className={"bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-600 px-4 py-2 rounded-xs"}>
                    New Course
                </Button>
            </Link>
        </div>
    )
}

export default CoursePage;