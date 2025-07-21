"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  ImageIcon,
  ClipboardList,
  RefreshCw,
  Star,
  UserPlus,
  BadgeCheck,
  Smile,
} from "lucide-react";

const cards = [
  {
    title: "Total Descriptions",
    value: "243",
    icon: BarChart,
    color: "text-indigo-600",
  },
  {
    title: "Images Uploaded",
    value: "157",
    icon: ImageIcon,
    color: "text-pink-500",
  },
  {
    title: "CSV Exports",
    value: "89",
    icon: ClipboardList,
    color: "text-green-500",
  },
  {
    title: "Rephrases",
    value: "61",
    icon: RefreshCw,
    color: "text-yellow-500",
  },
  // 💡 New cards with actual business value
  {
    title: "⭐️ Rate Last Output",
    value: "Give Feedback",
    icon: Star,
    color: "text-purple-600",
  },
  {
    title: "👥 Invite & Earn",
    value: "Share Now",
    icon: UserPlus,
    color: "text-orange-500",
  },
  {
    title: "Top Seller Badge",
    value: "Level 2",
    icon: BadgeCheck,
    color: "text-blue-500",
  },
  {
    title: "Feedback Collected",
    value: "37",
    icon: Smile,
    color: "text-emerald-500",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, value, icon: Icon, color }, idx) => (
        <Card
          key={idx}
          className="shadow-md border bg-white/60 backdrop-blur-md transition-all hover:scale-[1.02] hover:shadow-lg hover:border-indigo-500/30"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className={`w-5 h-5 ${color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
