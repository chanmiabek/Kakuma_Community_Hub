"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BookmarkButton({ opportunityId }: { opportunityId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/opportunities/${opportunityId}`);
      return;
    }
    setLoading(true);
    await fetch(`/api/opportunities/${opportunityId}/bookmark`, { method: "POST" });
    setLoading(false);
    toast.success("Bookmark updated");
  }

  return (
    <Button onClick={toggle} disabled={loading} variant="outline" className="w-full">
      <Bookmark className="mr-2 h-4 w-4" /> Save
    </Button>
  );
}