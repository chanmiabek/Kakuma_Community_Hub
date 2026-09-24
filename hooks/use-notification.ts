"use client";

import { useCallback, useEffect, useState } from "react";

export type NotificationItem = {
  id: string;
  title: string;
  body: string | null;
  readAt: string | null;
  createdAt: string;
};

export function useNotifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setItems(data.notifications ?? []);
    setLoading(false);
  }, []);

  const markAllRead = useCallback(async () => {
    await fetch("/api/notifications", { method: "PATCH" });
    await refresh();
  }, [refresh]);

  useEffect(() => { refresh(); }, [refresh]);

  const unreadCount = items.filter((n) => !n.readAt).length;

  return { items, loading, unreadCount, refresh, markAllRead };
}