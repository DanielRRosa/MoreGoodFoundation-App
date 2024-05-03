"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTeam } from "@/database/serverStorage/Team/team.action";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@prisma/client";
import { useState } from "react";

const FormSchema = z.object({
  name: z.string({
    required_error: "Please write the name of the new workspace",
  }),
  users: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function AddNewTeamDialog({ users }: User) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      users: [],
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createTeam(data);
      setOpen(false);
    } catch (err) {
      console.error("Error submiting the form", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <Plus className="size-5" />
          Add new workspace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New workspace</DialogTitle>
          <DialogDescription className="text-base">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="full-col-flex gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl className="w-full border border-neutral rounded-md transition-all duration-300 hover:border-primary focus:border-primary">
                    <Input placeholder="Write the workspace name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="users"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base">Team Members</FormLabel>
                  <FormDescription>
                    Select all the members of the team.
                  </FormDescription>
                  {users.map((user) => (
                    <FormField
                      key={user.id}
                      control={form.control}
                      name="users"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={user.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(user.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, user.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== user.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {`${user.firstName} ${user.lastName}`}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Create Workspace
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
