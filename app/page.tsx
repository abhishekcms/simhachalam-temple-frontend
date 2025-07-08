"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, ArrowUpToLine, Cctv, Users } from "lucide-react";
import HourlyPeopleChart from "./HourlyPeopleChart";
import { formatNumber } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch(process.env.API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json(); // parse JSON
      })
      .then((json) => {
        setData(json); // set data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // set error
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-center items-center p-4 pt-6">
        <img src="./cms-logo-horiz.png" alt="CMS" className="h-8 w-auto mr-3" />
        <h1 className="text-xl font-semibold">Smart Surveillance</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
        <div className="col-span-7">
          <Card className="h-[500px] shadow-none p-0">
            <CardContent className="flex items-center justify-center h-full p-0">
              <img
                src={process.env.NEXT_PUBLIC_FEED_URL}
                alt="Camera Stream"
                className="rounded-lg w-full h-full object-cover"
              />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <StatsCard
              icon={<ArrowDownToLine className="w-5" />}
              title="People In"
              value={25050}
            />
            <StatsCard
              icon={<ArrowUpToLine className="w-5" />}
              title="People Out"
              value="100"
            />
            <StatsCard
              icon={<Users className="w-5" />}
              title="Current Occupancy"
              value="100"
            />
            <StatusCard isOnline />
          </div>
          <HourlyPeopleChart />
        </div>
      </main>
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
              <h2 className="text-3xl font-bold">{formatNumber(value)}</h2>
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
