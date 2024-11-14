"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export type NewUserChartsProps = {
  data: {
    date: string;
    newUsersCount: number;
    canceledUsersCount: number;
  }[];
};

export const NewUserCharts = ({ data }: NewUserChartsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users course activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <Bar
              dataKey="newUsersCount"
              radius={[4, 4, 0, 0]}
              style={{
                fill: "hsl(var(--primary)/1)",
              }}
            />
            <Bar
              dataKey="cancelUsersCount"
              radius={[4, 4, 0, 0]}
              style={{
                fill: "hsl(var(--secondary)/1)",
              }}
            />
            <XAxis dataKey="date" />
            <YAxis dataKey="newUsersCount" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
