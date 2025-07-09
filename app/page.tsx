"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownToLine, Cctv, Clock2, Users, WifiOff } from "lucide-react";
import HourlyPeopleChart from "./HourlyPeopleChart";
import { formatNumber } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<any>(0);

  const fetchLiveCount = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/live_count`, {
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
        if (json.status === "success" && json.data) {
          setData(json.data);
        } else {
          console.log("server error");
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTotalCount = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/total_in_count`, {
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
        if (json.status === "success" && json.total_in) {
          setTotalCount(json.total_in);
        } else {
          console.log("server error");
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLiveCount();
    const interval = setInterval(fetchLiveCount, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchTotalCount();
    const interval = setInterval(fetchTotalCount, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return (
      <div className="flex justfy-center items-center p-6">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-center items-center gap-4 p-2">
        <img src="./logo2.png" alt="" className="h-12 w-auto" />
        <h1 className="text-xl font-semibold">
          Greater Vishakhapatnam Municipal Corporation
        </h1>
        <img src="./temple.jpg" alt="" className="h-12 w-auto" />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
        <div className="col-span-7">
          <Card className="h-full shadow-none p-0">
            <CardContent className="flex items-center justify-center h-full p-0">
              {data?.camera_status === "online" ? (
                <img
                  src={process.env.NEXT_PUBLIC_FEED_URL}
                  alt="Camera Stream"
                  className="rounded-lg w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <WifiOff className="w-10 text-gray-600" />
                  <div className="text-gray-600">Internet or power failure</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <StatusCard isOnline={data?.camera_status === "online"} />
            <StatsCard
              icon={<ArrowDownToLine className="w-5" />}
              title="Live Count"
              value={data?.in}
            />
            {/* <StatsCard
              icon={<ArrowUpToLine className="w-5" />}
              title="People Out"
              value="0"
            /> */}
            <StatsCard
              icon={<Clock2 className="w-5" />}
              title="Current Time"
              value={data?.time}
            />
            <StatsCard
              icon={<Users className="w-5" />}
              title="Total Devotees"
              value={totalCount}
            />
          </div>
          <HourlyPeopleChart />
        </div>
      </main>

      <footer className="flex justify-center items-center gap-4 pt-1 pb-4">
        <img src="./cms-logo-horiz.png" alt="CMS" className="h-6 w-auto" />
        <div className="text-sm text-gray-600">Powered by CMS</div>
      </footer>
    </div>
  );
}

function StatusCard({ isOnline }: any) {
  return (
    <Card
      className={`${isOnline ? "bg-emerald-600" : "bg-rose-600"} shadow-none`}
    >
      <CardContent className="h-full text-left space-y-4">
        <div
          className={`${
            isOnline ? "bg-emerald-200" : "bg-rose-200"
          } w-10 h-10 flex justify-center items-center rounded-full`}
        >
          <Cctv className="w-5" />
        </div>
        <div>
          <h2 className="">
            <div className="flex items-center space-x-2 h-9">
              <div className="text-gray-50 text-uppercase text-base font-bold">
                {isOnline ? "ONLINE" : "OFFLINE"}
              </div>
            </div>
          </h2>
          <p
            className={`${
              isOnline ? "text-emerald-100" : "text-rose-100"
            } text-md`}
          >
            Camera Status
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCard({ icon, title, value }: any) {
  return (
    <Card className="shadow-none py-4">
      <CardContent className="h-full text-left space-y-4">
        <div className="w-10 h-10 bg-slate-200 flex justify-center items-center rounded-full">
          {icon}
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              {title === "Current Time" ? (
                <h2 className="text-2xl font-bold">{value}</h2>
              ) : (
                <h2 className="text-3xl font-bold">{formatNumber(value)}</h2>
              )}
            </TooltipTrigger>
            <TooltipContent>{value}</TooltipContent>
          </Tooltip>
          <p className="text-md text-gray-800">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCard2({ icon, title, value }: any) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex justify-start items-center space-y-6 h-full text-left">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-slate-200 flex justify-center items-center rounded-full">
            {icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{value}</h2>
            <p className="text-md text-gray-800">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
