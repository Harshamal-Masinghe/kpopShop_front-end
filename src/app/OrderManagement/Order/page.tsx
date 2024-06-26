"use client";

import React from "react";
import SearchBar from "@/components/orderManagement/searchbar";
import Card from "@/components/orderManagement/card";
import Navbar from "@/components/common/navbar";
import { MdCloudDone } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import Link from "next/link";

const Orders: React.FC = () => {
  interface TableData {
    orderId: string;
    customerId: string;
    productId: string;
    productQty: string;
    adress: string;
    date: string;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-[90px] ml-[320px]">
        <SearchBar
          title="Search "
          onSearch={function (query: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="flex justify-start mt-[20px] gap-4">
          <Card icon={<MdCloudDone />} title="Total Order " value={"234"} />
          <Card icon={<MdPendingActions />} title="Pending Order" value={"4"} />
        </div>
        <div className="flex justify-end">
          <Link href="/OrderForm">
            <button className="bg-purple-400 hover:bg-fuchsia-800 text-black hover:text-white font-bold py-2 px-4  mr-[20px] rounded">
              Add Orders
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-[20px] mr-[20px] ">
          <div className="max-h-[350px] overflow-y-auto">
            <table className="w-full table-auto ">
              <thead>
                <tr className="h-12">
                  {[
                    "Order ID",
                    "Customer ID",
                    "Product ID",
                    "Product Qty",
                    "Address",
                    "Date",
                  ].map((header, index) => (
                    <th key={index} className="sticky top-0 bg-fuchsia-800">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="h-12 text-center bg-zinc-300 text-black">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
