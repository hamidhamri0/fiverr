"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { post } from "@/lib/utils/customFetch";
import moment from "moment-timezone";
import { useUserInfoStore } from "@/stores/UserInfoStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 words")
    .refine(
      (value) => value.trim().split(/\s+/).length >= 10,
      "Description must be at least 10 words",
    ),
  communicationDays: z.object({
    start: z.string().min(1, "Start day is required"),
    end: z.string().min(1, "End day is required"),
  }),
  communicationHours: z.object({
    start: z.string().min(1, "Start time is required"),
    end: z.string().min(1, "End time is required"),
  }),
  language: z.string().min(1, "Language is required"),
  proficiency: z.string().min(1, "Proficiency is required"),
});

type FormValues = z.infer<typeof formSchema>;

const timeOptions = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`,
);
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function WelcomeModal() {
  const router = useRouter();
  const user = useUserInfoStore((state) => state.user);
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    setTimezone(moment.tz.guess());
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      communicationDays: { start: "", end: "" },
      communicationHours: { start: "", end: "" },
      language: "",
      proficiency: "",
    },
  });

  const handleNext = () => {
    form.trigger(["name", "description"]).then((isValid) => {
      if (isValid) {
        setStep(2);
      }
    });
  };

  const handleBack = () => {
    setStep(1);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await Promise.all([
        await post("/user/preferences", {
          startTime: data.communicationHours.start,
          endTime: data.communicationHours.end,
          timezone: timezone,
          startDay: days.indexOf(data.communicationDays.start),
          endDay: days.indexOf(data.communicationDays.start),
        }),
        await post("/user/updateUserInfo", {
          name: data.name,
          description: data.description,
        }),
      ]);
      toast.success("Profile updated successfully.");
      router.refresh();
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="mx-auto max-w-[700px] rounded-lg sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please fill out this form to complete your profile. This information
            will help personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How would you like to be called?</FormLabel>
                      <FormControl>
                        <Input placeholder="John D." {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-muted-foreground text-xs">
                        We suggest using your first name and first initial of
                        your last name, starting with a capital letter for each.
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tell us more about yourself and why you joined
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short description to introduce yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-muted-foreground text-xs">
                        {field.value.trim().split(/\s+/).length}/10 words
                        minimum
                      </p>
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <FormLabel>
                    When do you prefer to communicate with freelancers?
                  </FormLabel>
                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name="communicationDays.start"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Start day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {days.map((day) => (
                                <SelectItem key={day} value={day}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="communicationDays.end"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="End day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {days.map((day) => (
                                <SelectItem key={day} value={day}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormLabel>Choose your preferred hours</FormLabel>
                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name="communicationHours.start"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Start time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions.map((i) => (
                                <SelectItem key={i} value={i}>
                                  {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="communicationHours.end"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="End time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[...Array(24)].map((_, i) => (
                                <SelectItem
                                  key={i}
                                  value={`${i}:00`}
                                >{`${i}:00`}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which languages do you speak?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "English",
                            "Spanish",
                            "French",
                            "German",
                            "Chinese",
                          ].map((lang) => (
                            <SelectItem
                              key={lang.toLowerCase()}
                              value={lang.toLowerCase()}
                            >
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="proficiency"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Proficiency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "Beginner",
                              "Intermediate",
                              "Advanced",
                              "Native",
                            ].map((level) => (
                              <SelectItem
                                key={level.toLowerCase()}
                                value={level.toLowerCase()}
                              >
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" onClick={handleBack} variant="outline">
                  Back
                </Button>
              )}
              {step < 2 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
