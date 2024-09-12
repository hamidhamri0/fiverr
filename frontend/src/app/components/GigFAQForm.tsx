import React, { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { OpenArrow } from "./Footer";
import {
  Controller,
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type FaqType = {
  id: number;
  question: string;
  answer: string;
  position: number;
};

function QuestionInputEdit({
  faq,
  index,
  onUpdate,
  onDelete,
}: {
  faq: FaqType;
  index: number;
  onUpdate: (index: number, updatedFaq: FaqType) => void;
  onDelete: (index: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-swapy-item={faq.id}
      className="mb-2 cursor-pointer border border-gray-200 p-4"
    >
      <div
        onClick={() => setIsOpen((e) => !e)}
        className="flex items-center gap-2"
      >
        <IoMdMenu size={22} />
        <span className="font-semibold">{faq.question}</span>
        <OpenArrow className="flex" isOpen={isOpen} />
      </div>
      <div
        className={`overflow-hidden ${isOpen ? "h-72" : "h-0"} transition-all duration-300 ease-in-out`}
      >
        <QuestionInput
          index={index}
          defaultValue={faq}
          setIsInputOpen={setIsOpen}
          onSave={(updatedFaq) => onUpdate(index, updatedFaq)}
          onDelete={() => onDelete(index)}
          edit={true}
        />
      </div>
    </div>
  );
}

const QuestionInput = ({
  edit = false,
  setIsInputOpen,
  defaultValue,
  onSave,
  onDelete,
}: {
  edit?: boolean;
  defaultValue?: FaqType;
  setIsInputOpen: (e: boolean) => void;
  onSave: (faq: FaqType) => void;
  onDelete?: () => void;
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const questionName = defaultValue
    ? `faqQuestion${defaultValue.id}`
    : "faqQuestion";
  const answerName = defaultValue ? `faqAnswer${defaultValue.id}` : "faqAnswer";

  const answer = useWatch({
    control,
    name: answerName,
    defaultValue: defaultValue?.answer || "",
  });

  const question = useWatch({
    control,
    name: questionName,
    defaultValue: defaultValue?.question || "",
  });

  const handleSave = () => {
    if (!answer) return;
    onSave({
      question: question,
      answer: answer,
      id: defaultValue?.id || Date.now(),
      position: defaultValue?.position || 0,
    });
    if (!edit) {
      setValue(answerName, "");
      setValue(questionName, "");
    }
    setIsInputOpen(false);
  };

  const handleCancel = () => {
    if (edit) {
      setValue(answerName, defaultValue?.answer || "");
      setValue(questionName, defaultValue?.question || "");
    } else {
      setValue(answerName, "");
      setValue(questionName, "");
    }

    setIsInputOpen(false);
  };

  return (
    <div className="px-2 py-4">
      <div>
        <div className="mb-4">
          <Controller
            control={control}
            name={questionName}
            defaultValue={defaultValue?.question || ""}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Add a Question: i.e. Do you translate to English as well?"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
              />
            )}
          />
        </div>
        <div className="mb-4">
          <Controller
            control={control}
            name={answerName}
            defaultValue={defaultValue?.answer || ""}
            rules={{
              required: "Please provide an answer",
              maxLength: {
                value: 300,
                message: "Answer should not exceed 300 characters",
              },
              minLength: {
                value: 1,
                message: "Answer should at least contains 1 characters",
              },
            }}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Add an Answer"
                className="h-20 w-full resize-none rounded-md border border-gray-300 p-2 focus:outline-none"
              />
            )}
          />
          <p className="mt-1 text-sm text-gray-500">
            {answer.length}/300 characters
          </p>
        </div>
        {errors[answerName] && (
          <p className="mb-2 text-red-500">{errors[answerName].message}</p>
        )}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {edit && onDelete && (
              <button
                onClick={onDelete}
                className="px-4 py-2 font-medium text-red-500 hover:text-gray-800"
              >
                Delete
              </button>
            )}
          </div>
          <div>
            <button
              onClick={handleCancel}
              className="px-4 py-2 font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="ml-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
            >
              {edit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GigFAQForm() {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const { control } = useFormContext();
  const {
    field: { value: faqs, onChange: setFaqs },
    formState: { errors },
  } = useController({
    control,
    name: "FAQ",
    defaultValue: [
      {
        id: 598989,
        question: "How are you sir ?",
        answer: "I'm good man",
        position: 0,
      },
      {
        id: 9986565,
        question: "Nta khodra ?",
        answer: "jijijijiji",
        position: 1,
      },
      {
        id: 8989,
        question: "Nta qzdqzdqz ?",
        answer: "bbbbbbb",
        position: 2,
      },
    ],
    rules: {
      validate(value: FaqType[]) {
        if (value.length < 2) {
          return "Add at least two FAQs";
        }
      },
    },
  });

  const handleAddFAQ = (newFaq: FaqType) => {
    setFaqs([...faqs, { ...newFaq, id: Date.now(), position: faqs.length }]);
  };

  const handleUpdateFAQ = (index: number, updatedFaq: FaqType) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = updatedFaq;
    setFaqs(updatedFaqs);
  };

  const handleDeleteFAQ = (index: number) => {
    const updatedFaqs = faqs.filter((_: any, i: number) => i !== index);
    setFaqs(updatedFaqs);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;

    const newItems = Array.from(faqs);
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);

    setFaqs(newItems);
  };

  return (
    <div>
      <div className="flex justify-between pb-4">
        <h2 className="mb-4 text-2xl hover:underline">
          Frequently Asked Questions
        </h2>
        {!isInputOpen && (
          <button
            onClick={() => setIsInputOpen(true)}
            className="text-sm text-green-500"
          >
            +Add FAQ
          </button>
        )}
      </div>
      <p className="mb-12 border-b border-gray-200"></p>
      <h3 className="mb-6 text-gray-900">
        Add Questions & Answers for Your Buyers.
      </h3>
      {isInputOpen && (
        <QuestionInput
          index={faqs.length}
          setIsInputOpen={setIsInputOpen}
          onSave={handleAddFAQ}
        />
      )}
      {faqs.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="items-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {faqs.map((faq: FaqType, index: number) => (
                  <Draggable
                    key={faq.position}
                    draggableId={String(faq.position)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                      >
                        <QuestionInputEdit
                          faq={faq}
                          index={index}
                          onUpdate={handleUpdateFAQ}
                          onDelete={handleDeleteFAQ}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      )}
      <p>
        {errors.FAQ && (
          <p className="mb-4 text-sm text-red-500">{errors.FAQ.message}</p>
        )}
      </p>
    </div>
  );
}

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
