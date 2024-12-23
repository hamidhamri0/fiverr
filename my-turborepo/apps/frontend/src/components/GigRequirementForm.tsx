import React, { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import { IoMdMenu } from "react-icons/io";
import { OpenArrow } from "./Organisms/Footer";
import { post } from "@/lib/utils/customFetch";
import toast from "react-hot-toast";
import SpinnerCenterWithBlur from "./Molecules/SpinnerCenterWithBlur";
import { Question } from "@fiverr/shared";

const GigRequirementForm = ({
  onClick,
}: {
  onClick: (cb: (wizard: number) => number) => void;
}) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  console.log(errors, "errors");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      if (data.step < 4) {
        onClick(() => data.step);
        return;
      }
      setLoading(true);
      const question = data.questions?.map((el: Question) => {
        return typeof el.id == "string" ? { ...el, id: null } : el;
      });
      const gigId = data.id;
      await post(`/question/saveQuestions/${gigId}`, { question });
      setValue("initialSubcategory", getValues("subcategory"));
      toast.success("Questions saved successfully");
      if (data.step < 5) {
        setValue("step", 5);
      }
      onClick((p) => p + 1);
    } catch (err) {
      toast.error((err as Error)?.message);
    } finally {
      setLoading(false);
    }
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
        id: String(Math.floor(Math.random() * 100000000)),
      },
      {
        question: "what you is rage",
        type: {
          genre: "multiple",
          multiple: false,
        },
        options: ["mid", "bad"],
        id: String(Math.floor(Math.random() * 100000000)),
      },
      {
        question: "how are you ?",
        type: {
          genre: "input",
          multiple: false,
        },
        options: ["", ""],
        id: String(Math.floor(Math.random() * 100000000)),
      },
    ];
    setValue("questions", data);
  }

  return (
    <div className="mx-auto max-w-[700px]">
      {loading && <SpinnerCenterWithBlur />}
      <QuestionInput />
      {errors["root"]?.message && (
        <p className="my-2 mt-2 text-sm text-red-500">
          {errors["root"]?.message}
        </p>
      )}
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
  const { control, setValue, getValues } = useFormContext();
  const {
    field: { onChange: setQuestions, value: questions },
  } = useController({
    control,
    name: "questions",
    rules: {
      validate: (value) => {
        if (value.length < 2) {
          toast.error("fill at least two questions");
          return "fill at least two questions";
        }
        return true;
      },
    },
    defaultValue: [],
  });

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleUpdateQuestion = (index: number, question: Question) => {
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
    getValues,
    setError,
  } = useFormContext();

  const questionName = defaultValue ? `question${defaultValue.id}` : "question";
  const typeName = defaultValue ? `type${defaultValue.id}` : "type";
  const optionsName = defaultValue ? `options${defaultValue.id}` : "options";

  const {
    field: { onChange: setQuestion, value: question },
    fieldState: { error: questionNameError },
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
    fieldState: { error: typeNameError },
  } = useController({
    control,
    name: typeName,
    defaultValue: defaultValue?.type || { genre: "input", multiple: false },
  });
  const {
    field: { onChange: setOptions, value: options },
    fieldState: { error: optionsNameError },
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

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOnSubmit = async () => {
    const errors = await trigger([questionName, typeName, optionsName]);
    if (!errors) return;
    onSave({
      question,
      type,
      options,
      id: defaultValue?.id || String(Math.floor(Math.random() * 100000000)),
    });
    if (!edit) {
      ResetState();
    }
    setIsInputOpen(false);
  };

  function ResetState() {
    setValue(questionName, "");
    setValue(typeName, { genre: "input", multiple: false });
    setValue(optionsName, ["", ""]);
  }

  const handleOnDelete = () => {
    const values = getValues();
    if (values.questions?.length > 2) {
      onDelete?.();
      ResetState();
      setIsInputOpen(false);
    } else {
      toast.error("cant delete less than two questions");
    }
  };

  const handleCancel = () => {
    setValue(questionName, defaultValue?.question || "");
    setValue(
      typeName,
      defaultValue?.type || { genre: "input", multiple: false },
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

        {questionNameError && (
          <p className="text-sm text-red-500">{questionNameError.message}</p>
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
      {optionsNameError && (
        <p className="mt-2 text-sm text-red-500">{optionsNameError?.message}</p>
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
