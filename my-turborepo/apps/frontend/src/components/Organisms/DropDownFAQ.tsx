"use client";
import QuestionAnswer from "@/Components/Molecules/QuestionAnswer";
import React from "react";
import { FAQ } from "types/faq";

export default function DropDownFAQ({ faq }: { faq: FAQ[] }) {
  if (!faq || faq.length === 0) return null;
  return (
    <div className="mb-12 flex flex-col">
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
