import React, { useEffect, useState } from "react";

export default function useClock() {
  const [greet, setGreet] = useState("");
  const greeting = () => {
    setInterval(() => {
      let currentTime = new Date();

      let hours = currentTime.getHours();
      if (hours < 12) setGreet("Good morning");
      else if (hours >= 12 && hours < 17) setGreet("Good Afternoon");
      else if (hours >= 17) setGreet("Good evening");
    }, 1000);
  };

  useEffect(() => {
    greeting();
  });
  return greet;
}
