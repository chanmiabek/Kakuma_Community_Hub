"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0f766e", "#14b8a6", "#5eead4", "#99f6e4", "#ccfbf1"];

export function AnalyticsCharts({
  typeData,
  statusData,
}: {
  typeData: { name: string; value: number }[];
  statusData: { name: string; value: number }[];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={typeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="value" fill="#0f766e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100} label>
              {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}