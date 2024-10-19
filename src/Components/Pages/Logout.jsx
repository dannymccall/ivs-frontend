import React, { useEffect, useState } from "react";
import { clearCredentials } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function clearUser() {
      try {
        await clearCredentials("credentials");
        navigate("/");
      } catch (error) {
        console.log(error)
      }
    }

    clearUser();
  });

  return;
}
