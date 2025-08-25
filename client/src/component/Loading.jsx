import React from "react";

const Loading = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center gap-14 bg-light text-center">
      <main className="flex gap-3">
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </main>
    </section>
  );
};

export default Loading;
