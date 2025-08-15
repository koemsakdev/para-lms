"use client"

import Image from "next/image";
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link";
import React, {useState} from "react";

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

import {Eye, EyeOff, Loader, Loader2} from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {registerSchema} from "@/app/(auth)/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useToast} from "@/hooks/useToast";
import {useRouter} from "next/navigation";

export function RegisterForm({
       className,
       ...props
    }: React.ComponentProps<"div">) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const {showToast} = useToast();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const {isSubmitting} = form.formState;

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                showToast(
                    "Success",
                    result.message || "Signed in successfully",
                    "success"
                );
                router.push("/");
            } else {
                showToast(
                    "Error",
                    result.message || "An unexpected error occurred",
                    "error"
                )
            }
        } catch (error) {
            showToast(
                "Error",
                error instanceof Error ? error.message : "An unexpected error occurred",
                "error"
            );
        }
    };
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <Link
                                href="/"
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <Image
                                        src={"/blue-para-lms.svg"}
                                        alt="Auth Logo"
                                        width={200}
                                        height={100}
                                    />
                                </div>
                                <span className="sr-only">Para LMS</span>
                            </Link>
                            <h1 className="text-xl font-bold">Register an Account</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className={"text-sm text-center"}>Enter your information to create an account</p>
                            <div className="grid lg:grid-cols-2 gap-3">
                                <div className="grid gap-3">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <FormField
                                        name="firstName"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter your first name"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        spellCheck="false"
                                                        className="w-full shadow-none rounded-xs focus:shadow-none focus-visible:shadow-none focus:outline-0 focus-visible:outline-0 focus:ring-0 focus-visible:ring-0"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs text-red-500"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <FormField
                                        name="lastName"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter your last name"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        spellCheck="false"
                                                        className="w-full shadow-none rounded-xs focus:shadow-none focus-visible:shadow-none focus:outline-0 focus-visible:outline-0 focus:ring-0 focus-visible:ring-0"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs text-red-500"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your email"
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    spellCheck="false"
                                                    className="w-full shadow-none rounded-xs focus:shadow-none focus-visible:shadow-none focus:outline-0 focus-visible:outline-0 focus:ring-0 focus-visible:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        className="w-full pr-10 shadow-none rounded-xs focus:shadow-none focus-visible:shadow-none focus:outline-0 focus-visible:outline-0 focus:ring-0 focus-visible:ring-0"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        spellCheck="false"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 cursor-pointer shadow-none hover:bg-transparent"
                                                    >
                                                        {showPassword ? (
                                                            <Eye className="h-4 w-4"/>
                                                        ) : (
                                                            <EyeOff className="h-4 w-4"/>
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full rounded-xs shadow-none bg-blue-200 hover:bg-blue-300 text-blue-600 hover:text-blue-700">
                                {
                                    isSubmitting ? (
                                        <div className="flex items-center">
                                            <Loader size={4} className="animate-spin"/>
                                        </div>
                                    ) : (
                                        "REGISTER"
                                    )
                                }
                            </Button>
                        </div>
                        <div
                            className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">
                          Or
                        </span>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Button variant="outline" type="button" className="w-full shadow-none rounded-xs">
                                <FaGithub className="h-4 w-4" />
                                Continue with GitHub
                            </Button>
                            <Button variant="outline" type="button" className="w-full shadow-none rounded-xs">
                                <FcGoogle className="h-4 w-4" />
                                Continue with Google
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </div>
    )
}
