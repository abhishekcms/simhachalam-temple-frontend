"use client";

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HourlyPeopleChart = () => {
  const data = {
    labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"],
    datasets: [
      {
        label: "In",
        data: [5, 8, 10, 12, 9, 7, 6],
        backgroundColor: "#2563eb",
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
        barThickness: 20,
      },
      {
        label: "Out",
        data: [2, 3, 5, 6, 4, 3, 2],
        backgroundColor: "#93c5fd",
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
          usePointStyle: false,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="shadow-none py-4">
      <CardContent className="h-full text-left space-y-4">
        <div className="w-full max-w-4xl mx-auto">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyPeopleChart;
