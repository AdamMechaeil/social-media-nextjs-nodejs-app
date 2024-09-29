"use client";
import Header from "@/app/components/Header/Main";
import { PostDetail } from "@/app/components/Posts/PostDetail";
import { AuthContext } from "@/app/Context/AuthContext";
import { handler } from "@/Utils/constants";
import { useRouter } from "next/navigation";
import React, { Suspense, useContext, useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { authData } = useContext(AuthContext);
  useEffect(() => {
    handler(authData, router);
  }, []);
  return (
    <>
      <Header />
      <Suspense>
        <PostDetail />
      </Suspense>
    </>
  );
};

export default page;
