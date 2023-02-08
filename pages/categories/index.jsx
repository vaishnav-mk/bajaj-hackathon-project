import useSWR from "swr";
import fetcher from "/lib/fetcher";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from "/components/Loading";
export default function Home() {
  const { error, data } = useSWR("/api/categories", fetcher);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const url = `/api/categories`;
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setCategoryData(json);
    };
    fetchData();
  }, []);

  if (!data) return <Loading />;
  if (error) return <div>error...</div>;

  return (
    <div className="m-16 min-h-screen">
      <div className="btn font-bold text-3xl text-white gap-2">
        <span className="text-fuchsia-500">{data.length}</span> Health Categories
      </div>
      <div className="divider"></div>

      <div className="grid grid-cols-4 gap-10 mt-5">
        {categoryData?.map((category, index) => (
          <div
            key={index}
            className="shadow-md rounded-md p-5 backdrop-blur-sm bg-white/10"
          >
            <div className="font-bold uppercase text-center text-3xl">
              {category.id == "pcod"
                ? "women's health"
                : category.id.replaceAll("-", " ")}
            </div>
            <div className="divider"></div>
            <div className="btn-group btn-group-vertical w-full">
              <a
                href={`/categories/${category.id}`}
                className="btn bg-[#1C79BE] w-full font-bold text-xl gap-2 hover:bg-info rounded-md justify-between"
              >
                Articles
                <div className="badge rounded-md">
                  {category.articlesLength} articles
                </div>
              </a>

              <a
                href={`/categories/${category.id}/faqs`}
                className="btn bg-[#5C2D90] w-full font-bold text-xl gap-2 rounded-md justify-between"
              >
                FAQs
                <div className="badge rounded-md">
                  {category.articlesLength * 3} FAQs
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
