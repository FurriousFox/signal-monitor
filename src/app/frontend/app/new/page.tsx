// "use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea, } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";

export default () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Configure monitor</CardTitle>
                </CardHeader>

                <CardContent>
                    <form id="monitor">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="monitor-name">
                                    Monitor name
                                </FieldLabel>
                                <Input
                                    id="monitor-name"
                                    placeholder="Personal website"
                                    autoComplete="off"
                                />
                            </Field>
                            <Field className="flex flex-row">
                                <Select defaultValue="GET">
                                    <SelectTrigger className="flex-1" id="monitor-method">
                                        <SelectValue placeholder="Select a HTTP Method" />
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
                                />

                                <Button type="submit" className="flex-1">Monitor</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
