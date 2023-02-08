import useSWR from "swr";
import fetcher from "/lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "/components/Loading";
export default function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(false);
  const { categoryId, articleId } = router.query;
  const { error, data } = useSWR(
    `/api/article?categoryId=${categoryId}&articleSlug=${articleId}`,
    fetcher
  );
  if (!data) return <Loading />;
  if (error) return <div>error...</div>;

  const handleCheck = (e) => {
    e.preventDefault();
    setChecked(!checked);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
  };

  const handleForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const question = form.question.value;
    fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify({
        question,
        text: data.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.status === 200) {
        let result = await res.json();
        setAnswer(result);
      } else {
        alert("An error occured...");
      }
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto mb-16 sm:px-0 max-w-7xl">
      {data.image?.url && !data.image?.url.includes("staging") ? (
        <img
          className="w-full h-96 object-cover mb-5 rounded-tl-xl rounded-tr-xl"
          src={data.image?.url}
        />
      ) : null}

      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href={`/categories/${categoryId}`}>{categoryId}</Link>
          </li>
          <li>
            <Link href={`/categories/${categoryId}/article/${articleId}`}>
              {data.title}
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-4xl mt-5 font-bold underline">{data.title}</div>
      <div className="collapse mt-8 rounded-md collapse-arrow border mb-5">
        <input
          type="checkbox"
          className="peer"
          onMouseEnter={handleCheck}
          onMouseLeave={handleCheck}
          checked={checked}
        />
        <div className="collapse-title glass text-black text-2xl">
          Table of Content
        </div>
        <div className="collapse-content glass">
          {data.table_of_content?.map((item, index) => (
            <li key={index} className="text-md underline">
              {item.replaceAll("Â", "")}
            </li>
          ))}
        </div>
      </div>
      <div className="text-sm mt-5 mb-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3 items-center">
            <img className="w-14 h-14" src="/baj.png" />
            <div className="flex flex-col">
              <div className="text-md underline">Bajaj Finserv Health</div>
              <div className="text-md flex flex-row gap-2">
                <div
                  className="tooltip"
                  data-tip={new Date(data.createdAt).toString()}
                >
                  {new Date(data.createdAt).toString().slice(0, 25)} •{" "}
                </div>
                <div className="text-md">{data.read_time} mins read</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-10">
            <a
              href={`https://web.whatsapp.com/send?text=https%3A%2F%2Fwww.bajajfinservhealth.in%2Farticles%2Fgut-health`}
            >
              <img
                className="w-10 h-10 mask mask-squircle"
                src="/whatsapp.png"
              />
            </a>
            <a
              href={`https://web.whatsapp.com/send?text=https%3A%2F%2Fwww.bajajfinservhealth.in%2Farticles%2Fgut-health`}
            >
              <img
                className="w-10 h-10 mask mask-squircle"
                src="/facebook.png"
              />
            </a>
            <a
              href={`https://web.whatsapp.com/send?text=https%3A%2F%2Fwww.bajajfinservhealth.in%2Farticles%2Fgut-health`}
            >
              <img
                className="w-10 h-10 mask mask-squircle"
                src="/linkedin.png"
              />
            </a>
            <a
              href={`https://web.whatsapp.com/send?text=https%3A%2F%2Fwww.bajajfinservhealth.in%2Farticles%2Fgut-health`}
            >
              <img
                className="w-10 h-10 mask mask-squircle"
                src="/link.png"
                onClick={handleCopy}
              />
            </a>
          </div>
        </div>
      </div>
      {data.synopsis ? (
        <div>
          <div className="text-3xl font-bold mt-5 mb-5">Synopsis</div>
          <div className="grid card glass rounded-box place-items-center p-10 h-auto mb-10">
            {data.synopsis?.replace(/(<([^>]+)>)/gi, "")}
          </div>
        </div>
      ) : null}

      {data.summarize ? (
        <>
          <div className="text-3xl font-bold mt-5 mb-5">Summary</div>
          <div className="grid card glass rounded-box place-items-center p-10 h-auto mb-10">
            {data?.summarize.replaceAll("Â", "A").replaceAll("â€™", "'")}
          </div>
        </>
      ) : null}

      <div className="text-3xl font-bold mt-5 mb-5">Key Takeaways</div>
      <div className="grid card glass rounded-box  p-10 h-auto mb-10">
        <div className="">
          {data.summaries.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      </div>
      <div className="divider"></div>

      <div className="grid card glass rounded-box place-items-center p-10 h-auto mb-10">
        <div
          className="mb-10"
          dangerouslySetInnerHTML={{
            __html: data.content.replaceAll("Â", "").replaceAll("â€™", "'"),
          }}
        ></div>
      </div>

      <div className="grid card glass rounded-box p-10 h-auto mb-10">
        <div className="text-3xl font-bold mt-5">
          Frequently Asked Questions
        </div>
        <div className="divider"></div>
        {data.faq?.map((item, index) => (
          <div
            key={index}
            className="collapse mt-5 rounded-md collapse-plus border"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-red-100 text-black text-2xl">
              {item.question}
            </div>
            <div className="collapse-content bg-red-100">{item.answer}</div>
          </div>
        ))}
      </div>
      <div className="grid card glass rounded-box p-10 h-auto mb-10">
        <div className="text-3xl font-bold mt-5 mb-5">Ask a Question</div>
        <div className="divider"></div>
        <form onSubmit={handleForm} id="form">
          <div className="flex flex-row items-center">
            <input
              type="text"
              id="question"
              placeholder="Enter your question..."
              className="input w-full rounded-tr-none rounded-br-none"
              required
              minLength="10"
            />
            <button
              className={`btn bg-green-300 text-black outline-none border-0 rounded-tl-none rounded-bl-none ${
                loading ? "animate-pulse duration-100" : null
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Referring the archives!" : "Submit"}
            </button>
          </div>
        </form>
        {answer.result ? (
          <div className="grid card bg-green-300 rounded-lg p-10 h-auto mb-10 place-content-center mt-5">
            {answer.result}
            <div className="badge badge-success rounded-md right-0 bottom-0 absolute rounded-tr-none rounded-bl-none">
              Time taken: {answer.timeTaken}s
            </div>
          </div>
        ) : null}
      </div>
      <div className="collapse mt-5 rounded-md collapse-arrow border">
        <input type="checkbox" className="peer" />
        <div className="collapse-title glass text-black text-2xl">
          References
        </div>
        <div className="collapse-content glass">
          {data.references_list
            .split("<li>")
            .slice(1)
            .map((item, index) => (
              <li key={index} className="text-md underline">
                {item.replace(/(<([^>]+)>)/gi, "")}
              </li>
            ))}
        </div>
      </div>
      <div className="collapse mt-5 rounded-md collapse-arrow border mb-10">
        <input type="checkbox" className="peer" />
        <div className="collapse-title glass text-black text-2xl">
          Disclaimer
        </div>
        <div className="collapse-content glass">
          Please note that this article is solely meant for informational
          purposes and Bajaj Finserv Health Limited (“BFHL”) does not shoulder
          any responsibility of the views/advice/information expressed/given by
          the writer/reviewer/originator. This article should not be considered
          as a substitute for any medical advice, diagnosis or treatment. Always
          consult with your trusted physician/qualified healthcare professional
          to evaluate your medical condition. The above article has been
          reviewed by a qualified doctor and BFHL is not responsible for any
          damages for any information or services provided by any third party.
        </div>
      </div>
    </div>
  );
}
