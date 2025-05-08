import { GasStation, GasStationFormData } from "@/types/gas-station";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

interface GasStationFormProps {
    formData: GasStationFormData;
    setFormData: (data: GasStationFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    isUpdate?: boolean;
    isDialog?: boolean;
    isOpen?: boolean;
}

export function GasStationForm({
    formData,
    setFormData,
    onSubmit,
    onCancel,
    isUpdate = false,
    isDialog = false,
    isOpen = false
}: GasStationFormProps) {
    const FormContent = (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Station Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="reliability">Reliability (1-5)</Label>
                <Input
                    id="reliability"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.reliability}
                    onChange={(e) => setFormData({ ...formData, reliability: Number(e.target.value) })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="status">Status</Label>
                <Select
                    value={formData.status}
                    onValueChange={(value: GasStation['status']) => setFormData({ ...formData, status: value })}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="bad">Bad</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="issues">Issues (one per line)</Label>
                <Textarea
                    id="issues"
                    value={formData.issues.join('\n')}
                    onChange={(e) => setFormData({ ...formData, issues: e.target.value.split('\n').filter(Boolean) })}
                />
            </div>

            <div className="flex gap-2">
                <Button type="submit">{isUpdate ? 'Update' : 'Save'}</Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );

    if (isDialog) {
        return (
            <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{isUpdate ? 'Update' : 'Add'} Gas Station</DialogTitle>
                        <DialogDescription>
                            {isUpdate
                                ? 'Update the gas station information and status below.'
                                : 'Fill in the details to add a new gas station.'}
                        </DialogDescription>
                    </DialogHeader>
                    {FormContent}
                </DialogContent>
            </Dialog>
        );
    }

    return FormContent;
} 