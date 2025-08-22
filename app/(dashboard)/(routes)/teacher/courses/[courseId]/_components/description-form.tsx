"use client";

import {z} from "zod";
import axios from "axios";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/useToast";
import {Button} from "@/components/ui/button";
import {Loader2, Pencil, X} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Textarea} from "@/components/ui/textarea";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";

interface DescriptionFormProps {
    initialData: {
        description: string;
    };
    courseId: string;
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

export const DescriptionForm = ({initialData, courseId}: DescriptionFormProps) => {
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
                    "Course description updated successfully",
                    "success"
                );
                setIsEditing(false);
            } else {
                showToast(
                    "Error",
                    "Failed to update course description",
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
                Course Description
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
                                name={"description"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                disabled={isSubmitting}
                                                placeholder={"e.g. 'This course will help you...'"}
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
                    <p className={cn(
                        "text-sm text-slate-700",
                        !initialData.description && "text-gray-400 text-sm italic"
                    )}>
                        {initialData.description || "No description provided"}
                    </p>
                )
            }
        </div>
    )
}