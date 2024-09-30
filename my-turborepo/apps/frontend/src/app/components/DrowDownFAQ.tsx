import React, { useState } from "react";
import { OpenArrow } from "./Footer";

let faq = [
  {
    question: "What is Web programming?",
    answer:
      "Web programming or development use code to focus on the website functionality and ensure it works and is easy to use. It involves markup, writing, network security and coding which is client and server side. The most popular web programming languages are HTML, XML, JavaScript, PHP, ASP.Net and Python.",
  },
  {
    question: "How do I choose the right freelance programmer for my project?",
    answer:
      "With so many programming services, it’s a challenge to choose the right programmer. Formulate a clear brief, decide on a budget, deadlines and scope. Select a programmer based not only on their skills and experience but also on how well you might work and communicate.",
  },
  {
    question: "Do I need to prepare something for my programmer?",
    answer:
      "Yes, good documentation and a clear brief are crucial for the success of getting the desired result for your project. Formulate your initial high level idea and brainstorm it until you have a clear vision. Next, turn your idea into detailed functionality requirements for the backend programming and detail your technical requirements (platform, devices etc.) Also add non-functional requirements e.g. performance, security, load and clearly specify the scope of the project.",
  },
  {
    question: "What type of services can I find in Programming & Tech?",
    answer:
      "Starting with web development for client-side (frontend) and server-side (backend), the category also offers specialists in Wordpress and e-commerce development, mobile or desktop apps, support & cybersecurity, as well as user testing and QA.",
  },
  {
    question: "Can I hire developers in less than 48 hours?",
    answer:
      "Yes, on Fiverr we have developers worldwide available 24/7. If you need urgent bug fixing, have a cyber security emergency or a server load issue, you can be sure that a professional on Fiverr is within reach. Publish a buyer request or make direct contact for best results.",
  },
];

function QuestionAnswer({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((p) => !p)}
      className="flex cursor-pointer flex-col border-y border-gray-100 py-2"
    >
      <div className="flex items-center">
        <h3 className="mb-2 text-lg font-medium">{question}</h3>
        <OpenArrow className="block" isOpen={open} />
      </div>
      {open && <p>{answer}</p>}
    </div>
  );
}

export default function DrowDownFAQ() {
  return (
    <div className="mx-auto mb-12 flex max-w-[1400px] flex-col px-4">
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-semibold text-gray-800">FAQ</h2>
      </div>
      {faq.map((qna, index) => {
        return (
          <QuestionAnswer
            key={index}
            question={qna.question}
            answer={qna.answer}
          />
        );
      })}
    </div>
  );
}
