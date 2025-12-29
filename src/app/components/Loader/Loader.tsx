export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
      <div className="relative w-14 h-14">
        
        <span className="absolute inset-0 border-50% border-white animate-spinSlow 
                         shadow-[0_0_10px_#fff] rounded-sm" />

    
        <span className="absolute inset-1 border-50% border-[#FF3D00] animate-spinFast 
                         shadow-[0_0_15px_#FF3D00] rounded-sm scale-105" />
      </div>
    </div>
  );
};
