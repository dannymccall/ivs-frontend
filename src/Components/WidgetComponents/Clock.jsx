import React, { useEffect, useState, useTransition } from "react";

export default function useClock() {
  const [greet, setGreet] = useState("");
  const [isPending, startTransision] = useTransition()
  const greeting = () => {
    setInterval(() => {
      let currentTime = new Date();

      let hours = currentTime.getHours();
      if (hours < 12) startTransision(() => setGreet("Good morning admin"));
      else if (hours >= 12 && hours < 17)  startTransision(() => setGreet("Good afternoon admin"));
      else if (hours >= 17) startTransision(() => setGreet("Good evening admin"));
    }, 1000);
  };

  useEffect(() => {
    greeting();
  },[greet]);
  return greet;
}
