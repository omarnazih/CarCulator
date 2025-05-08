import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, SortAsc, Search, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterControlsProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    minReliability: number;
    setMinReliability: (value: number) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    resetFilters: () => void;
}

export function FilterControls({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    minReliability,
    setMinReliability,
    sortBy,
    setSortBy,
    resetFilters
}: FilterControlsProps) {
    return (
        <div className="mb-4 space-y-4">
            <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search stations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                    {searchTerm && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setSearchTerm("")}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <div className="p-2 space-y-2">
                            <div>
                                <Label htmlFor="status-filter">Status</Label>
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger id="status-filter">
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="good">Good</SelectItem>
                                        <SelectItem value="warning">Warning</SelectItem>
                                        <SelectItem value="bad">Bad</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="min-reliability">Min Reliability</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="min-reliability"
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value={minReliability}
                                        onChange={(e) => setMinReliability(Number(e.target.value))}
                                    />
                                    <span>{minReliability}</span>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9">
                            <SortAsc className="h-4 w-4 mr-2" />
                            Sort
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortBy("name_asc")}>
                            Name (A-Z)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("name_desc")}>
                            Name (Z-A)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("reliability_desc")}>
                            Highest Reliability
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("reliability_asc")}>
                            Lowest Reliability
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("date_desc")}>
                            Recently Checked
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm" className="h-9" onClick={resetFilters}>
                    Reset
                </Button>
            </div>

            {(statusFilter !== "all" || minReliability > 1 || searchTerm) && (
                <div className="flex flex-wrap gap-2">
                    {statusFilter !== "all" && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Status: {statusFilter}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => setStatusFilter("all")}
                            />
                        </Badge>
                    )}

                    {minReliability > 1 && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Min Rating: {minReliability}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => setMinReliability(1)}
                            />
                        </Badge>
                    )}

                    {searchTerm && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Search: {searchTerm}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => setSearchTerm("")}
                            />
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
} 