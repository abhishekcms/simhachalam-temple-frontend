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
import axios from "axios";
import { timestamp } from "@/lib/utils";
import { Download } from "lucide-react";

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
  const [data, setData] = useState<any>();
  // {
  //   MAR: 68,
  //   APR: 23,
  //   MAY: 89,
  //   JUN: 78,
  //   JUL: 57,
  // }
  const [isDownloading, setIsDownloading] = useState<any>(false);

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

  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/download_hourly_csv`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : `Report of Devotee Crowd at Varaha Lakshmi Narasimha Temple ${timestamp()}.csv`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.replace(/['"]/g, "");
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading the report:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "People In",
        data: Object.values(data),
        borderColor: "#2884BD", // "#2563eb",
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
    maintainAspectRatio: false,
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
        <div className="flex justify-end">
          <button
            className="absolute p-2 cursor-pointer"
            onClick={handleDownloadReport}
          >
            <Download className="w-4" />
          </button>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <Line data={chartData} options={options} className="h-[250px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyPeopleChart;
