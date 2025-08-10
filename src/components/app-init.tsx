"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

export default function AppInit() {
  const { isLoaded, isSignedIn } = useAuth();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return; // Wait until Clerk is ready
    createUser();
  }, [isLoaded, isSignedIn, createUser]);

  return null;
}
