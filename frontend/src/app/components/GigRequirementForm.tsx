import React, { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import { IoMdMenu } from "react-icons/io";
import { OpenArrow } from "./Footer";
import { post } from "@/lib/utils/customFetch";

type Question = {
  question: string;
  type: {
    genre: string;
    multiple: boolean;
  };
  options: string[];
};

type Questions = {
  questions: Question[];
};

const GigRequirementForm = ({ onClick }: { onClick: () => void }) => {
  const { handleSubmit, setValue } = useFormContext();

  const onSubmit = async (data: any) => {
    console.log("SUBMIT SUCCESS", data);
    const question = data.questions;
    const gigId = data.gigId;
    await post(`/question/saveQuestions/${gigId}`, { question });
    // onClick();
  };

  function fillData() {
    const data = [
      {
        question: "how is your state with db ?",
        type: {
          genre: "multiple",
          multiple: true,
        },
        options: ["yes good", "not bad", "bad"],
        id: null,
      },
      {
        question: "what you is rage",
        type: {
          genre: "multiple",
          multiple: false,
        },
        options: ["mid", "bad"],
        id: null,
      },
      {
        question: "how are you ?",
        type: {
          genre: "input",
          multiple: false,
        },
        options: ["", ""],
        id: null,
      },
    ];
    setValue("questions", data);
  }

  return (
    <div className="mx-auto max-w-[700px]">
      <QuestionInput />
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        className={`w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600`}
      >
        Save & Continue
      </button>
      <button
        className={`mt-2 w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600`}
        onClick={() => fillData()}
      >
        fill with Data
      </button>
    </div>
  );
};

const QuestionInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext();
  const {
    field: { onChange: setQuestions, value: questions },
  } = useController({
    control,
    name: "questions",
    defaultValue: [],
  });

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleUpdateQuestion = (index: number, question: Question) => {
    // console.log(question, "updated");
    const updatedQuestions = [...questions];
    updatedQuestions[index] = question;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter(
      (_: any, i: number) => i !== index,
    );
    setQuestions(updatedQuestions);
  };

  console.log("QUESTION", questions);

  return (
    <div className="mx-auto mb-2 max-w-2xl rounded-lg bg-gray-50 p-4 shadow-md">
      <div className="mb-12">
        <div className="mb-4 flex w-full items-center gap-1">
          <span className="h-[1px] w-full bg-gray-200"></span>
          <h2 className="whitespace-nowrap text-sm font-medium">
            YOUR QUESTIONS
          </h2>
          <span className="h-[1px] w-full bg-gray-200"></span>
        </div>
        <p className="mb-4 text-gray-600">
          Here&apos;s where you can request any details needed to complete the
          order. There&apos;s no need to repeat any of the general questions
          asked above by Fiverr.
        </p>
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-blue-600"
          >
            + Add a question
          </button>
        ) : (
          <div>
            <QuestionFields
              setIsInputOpen={setIsOpen}
              onSave={handleAddQuestion}
            />
          </div>
        )}
      </div>
      {questions.map((question: any, index: number) => (
        <QuestionFieldsEdit
          key={index}
          question={question}
          onUpdate={(updatedQuestion: Question) =>
            handleUpdateQuestion(index, updatedQuestion)
          }
          onDelete={() => handleDeleteQuestion(index)}
        />
      ))}
    </div>
  );
};

const QuestionFieldsEdit = ({
  question,
  onUpdate,
  onDelete,
}: {
  question: Question;
  onUpdate: (updatedQuestion: Question) => void;
  onDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 cursor-pointer border border-gray-200 p-4">
      <div
        onClick={() => setIsOpen((e) => !e)}
        className="flex items-center gap-2"
      >
        <IoMdMenu size={22} />
        <span className="font-semibold">{question?.question}</span>
        <OpenArrow className="flex" isOpen={isOpen} />
      </div>
      <div className={`${isOpen ? "block" : "hidden"} `}>
        <QuestionFields
          defaultValue={question}
          setIsInputOpen={setIsOpen}
          onSave={(updatedQuestion: Question) => onUpdate(updatedQuestion)}
          onDelete={() => onDelete()}
          edit={true}
        />
      </div>
    </div>
  );
};

const QuestionFields = ({
  setIsInputOpen,
  onSave,
  defaultValue,
  edit,
  onDelete,
}: {
  setIsInputOpen: (e: boolean) => void;
  onSave: (question: any) => void;
  edit?: boolean;
  defaultValue?: any;
  onDelete?: () => void;
}) => {
  const {
    control,
    trigger,
    clearErrors,
    formState: { errors },
    setValue,
  } = useFormContext();

  const questionName = defaultValue ? `question${defaultValue.id}` : "question";
  const typeName = defaultValue ? `type${defaultValue.id}` : "type";
  const optionsName = defaultValue ? `options${defaultValue.id}` : "options";

  const {
    field: { onChange: setQuestion, value: question },
  } = useController({
    control,
    name: questionName,
    rules: {
      required: "Question is required",
      maxLength: {
        value: 400,
        message: "Question is too long, max 400 characters",
      },
      minLength: { value: 10, message: "Question is too short at least 10" },
    },
    defaultValue: defaultValue?.question || "",
  });

  const {
    field: { onChange: setType, value: type },
  } = useController({
    control,
    name: typeName,
    defaultValue: defaultValue?.type || { genre: "single", multiple: false },
  });
  const {
    field: { onChange: setOptions, value: options },
  } = useController({
    control,
    name: optionsName,
    defaultValue: defaultValue?.options || ["", ""],
    rules: {
      validate: (value) => {
        if (type.genre !== "multiple") return true;
        if (value.length < 2) return "fill at least two options";
        let noErr = true;
        for (let i = 0; i < value.length; i++) {
          if (type.genre === "multiple" && !value[i]) {
            noErr = false;
            break;
          }
        }
        return !noErr ? "Options are required" : true;
      },
    },
  });

  console.log(question, type, options, errors);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOnSubmit = async () => {
    // console.log("handleOnSubmit 11111111111111111111111111111111111");
    const errors = await trigger([questionName, typeName, optionsName]);
    // console.log(questionName, typeName, optionsName);
    // console.log(errors);
    if (!errors) return;
    onSave({
      question,
      type,
      options,
      id: defaultValue?.id || null,
    });
    if (!edit) {
      ResetState();
    }
    setIsInputOpen(false);
  };

  function ResetState() {
    setValue(questionName, "");
    setValue(typeName, { genre: "single", multiple: false });
    setValue(optionsName, ["", ""]);
  }

  const handleOnDelete = () => {
    onDelete?.();
    ResetState();
    setIsInputOpen(false);
  };

  const handleCancel = () => {
    setValue(questionName, defaultValue?.question || "");
    setValue(
      typeName,
      defaultValue?.type || { genre: "single", multiple: false },
    );
    setValue(optionsName, defaultValue?.options || ["", ""]);
    setIsInputOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Add a question
          <span className="ml-1 text-red-500">*</span>
        </label>
        <textarea
          value={question}
          onChange={setQuestion}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Request necessary details such as dimensions, brand guidelines, and more."
        />

        {errors?.[questionName] && (
          <p className="text-sm text-red-500">
            {errors?.[questionName]?.message}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {question.length} /400 characters
        </p>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Get it in a form of:
        </label>
        <div className="flex justify-between">
          <select
            value={type.genre}
            onChange={(e) => {
              if (e.target.value !== "multiple") {
                clearErrors(optionsName);
              }
              setType({ ...type, genre: e.target.value, multiple: false });
            }}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="input">Free text</option>
            <option value="multiple">Multiple choice</option>
            <option value="single">Single choice</option>
          </select>
          {type.genre === "multiple" && (
            <div className="flex items-center gap-2">
              <input
                checked={type.multiple}
                onChange={(e) =>
                  setType({ ...type, multiple: e.target.checked })
                }
                type="checkbox"
                className="ml-2 h-4 w-4 accent-black outline-none"
              />
              <label className="flex items-center text-gray-900">
                Enable to choose more than 1 option
              </label>
            </div>
          )}
        </div>
      </div>

      {type.genre === "multiple" &&
        options.map((option: string[], idx: number) => (
          <div key={idx} className="mb-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                value={option}
                onChange={(e) =>
                  setOptions(
                    options.map((a: any, i: number) =>
                      i === idx ? e.target.value : a,
                    ),
                  )
                }
                type="text"
                placeholder="Add Option"
                className="w-full rounded-md border border-gray-300 p-2"
              />
              <span
                onClick={() => {
                  setOptions(options.filter((_a: any, i: number) => i !== idx));
                }}
                className="cursor-pointer"
              >
                X
              </span>
            </div>
          </div>
        ))}
      {errors[optionsName] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[optionsName]?.message}
        </p>
      )}

      {type.genre === "multiple" && (
        <button
          type="button"
          onClick={addOption}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          + Add New Option
        </button>
      )}

      <div className="mt-4 flex justify-end">
        {edit && (
          <button
            type="button"
            onClick={handleOnDelete}
            className="mr-2 rounded-md px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Delete
          </button>
        )}
        <div className="ml-auto">
          <button
            type="button"
            onClick={handleCancel}
            className="mr-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOnSubmit}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            {edit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GigRequirementForm;
