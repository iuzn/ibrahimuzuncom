import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="w-full bottom-0 text-center text-sm p-4 mt-8">
      © {new Date().getFullYear()} · İbrahim Uzun {" "}
    </div>
  );
};
