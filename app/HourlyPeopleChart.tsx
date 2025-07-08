"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HourlyPeopleChart = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/hourly_in_count`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        if (json.status === "success" && json.hourly_in) {
          setData(json.hourly_in);
        } else {
          console.log("server error");
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!data)
    return (
      <div className="flex justfy-center items-center p-6">
        <Loader />
      </div>
    );

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "People In",
        data: Object.values(data),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#2563eb",
      },
    ],
  };

  const options: any = {
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
          <Line data={chartData} options={options} className="h-[250px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyPeopleChart;
