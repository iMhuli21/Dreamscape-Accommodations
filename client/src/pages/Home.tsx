import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="grid grid-flow-row gap-4 relative">
      <Header />
      <Categories />
      <Footer />
    </div>
  );
}
