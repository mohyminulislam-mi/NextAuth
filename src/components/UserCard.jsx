"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserCard = () => {
    const session = useSession();
  return (
    <div>
      <h1 className="font-bold">user client</h1>
      <div className="border-2 p-4 rounded">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
