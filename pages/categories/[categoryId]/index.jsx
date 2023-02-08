import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [articleData, setArticleData] = useState([]);
  const [input, setInput] = useState("");
  const regex = new RegExp(input, "gi");

  useEffect(() => {
    if (!categoryId) return;
    const url = `/api/categories/${categoryId}`;
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setArticleData(json);
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className="m-16 min-h-screen">
      <div className="flex justify-between">
        <div className="btn font-bold text-3xl text-white gap-2">
          <span className="text-fuchsia-500">
            {
              articleData?.filter((i) => {
                if (i.includes(input)) return -1;
                return 1;
              }).length
            }{" "}
          </span>
          Articles on {categoryId?.replace("-", " ")}
        </div>
        <input
          type="text"
          placeholder="Search articles here..."
          className="input input-bordered w-full max-w-xs justify-end right-0"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div className="divider"></div>

      <div className="grid grid-cols-4 gap-10 mt-5">
        {articleData
          ?.sort((i) => {
            if (i.includes(input)) return -1;
            return 1;
          })
          .map((article, index) => (
            <Link
              key={index}
              href={`/categories/${categoryId}/article/${article.replace(
                ".json",
                ""
              )}`}
            >
              <div className="shadow-md rounded-md p-5 backdrop-blur-sm bg-white/10 h-full items-stretch">
                <div className="btn bg-[#1C79BE] w-full font-bold text-xl gap-2 hover:bg-info rounded-md justify-center h-full">
                  {input ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: article
                          .replaceAll(".json", "")
                          .replaceAll("-", " ")
                          .replace(
                            regex,
                            `<span className="bg-yellow-300 decoration-wavy underline text-black">${input}</span>`
                          ),
                      }}
                    ></div>
                  ) : (
                    article.replaceAll(".json", "").replaceAll("-", " ")
                  )}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
