"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import Link from 'next/link';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea, } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle, } from "@/components/ui/item";
import { Trash } from "lucide-react";

import React, { useEffect, useState } from 'react';

const monitorSchema = z.object({
    name: z.string().min(1, "Monitor name is required"),
    url: z.url("Enter a valid URL"),
    method: z.enum(["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]),
});

export default () => {
    const [open, setOpen] = useState(false);
    const [monitors, setMonitors] = useState([]);


    type MonitorForm = z.infer<typeof monitorSchema>;

    const form = useForm<MonitorForm>({
        resolver: zodResolver(monitorSchema),
        defaultValues: { name: "", url: "", method: "GET" },
    });

    async function onSubmit(values: MonitorForm) {
        try {
            const res = await fetch("/api/monitors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error("Failed to create monitor");
            toast.success("Monitor created successfully!");
            setOpen(false);
            form.reset();
        } catch (e) {
            toast.error(e.message);
        }

        try {
            setMonitors((await (await fetch("/api/monitors")).json()).monitors ?? []);
        } catch (e) {
            location.reload();
        }
    }

    // const monitors = [
    //     {
    //         name: "test",
    //         url: "https://argv.nl",
    //         status: false
    //     },
    //     {
    //         name: "test2",
    //         url: "https://example.com",
    //         status: true
    //     },
    // ];


    useEffect(() => {
        (async () => {
            setMonitors((await (await fetch("/api/monitors")).json()).monitors ?? []);
        })();
    }, []);

    async function deleteMonitor(index: number) {
        try {
            const res = await fetch("/api/monitors", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: `${index}`,
            });
            if (!res.ok) throw new Error("Failed to create monitor");
            toast.success("Monitor removed successfully!");
            setOpen(false);
            form.reset();
        } catch (e) {
            toast.error(e.message);
        }

        try {
            setMonitors((await (await fetch("/api/monitors")).json()).monitors ?? []);
        } catch (e) {
            location.reload();
        }
    }

    return (
        <div className="flex justify-center min-w-screen">

            <div className="max-h-screen overflow-y-auto flex">
                <ItemGroup>
                    {monitors.map((monitor, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Item className={`max-w-md w-screen ${monitor.status ? "bg-green-100" : "bg-red-200"}`}>
                                    <ItemContent>
                                        <ItemTitle>{monitor.name}</ItemTitle>
                                        <ItemDescription>{monitor.url}</ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button size="icon" className="rounded-full hover:bg-red-700" onClick={() => deleteMonitor(index)}>
                                            <Trash />
                                        </Button>
                                    </ItemActions>
                                </Item>
                            </React.Fragment>
                        );
                    })}
                    <a className="pb-10"></a>
                </ItemGroup>
            </div>

            <div onClick={() => toast.dismiss()}><Toaster /></div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="fixed right-3 bottom-3">Create new monitor</Button>
                </DialogTrigger>
                <DialogContent className="w-full sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Configure monitor</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="monitor-name">
                                    Monitor name
                                </FieldLabel>
                                <Input
                                    id="monitor-name"
                                    placeholder="Personal website"
                                    autoComplete="off"
                                    {...form.register("name")}
                                />
                            </Field>
                            <Field className="flex flex-row">
                                <Select value={form.watch("method")} onValueChange={(value) => form.setValue("method", value as MonitorForm["method"])}>
                                    <SelectTrigger className="flex-1" id="monitor-method">
                                        <SelectValue placeholder="Select a HTTP Method"
                                            {...form.register("method")}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>HTTP Method</SelectLabel>
                                            <SelectItem value="HEAD">HEAD</SelectItem>
                                            <SelectItem value="GET">GET</SelectItem>
                                            <SelectItem value="POST">POST</SelectItem>
                                            <SelectItem value="PUT">PUT</SelectItem>
                                            <SelectItem value="PATCH">PATCH</SelectItem>
                                            <SelectItem value="DELETE">DELETE</SelectItem>
                                            <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Input
                                    id="monitor-url"
                                    placeholder="https://example.com"
                                    autoComplete="off"
                                    {...form.register("url")}
                                />
                            </Field>
                        </FieldGroup>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create monitor</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};