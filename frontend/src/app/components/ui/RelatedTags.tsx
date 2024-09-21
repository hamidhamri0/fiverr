import React from "react";

const tags = [
  "Programming",
  "Data Science",
  "Machine Learning",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Cyber Security",
  "Ethical Hacking",
  "Networking",
  "Cloud Computing",
  "DevOps",
  "Database",
  "Software Testing",
  "Project Management",
  "Quality Assurance",
  "IT & Networking",
  "Hardware",
  "Operating Systems",
  "Other",
];

export default function RelatedTags() {
  return (
    <div className="mx-auto max-w-[700px] p-2">
      <h2 className="mb-2 text-xl font-semibold text-gray-800">Related Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-sm transition-all hover:text-green-400 hover:underline"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
