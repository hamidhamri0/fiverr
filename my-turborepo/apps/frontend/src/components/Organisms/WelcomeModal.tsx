"use client";

import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { post } from "@/lib/utils/customFetch";
import moment from "moment-timezone";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "../Atoms/Spinner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Name is required"),
  bio: z
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
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimezone(moment.tz.guess());
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      communicationDays: { start: "", end: "" },
      communicationHours: { start: "", end: "" },
      language: "",
      proficiency: "",
    },
  });

  const handleNext = () => {
    form.trigger(["name", "bio"]).then((isValid) => {
      if (isValid) {
        setStep(2);
      }
    });
  };

  const handleBack = () => {
    setStep(1);
  };

  const onSubmit = async (dataForm: FormValues) => {
    try {
      setLoading(true);
      const data = await (
        await fetch("https://api.ipify.org?format=json")
      ).json();
      const countryData = await (
        await fetch(
          `https://api.cleantalk.org/?method_name=ip_info&ip=${data.ip}`,
        )
      ).json();
      const country = countryData?.data?.[data.ip]?.country_name;
      await Promise.all([
        await post("/user/preferences", {
          startTime: dataForm.communicationHours.start,
          endTime: dataForm.communicationHours.end,
          timezone: timezone,
          startDay: days.indexOf(dataForm.communicationDays.start),
          endDay: days.indexOf(dataForm.communicationDays.start),
        }),
        await post("/user/updateUserInfo", {
          name: dataForm.name,
          bio: dataForm.bio,
          username: dataForm.username,
          country,
        }),
      ]);
      toast.success("Profile updated successfully.");
      router.refresh();
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(
        (err as any)?.message || "An error occurred. Please try again later.",
      );
    } finally {
      setLoading(false);
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
              <Fragment>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How would you like your username to be?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="johndow" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-muted-foreground text-xs">
                        Choose a unique username for you account without spaces
                        and capital letters.
                      </p>
                    </FormItem>
                  )}
                />
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tell us more about yourself and why you joined
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short bio to introduce yourself"
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
              </Fragment>
            )}
            {step === 2 && (
              <Fragment>
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
              </Fragment>
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
                <Button type="submit">
                  {loading ? (
                    <Spinner height={8} width={8} color="fill-green-500" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
