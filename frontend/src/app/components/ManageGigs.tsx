"use client";
import React from "react";
import { ChevronDown, Plus, Pencil, Trash, Pause } from "lucide-react";
import { Button } from "@/app/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/table";
import { Checkbox } from "@/app/components/checkbox";
import { GigData } from "@/types/gig.interface";
import { toast } from "react-hot-toast";
import { deleteGig } from "@/lib/gig/actionDeleteGig";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const tabs = [
  "ACTIVE",
  "PENDING APPROVAL",
  "REQUIRES MODIFICATION",
  "DRAFT",
  "DENIED",
  "PAUSED",
];

export default function Component({ gigs }: { gigs: GigData[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("DRAFT");
  const [timeFilter, setTimeFilter] = React.useState("LAST 30 DAYS");
  const [state, formAction] = useFormState(deleteGig, {
    success: false,
    message: "",
  });

  const handleDelete = (gigId: string) => {
    const formData = new FormData();
    formData.append("gigId", gigId);
    formAction(formData);
  };

  React.useEffect(() => {
    if (state.success) {
      toast.success("Gig deleted successfully");
    } else if (state.message) {
      toast.error(state.message || "Something went wrong");
    }
  }, [state]);

  return (
    <div className="container mx-auto max-w-[1450px] p-4">
      <Card className="rounded-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between">
            <div className="mb-2 flex flex-wrap gap-2 sm:mb-0">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "secondary"}
                  onClick={() => setActiveTab(tab)}
                  className="text-sm"
                >
                  {tab}
                  {tab === "DRAFT" && (
                    <span className="ml-1 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                      7
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
                    <TableHead className="w-[300px]">GIG</TableHead>
                    <TableHead>IMPRESSIONS</TableHead>
                    <TableHead>CLICKS</TableHead>
                    <TableHead>ORDERS</TableHead>
                    <TableHead>CANCELLATIONS</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gigs.map((gig) => (
                    <TableRow key={gig.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`gig-${gig.id}`} />
                          <div className="max-w-16">
                            <img src="/images/D1.webp" />
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
                                  `/manage_gigs/${gig.id}/edit?wizard=0`,
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
                            <DropdownMenuItem>
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
