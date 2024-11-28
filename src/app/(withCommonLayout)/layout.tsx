import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#9F826D]">
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
