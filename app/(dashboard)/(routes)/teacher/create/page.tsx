"use client";

import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {useToast} from "@/hooks/useToast";
import {useRouter} from "next/navigation";
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


const createCourseSchema = z.object({
    title: z.string().min(1, "Title is required"),
});

const CreatePage = () => {
    const router = useRouter();
    const { showToast } = useToast();
    const form = useForm<z.infer<typeof createCourseSchema>>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: ""
        }
    })
    const {isSubmitting, isValid} = form.formState;
    const onSubmit = (values: z.infer<typeof createCourseSchema>) => {
        try {
             const response = axios.post("/api/courses", values);
             router.push(`/teacher/courses/${response.data.id}`);
        } catch (error) {
            showToast(
                "Error",
                error instanceof Error ? error.message : "An unexpected error occurred",
                "error"
            );
        }
    }
    return (
        <div className={"max-w-5xl mx-auto flex md:items-center md:justify-center h-full"}>
            <div>
                <h1 className={"text-2xl"}>Name your course.</h1>
                <p className={"text-sm text-slate-600"}>What would you like the name of your course? Don&apos;t worry, you can change this later.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 'Java Spring Boot'" {...field} className={"rounded-xs shadow-none focus:shadow-none focus-visible:ring-0 focus-visible:outline-0"} />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className={"flex items-center gap-x-2"}>
                            <Link href={"/"}>
                                <Button
                                    type={"button"}
                                    variant={"secondary"}
                                    className={"bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 px-4 py-2 rounded-xs"}
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                variant={"secondary"}
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className={"bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-600 px-4 py-2 rounded-xs"}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreatePage;