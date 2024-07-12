"use client";

import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchBotDetailsWrapper as fetchBotDetails } from "@/lib/axios";
import { baasApiKeyAtom, meetingsAtom, serverAvailablityAtom } from "@/store";

import axios from "axios";
import { useAtom } from "jotai";
import { CopyIcon, EyeIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
// import { ImportMeeting } from "./import-meeting";

export type Meeting = {
  id: string;
  name: string;
  bot_id: string;
  attendees: string[];
  createdAt: Date;
};

export const columns: (
  deleteMeeting: (id: string) => void
) => ColumnDef<Meeting>[] = (deleteMeeting) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bot_id",
    header: "Bot ID",
    cell: ({ row }) => <div>{row.getValue("bot_id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "attendees",
    header: () => "Attendees",
    cell: ({ row }) => {
      let attendees: string[] = row.getValue("attendees") || [];

      return (
        <div className="text-right font-medium flex gap-2">
          {attendees.map((attendee) => (
            <Badge key={attendee}>{attendee}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return <div className="font-medium">Invalid Date</div>;
      }
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const meeting = row.original;

      return (
        <div className="flex items-center justify-end gap-2 w-fit">
          <Button size="icon" asChild className="h-8 w-8 p-0">
            <Link to={`/meeting/${meeting.bot_id}`}>
              <EyeIcon className="w-4 h-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(meeting.bot_id)}
              >
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy Bot ID
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-red-500/30 text-red-500 focus:bg-red-500/50 focus:text-red-600"
                onClick={() => deleteMeeting(meeting.id)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function MeetingTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<Meeting[]>([]);
  const [meetings] = useAtom(meetingsAtom);

  // meeting will update on state change
  const [baasApiKey] = useAtom(baasApiKeyAtom);
  const [serverAvailability] = useAtom(serverAvailablityAtom);

  const table = useReactTable({
    data,
    columns: columns(deleteMeeting),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  async function fetchData() {
    setIsLoading(true);
    try {
      const meetingDetails = await Promise.all(
        meetings.map(async (meeting) => {
          try {
            const result = await fetchBotDetails({
              botId: meeting.bot_id,
              baasApiKey: baasApiKey,
              serverAvailablity: serverAvailability,
            });

            // if ("error" in result) {
            //   throw new Error(result.error);
            // }

            return {
              id: meeting.bot_id,
              name: result.data.name || "Unnamed Meeting",
              bot_id: meeting.bot_id,
              attendees: result.data.attendees || [],
              createdAt: new Date(result.data.createdAt),
            };
          } catch (error) {
            console.error(
              `Error fetching details for bot ${meeting.bot_id}:`,
              error
            );
            return {
              id: meeting.bot_id,
              name: "Unnamed Meeting",
              bot_id: meeting.bot_id,
              attendees: meeting.attendees || [],
              createdAt: new Date(meeting.createdAt),
            };
          }
        })
      );

      setData(
        meetingDetails.filter((meeting): meeting is Meeting => meeting !== null)
      );
    } catch (error) {
      console.error("Error fetching meeting details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteMeeting(botId: string) {
    try {
      await axios.delete(`/api/meeting/${botId}`);
      fetchData();

      toast.success("Successfully deleted meeting.");
    } catch (error) {
      console.error("error", error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [meetings, baasApiKey, serverAvailability]);

  return (
    <div className="w-full sm:min-h-[50dvh] sm:max-h-[50dvh]">
      {data.length > 0 ? (
        <>
          <div className="flex items-center pb-4 gap-2">
            {/* TODO: implement search module connectivity here */}
            <Input
              placeholder="Filter Bot Id..."
              value={
                (table.getColumn("bot_id")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("bot_id")?.setFilterValue(event.target.value)
              }
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border flex-grow overflow-auto sm:max-h-[calc(60dvh)]">
            <div className="rounded-md border flex-grow overflow-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p>{isLoading ? "Loading..." : "No results."}</p>
      )}
    </div>
  );
}

export default MeetingTable;