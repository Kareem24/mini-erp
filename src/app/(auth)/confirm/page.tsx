import React from "react";

const ConfirmPage = ({
  searchParams,
}: {
  searchParams: { message?: string };
}) => {
  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-bold capitalize">confirm</h1>
          <p>{searchParams?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
