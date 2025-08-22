"use client";

import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/useToast";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2, Pencil, X} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import axios from "axios";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

export const TitleForm = ({initialData, courseId}: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const {showToast} = useToast();

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const {isSubmitting, isValid} = form.formState;
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        try {
            const response = axios.patch(`/api/courses/${courseId}`, data);
            if (response.ok) {
                showToast(
                    "Success",
                    "Course title updated successfully",
                    "success"
                );
                setIsEditing(false);
            } else {
                showToast(
                    "Error",
                    "Failed to update course title",
                    "error"
                );
            }
        } catch (error) {
            showToast(
                "Error",
                error instanceof Error ? error.message : "An unexpected error occurred",
                "error"
            );
        }

    }
    return (
        <div className={"mt-6 border border-slate-100 p-4 rounded-xs"}>
            <div className={"font-medium flex items-center justify-between"}>
                Course Title
                <Button className={"bg-transparent hover:bg-transparent p-0 shadow-none rounded-none"}
                        onClick={toggleEdit}>
                    {isEditing ? (
                        <X className={"size-5 text-red-500 hover:text-red-600"}/>
                    ) : (
                        <Pencil className={"size-5 text-blue-500 hover:text-blue-600"}/>
                    )}
                </Button>
            </div>
            {
                isEditing ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-2 mt-4"}>
                            <FormField
                                control={form.control}
                                name={"title"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder={"e.g. 'Java Spring Boot'"}
                                                className={"w-full shadow-none rounded-xs focus:shadow-none focus-visible:shadow-none focus:outline-0 focus-visible:outline-0 focus:ring-0 focus-visible:ring-0"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className={"flex items-center justify-end gap-x-2"}>
                                <Button type={"submit"} disabled={!isValid || isSubmitting}
                                        className={"bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-600 rounded-xs px-6 py-1 shadow-none"}>
                                    {
                                        isSubmitting ? (
                                            <div className={"flex items-center"}>
                                                <Loader2 className={"size-4 animate-spin"} />
                                                Saving
                                            </div>
                                        ) : (
                                            "Save"
                                        )
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <p className={"text-sm text-slate-700"}>
                        {initialData.title}
                    </p>
                )
            }
        </div>
    )
}