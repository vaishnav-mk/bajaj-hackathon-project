import useSWR from "swr";
import fetcher from "/lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "/components/Loading";
export default function Home() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [faqs, setFaqs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const regex = new RegExp(input, "gi");

  useEffect(() => {
    if (!categoryId) return;
    const url = `/api/categories/${categoryId}/faqs`;
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setFaqs(json);
      setLoading(false);
    };
    fetchData();
  }, [categoryId]);
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto mb-16 sm:px-0 max-w-7xl">
      <div className="flex justify-between">
        <div className="btn font-bold text-3xl text-white gap-2">
          <span className="text-fuchsia-500">{faqs.length}</span>
          FAQs on {categoryId?.replace("-", " ")}
        </div>
        <input
          type="text"
          placeholder="Search FAQs here..."
          className="input input-bordered w-full max-w-xs justify-end right-0"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div className="divider"></div>

      {faqs
        ?.sort((i) => {
          if (i.faq.question.includes(input)) return -1;
          return 1;
        })
        .map((faq, index) => (
          <div
            key={index}
            className="collapse rounded-md collapse-arrow border mb-10"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title glass text-black text-2xl flex gap-2">
              {index + 1}.{" "}
              {input ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: faq.faq.question.replace(
                      regex,
                      `<span className="bg-yellow-300 decoration-wavy underline text-black">${input}</span>`
                    ),
                  }}
                ></div>
              ) : (
                faq.faq.question
              )}
            </div>
            <div className="collapse-content glass">
              <div className="text-lg mt-5">
                {faq.faq.answer}
                <div className="divider"></div>
                <Link href={`/categories/${categoryId}/article/${faq.slug}`}>
                  <div className="btn btn-xs">View the article</div>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
