import {Layers} from "lucide-react";
import {IconBadge} from "@/components/icon-badge";
import {TitleForm} from "@/app/(dashboard)/_components/title-form";

const CourseIdPage = async (
    { params }: { params: Promise<{ courseId: string }> }
) => {
    const { courseId } = await params;
    const course = {
        id: courseId,
        title: "Course Title",
        description: "Course Description",
    };
    return (
        <div>
            <div className={"flex items-center justify-between"}>
                <div className={"flex flex-col gap-y-2"}>
                    <h1 className={"text-2xl font-medium"}>Course Setup</h1>
                    <span className={"text-sm text-gray-500"}>
                        Complete all fields to create a course.
                    </span>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"}>
                <div>
                    <div className={"flex items-center gap-x-2"}>
                        <IconBadge icon={Layers} size={"lg"} />
                        <h2 className={"text-lg"}>Customize your course.</h2>
                    </div>
                    <TitleForm initialData={course} courseId={courseId} />
                </div>
            </div>
        </div>
    )
}

export default CourseIdPage;