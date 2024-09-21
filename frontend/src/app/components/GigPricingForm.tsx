import React, { useEffect, useState } from "react";
import {
  FieldError,
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { MdError } from "react-icons/md";
import customSortFeatures from "@/lib/utils/customSortFeatures";
import { get, post } from "@/lib/utils/customFetch";
import { Feature, Features, Option, Package } from "../../types/gig.interface";
import { useGigStore } from "../../stores/GigStore";
import SpinnerCenterWithBlur from "./ui/SpinnerCenterWithBlur";
import { useRouter } from "next/navigation";

function ErrorMenu({ children }: { children: FieldError }) {
  return (
    <>
      {children && (
        <div>
          <div className="group absolute right-1 top-1">
            <MdError className="cursor-help text-red-500" />
            <div className="absolute bottom-6 z-50 w-[200px] rounded-md bg-gray-600 p-3 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p>{children.message}</p>
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
  feature: Feature;
  typeOfPackage: string;
}) {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `${typeOfPackage}.${String(feature.id)}`,
    defaultValue: "",
    rules: {
      required: {
        value: feature.name === "Delivery Time" ? true : false,
        message: "This field is required",
      },
    },
  });

  return (
    <td className="h-full border border-gray-200">
      <div className="relative min-h-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="countries"
          className="relative w-full rounded-lg px-2 py-4 text-sm text-gray-900 outline-none"
        >
          <option value="">Select</option>
          {feature.options.map((option: Option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            );
          })}
        </select>
        {error && <ErrorMenu>{error}</ErrorMenu>}
      </div>
    </td>
  );
}

function NumberInput({
  feature,
  typeOfPackage,
}: {
  feature: Feature;
  typeOfPackage: string;
}) {
  const { control, getValues } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `${typeOfPackage}.${String(feature.id)}`,
    defaultValue: 0,
    rules: {
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
    },
  });

  return (
    <td className="h-full border border-gray-200">
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500">
          $
        </span>
        <input
          value={value}
          onChange={(e) => onChange(String(e.target.value))}
          className="h-[40px] w-full rounded-md border border-gray-200 px-2 pl-6 outline-none"
          type="number"
        />
        {error && <ErrorMenu>{error}</ErrorMenu>}
      </div>
    </td>
  );
}

function TextArea({
  feature,
  typeOfPackage,
}: {
  feature: Feature;
  typeOfPackage: string;
}) {
  const { control } = useFormContext();

  const {
    formState: { errors },
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `${typeOfPackage}.${String(feature.id)}`,
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
    defaultValue: "",
  });

  return (
    <td
      className={`relative border border-gray-200 text-center align-middle ${
        feature.name === "Package Description" ? "border-b-0" : ""
      }`}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          feature.name === "packageDescription"
            ? "describe your package"
            : "Name your package"
        }
        className={`w-full resize-none rounded p-2 text-xs text-gray-700 outline-none ${feature.name === "packageDescription" ? "h-40" : "h-24"} `}
      />
      {error && <ErrorMenu>{error}</ErrorMenu>}
    </td>
  );
}

function CheckBoxInput({
  feature,
  typeOfPackage,
}: {
  feature: Feature;
  typeOfPackage: string;
}) {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `${typeOfPackage}.${String(feature.id)}`,
    defaultValue: "",
  });

  return (
    <td className="border border-gray-200 py-4 text-center align-middle">
      <input
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked ? "true" : "")}
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600 accent-black"
      />
      {error && <ErrorMenu>{error}</ErrorMenu>}
    </td>
  );
}

function FactoryFeature({
  feature,
  typeOfPackage,
}: {
  feature: Feature;
  typeOfPackage: string;
}) {
  switch (feature.type) {
    case "select":
      return <SelectInput feature={feature} typeOfPackage={typeOfPackage} />;
    case "input":
      return <TextArea typeOfPackage={typeOfPackage} feature={feature} />;

    case "checkbox":
      return <CheckBoxInput typeOfPackage={typeOfPackage} feature={feature} />;
    case "range":
      return <NumberInput typeOfPackage={typeOfPackage} feature={feature} />;
    default:
      return null;
  }
}

export default function GigPricingForm({ onClick }: { onClick: () => void }) {
  const router = useRouter();
  const features = useGigStore((state) => state.features);
  const setFeatures = useGigStore((state) => state.setFeatures);

  // console.log(gig, "PRICING");

  const [loading, setLoading] = useState(false);

  const { handleSubmit, getValues } = useFormContext();
  const subcategory = useWatch({ name: "subcategory" });

  useEffect(() => {
    async function getAllFeaturesWithOptions() {
      try {
        let data = await get<Features>(
          `/feature/getAllFeaturesBySubcategoryId?subcategoryId=${subcategory}`,
        );

        const featuresData = customSortFeatures(data);
        setFeatures(featuresData);
      } catch (error) {
        console.log(error);
      }
    }
    getAllFeaturesWithOptions();
  }, [subcategory, setFeatures]);

  async function submit() {
    // e.preventDefault();
    const values = getValues();
    setLoading(true);
    try {
      const packages = await get<Package[]>(
        `/package/getPackageByGigId/${values.gigId}`,
      );
      if (!packages.length) {
        await post(`/package/createPackage/${values.gigId}`, {
          basic: values.basic,
          standard: values.standard,
          premium: values.premium,
        });
      } else {
        await post(`/package/updatePackage/${values.gigId}`, {
          basic: values.basic,
          standard: values.standard,
          premium: values.premium,
        });
      }
      router.refresh();
      onClick();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (features.length === 0) return null;

  return (
    <>
      {loading && <SpinnerCenterWithBlur />}
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
    </>
  );
}
