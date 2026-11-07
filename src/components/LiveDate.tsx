"use client";

const LiveDate = () => {
    const date = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

    return <>{date}</>;
};

export default LiveDate;