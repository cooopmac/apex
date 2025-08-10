"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

export default function AppInit() {
  const { isLoaded, isSignedIn } = useAuth();
  const ensureUserRecord = useMutation(api.users.ensureUserRecord);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return; // Wait until Clerk is ready
    ensureUserRecord();
  }, [isLoaded, isSignedIn, ensureUserRecord]);

  return null;
}
