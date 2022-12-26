import React, { useState, useEffect } from "react";
export default function DateTimeNow() {
  const [dateState, setDateState] = useState(null);
  useEffect(() => {
    setInterval(
      () =>
        setDateState(
          new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            second: "2-digit",
          })
        ),
      1000
    );
  }, [dateState]);
  return <>{dateState}</>;
}
