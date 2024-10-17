"use client";
import React, { useTransition } from "react";
import { ChevronDown, Plus, Pencil, Trash, Pause } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Checkbox } from "@/Components/ui/checkbox";
import { GigData } from "@/types/gig.interface";
import { toast } from "react-hot-toast";
import { deleteGig } from "@/lib/gig/actionDeleteGig";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { pauseGig } from "@/lib/gig/actionPauseGig";
import SpinnerCenterWithBlur from "../Molecules/SpinnerCenterWithBlur";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useUserInfoStore } from "@/stores/UserInfoStore";

const tabs = [
  "active",
  "pending approval",
  "draft",
  "denied",
  "paused",
] as const;

const TabStatus = {
  active: "active",
  "pending approval": "pending",
  draft: "draft",
  denied: "denied",
  paused: "paused",
} as const;

export default function ManageGigs({
  initialState: gigs,
  status,
}: {
  initialState: GigData[];
  status: string;
}) {
  const router = useRouter();
  const user = useUserInfoStore((state) => state.user);

  const [timeFilter, setTimeFilter] = React.useState("LAST 30 DAYS");
  const [selectedGigs, setSelectedGigs] = React.useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const [stateDelete, handleDeleteAction] = useFormState(deleteGig, {
    success: false,
    message: "",
  });

  const [statePause, handlePauseAction] = useFormState(pauseGig, {
    success: false,
    message: "",
  });

  const handleDelete = (...gigIds: string[]) => {
    const formData = new FormData();
    gigIds.forEach((el) => {
      formData.append("gigIds", el);
    });
    startTransition(() => {
      handleDeleteAction(formData);
    });
  };

  const handlePause = (gigId: string) => {
    const formData = new FormData();
    formData.append("gigId", gigId);
    startTransition(() => {
      handlePauseAction(formData);
    });
  };

  function handleChangeTab(tabIndex: number) {
    const tab = TabStatus[tabs[tabIndex]];
    startTransition(() => {
      router.push(`/${user?.username}/manage_gigs?status=${tab}`);
    });
  }

  function handleSelectedGig(...indexes: string[]) {
    if (indexes.length === 1) {
      const alreadyExist = selectedGigs.includes(indexes[0]);
      if (alreadyExist) {
        const selected = selectedGigs.filter((id) => id !== indexes[0]);
        setSelectedGigs(selected);
        return;
      }
    } else {
      const allSelected = indexes.every((id) => selectedGigs.includes(id));
      if (allSelected) {
        const selected = selectedGigs.filter((id) => !indexes.includes(id));
        setSelectedGigs(selected);
        return;
      }
    }
    const selected = [...selectedGigs, ...indexes];
    setSelectedGigs(selected);
  }

  React.useEffect(() => {
    if (stateDelete?.success) {
      toast.success("Gig deleted successfully");
    } else if (stateDelete?.message) {
      toast.error(stateDelete?.message || "Something went wrong");
    } else if (statePause?.success) {
      toast.success("Gig paused successfully");
    } else if (statePause?.message) {
      toast.error(statePause.message || "Something went wrong");
    }
  }, [stateDelete, statePause]);

  return (
    <div className="container mx-auto max-w-[1450px] p-4">
      {isPending && <SpinnerCenterWithBlur />}
      <Card className="rounded-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between">
            <div className="mb-2 flex flex-wrap gap-2 sm:mb-0">
              {tabs.map((tab, index) => (
                <Button
                  key={tab}
                  variant={status === TabStatus[tab] ? "default" : "secondary"}
                  onClick={() => handleChangeTab(index)}
                  className="text-sm"
                >
                  {tab.toUpperCase()}
                  {status === TabStatus[tab] && (
                    <span className="ml-1 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                      {gigs.length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => router.push("/manage_gigs/new")}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              CREATE A NEW GIG
            </Button>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">DRAFT GIGS</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    {timeFilter} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {["LAST 30 DAYS", "LAST 60 DAYS", "LAST 90 DAYS"].map(
                    (filter) => (
                      <DropdownMenuItem
                        key={filter}
                        onSelect={() => setTimeFilter(filter)}
                      >
                        {filter}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <Checkbox
                        onClick={() =>
                          handleSelectedGig(...gigs.map((gig) => gig.id))
                        }
                        id={`all-gigs`}
                      />
                    </TableHead>
                    <TableHead className="w-[300px]">GIG</TableHead>
                    <TableHead>IMPRESSIONS</TableHead>
                    <TableHead>CLICKS</TableHead>
                    <TableHead>ORDERS</TableHead>
                    <TableHead>CANCELLATIONS</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gigs.map((gig, index: number) => (
                    <TableRow key={gig.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedGigs.includes(gig.id)}
                            onClick={() => handleSelectedGig(gig.id)}
                            id={`gig-${gig.id}`}
                          />
                          <div className="max-w-16">
                            <img
                              src={
                                gig.imageUrls.length > 0
                                  ? gig.imageUrls[0]
                                  : "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small_2x/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg"
                              }
                            />
                          </div>
                          <label htmlFor={`gig-${gig.id}`}>{gig.title}</label>
                        </div>
                      </TableCell>
                      <TableCell>{gig.impressions}</TableCell>
                      <TableCell>{gig.clicks}</TableCell>
                      <TableCell>{gig.orders}</TableCell>
                      <TableCell>{gig.cancellations}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/${user?.username}/manage_gigs/${gig.id}/edit?wizard=1`,
                                )
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(gig.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handlePause(gig.id)}
                            >
                              <Pause className="mr-2 h-4 w-4" />
                              <span>Pause</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
