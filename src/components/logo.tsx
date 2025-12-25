import { cn } from "@/lib/utils";
import { Leaf, Plus } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-6 w-6", className)}>
      <Plus className="h-6 w-6 text-current" />
      <Leaf className="absolute -bottom-1 -right-1 h-4 w-4 text-current" />
    </div>
  );
}
