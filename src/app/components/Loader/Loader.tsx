"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <span className="absolute inset-0 border-50% border-white animate-spinSlow"></span>
      <span className="absolute inset-1 border-50% border-[#FF3D00] animate-spinFast"></span>
    </div>
  );
}
