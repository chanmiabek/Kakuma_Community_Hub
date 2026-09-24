"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function ApplyButton({ opportunityId, applyUrl }: { opportunityId: string; applyUrl?: string | null }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  if (applyUrl) {
    return (
      <Button asChild className="w-full">
        <a href={applyUrl} target="_blank" rel="noreferrer">Apply externally</a>
      </Button>
    );
  }

  async function submit() {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/opportunities/${opportunityId}`);
      return;
    }
    setLoading(true);
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId, coverLetter }),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      toast.error(d?.error ?? "Failed to apply");
      return;
    }
    toast.success("Application submitted");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Apply now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Apply for this opportunity</DialogTitle></DialogHeader>
        <Textarea
          rows={8}
          placeholder="Write a short cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
        <Button onClick={submit} disabled={loading}>
          {loading ? "Submitting..." : "Submit application"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}