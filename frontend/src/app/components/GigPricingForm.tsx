import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { MdError } from "react-icons/md";
import customSortFeatures from "./utils/customSortFeatures";

type Option = {
  id: number;
  value: string;
};

type FeatureType = {
  id: number;
  name: string;
  type: boolean | string;
  options: Option[];
}[];

function ErrorMenu({
  errors,
  typeOfPackage,
  featureName,
}: {
  errors: FieldErrors<FieldValues>;
  typeOfPackage: string;
  featureName: string;
}) {
  return (
    <>
      {errors?.[typeOfPackage]?.[featureName] && (
        <div>
          <div className="group absolute right-1 top-1">
            <MdError className="cursor-help text-red-500" />
            <div className="absolute bottom-6 z-50 w-[200px] rounded-md bg-gray-600 p-3 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p>{errors?.[typeOfPackage]?.[featureName]?.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SelectInput({
  feature,
  typeOfPackage,
}: {
  feature: FeatureType[number];
  typeOfPackage: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <td className="h-full border border-gray-200">
      <div className="relative min-h-full">
        <select
          {...register(`${typeOfPackage}.${feature.name}`, {
            required: {
              value: feature.name === "Delivery Time" ? true : false,
              message: "This field is required",
            },
          })}
          id="countries"
          className="relative w-full rounded-lg px-2 py-4 text-sm text-gray-900 outline-none"
        >
          <option value="">Select</option>
          {feature.options.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            );
          })}
        </select>
        <ErrorMenu
          featureName={feature.name}
          typeOfPackage={typeOfPackage}
          errors={errors}
        />
      </div>
    </td>
  );
}

function NumberInput({
  featureName,
  typeOfPackage,
}: {
  featureName: string;
  typeOfPackage: string;
}) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  return (
    <td className="h-full border border-gray-200">
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500">
          $
        </span>
        <input
          {...register(`${typeOfPackage}.${featureName}`, {
            valueAsNumber: true,
            required: {
              value: true,
              message: "This field is required",
            },
            validate(value) {
              const values = getValues();
              if (value < 5) {
                return "Minimum price is $5";
              }
              if (typeOfPackage === "standard") {
                if (values.basic.Price >= values.standard.Price) {
                  return "Standard Price must be higher than basic Price";
                }
              } else if (typeOfPackage === "premium") {
                if (values.standard.Price >= values.premium.Price) {
                  return "Premium Price must be higher than standard Price";
                }
              }
            },
          })}
          className="h-[40px] w-full rounded-md border border-gray-200 px-2 pl-6 outline-none"
          type="number"
        />
        <ErrorMenu
          featureName={featureName}
          typeOfPackage={typeOfPackage}
          errors={errors}
        />
      </div>
    </td>
  );
}

function TextArea({
  featureName,
  typeOfPackage,
}: {
  featureName: string;
  typeOfPackage: string;
}) {
  const { control } = useFormContext();

  const {
    formState: { errors },
    field: { value, onChange },
  } = useController({
    control,
    name: `${typeOfPackage}.${featureName}`,
    rules: {
      required: {
        value: true,
        message: "This field is required",
      },
      minLength: {
        value: 5,
        message: "Minimum length is 5 characters",
      },
    },
  });

  return (
    <td
      className={`relative border border-gray-200 text-center align-middle ${
        featureName === "Package Description" ? "border-b-0" : ""
      }`}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          featureName === "packageDescription"
            ? "describe your package"
            : "Name your package"
        }
        className={`w-full resize-none rounded p-2 text-xs text-gray-700 outline-none ${featureName === "packageDescription" ? "h-40" : "h-24"} `}
      />
      <ErrorMenu
        featureName={featureName}
        typeOfPackage={typeOfPackage}
        errors={errors}
      />
    </td>
  );
}

function FactoryFeature({
  feature,
  typeOfPackage,
}: {
  feature: FeatureType[number];
  typeOfPackage: string;
}) {
  const { register } = useFormContext();

  switch (feature.type) {
    case "select":
      return <SelectInput feature={feature} typeOfPackage={typeOfPackage} />;
    case "input":
      return (
        <TextArea typeOfPackage={typeOfPackage} featureName={feature.name} />
      );

    case "checkbox":
      return (
        <td className="border border-gray-200 py-4 text-center align-middle">
          <input
            {...register(`${typeOfPackage}.${feature.name}`)}
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 accent-black"
          />
        </td>
      );
    case "range":
      return (
        <NumberInput typeOfPackage={typeOfPackage} featureName={feature.name} />
      );
    default:
      return null;
  }
}

export default function GigPricingForm({ onClick }: { onClick: () => void }) {
  const [features, setFeatures] = React.useState<FeatureType>([]);
  const { handleSubmit } = useFormContext();

  useEffect(() => {
    async function getAllFeaturesWithOptions() {
      try {
        const response = await fetch(
          `http://localhost:3001/feature/getAllFeaturesBySubcategoryId?subcategoryId=${43}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        let data = await response.json();
        if (data.message) throw new Error(data.message);

        data = customSortFeatures(data);
        setFeatures(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllFeaturesWithOptions();
  }, []);

  function submit(data: any) {
    onClick();
  }

  if (features.length === 0) return null;

  return (
    <div className="mx-auto max-w-[800px] p-4">
      <form onSubmit={handleSubmit(submit)}>
        <table className="w-full">
          <colgroup>
            <col
              className="border border-b-0 border-gray-200"
              style={{ width: "25%" }}
            />
            <col
              className="border border-b-0 border-gray-200"
              style={{ width: "25%" }}
            />
            <col
              className="border border-b-0 border-gray-200"
              style={{ width: "25%" }}
            />
            <col
              className="border border-b-0 border-gray-200"
              style={{ width: "25%" }}
            />
          </colgroup>
          <thead>
            <tr>
              {["", "Basic", "Standard", "Premium"].map((packageType, i) => {
                return (
                  <th
                    key={packageType}
                    className={`bg-gray-50 p-3 px-4 text-left ${i == 0 ? "w-[220px]" : ""}`}
                  >
                    <span className="font-semibold">{packageType}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {features.slice(0, 2).map((feature, i) => {
              return (
                <tr key={feature.name}>
                  <td className="min-w-[220px] whitespace-nowrap bg-gray-50 p-3 px-4 text-left text-sm font-medium text-gray-500"></td>
                  {["basic", "standard", "premium"].map((type) => {
                    return (
                      <FactoryFeature
                        key={`${feature.name}-${type}`}
                        feature={feature}
                        typeOfPackage={type}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="w-full">
          <colgroup>
            <col
              className="border border-t-0 border-gray-200"
              style={{ width: "25%" }}
            />
            <col
              className="border border-t-0 border-gray-200"
              style={{ width: "25%" }}
            />
            <col
              className="border border-t-0 border-gray-200"
              style={{ width: "25%" }}
            />
            <col
              className="border border-t-0 border-gray-200"
              style={{ width: "25%" }}
            />
          </colgroup>
          <tbody>
            {features.slice(2, features.length).map((feature, i) => {
              return (
                <tr className="h-[65px]" key={feature.name}>
                  <td
                    className={`min-w-[220px] whitespace-nowrap border border-gray-200 bg-gray-50 p-3 px-4 text-left text-sm font-medium text-gray-500 ${i == 0 ? "border-t-0" : ""}`}
                  >
                    {feature.name}
                  </td>
                  {["basic", "standard", "premium"].map((type) => {
                    return (
                      <FactoryFeature
                        key={`${feature.name}-${type}`}
                        feature={feature}
                        typeOfPackage={type}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 block w-full rounded-md bg-green-500 px-4 py-2 text-white"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
