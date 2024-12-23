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
import { useGigStore } from "../stores/GigStore";
import SpinnerCenterWithBlur from "./Molecules/SpinnerCenterWithBlur";
import { useRouter } from "next/navigation";
import { useUserInfoStore } from "@/stores/UserInfoStore";
import toast from "react-hot-toast";
import { Feature, FeatureOption, Package, Tag } from "@fiverr/shared";
const deliveryTimeOptions = [
  "1 DAY DELIVERY",
  "2 DAYS DELIVERY",
  "3 DAYS DELIVERY",
  "4 DAYS DELIVERY",
  "5 DAYS DELIVERY",
  "6 DAYS DELIVERY",
  "7 DAYS DELIVERY",
  "14 DAYS DELIVERY",
  "21 DAYS DELIVERY",
  "28 DAYS DELIVERY",
  "35 DAYS DELIVERY",
  "42 DAYS DELIVERY",
  "49 DAYS DELIVERY",
  "56 DAYS DELIVERY",
  "63 DAYS DELIVERY",
  "70 DAYS DELIVERY",
  "77 DAYS DELIVERY",
  "84 DAYS DELIVERY",
  "91 DAYS DELIVERY",
  "98 DAYS DELIVERY",
];

const sharedFeatures = [
  {
    id: 1,
    name: "name",
    type: "input",
    options: null,
  },
  {
    id: 2,
    name: "description",
    type: "input",
    options: null,
  },
  {
    id: "deliveryTime",
    name: "deliveryTime",
    type: "select",
    options: deliveryTimeOptions.map((option, i) => {
      return { id: i, value: option };
    }),
  },
];

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
  feature: Omit<Feature, "subcategory">;
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
        value: feature.name === "deliveryTime" ? true : false,
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
          {feature.options.map((option: FeatureOption) => {
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
  feature: Omit<Feature, "subcategory">;
  typeOfPackage: string;
}) {
  const { control, getValues } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `${typeOfPackage}.${String(feature.name)}`,
    defaultValue: 0,
    rules: {
      required: {
        value: true,
        message: "This field is required",
      },
      validate(value) {
        const gig = getValues();
        if (value < 5) {
          return "Minimum price is $5";
        }
        if (typeOfPackage === "standard") {
          if (gig.basic.Price >= gig.standard.Price) {
            return "Standard Price must be higher than basic Price";
          }
        } else if (typeOfPackage === "premium") {
          if (gig.standard.Price >= gig.premium.Price) {
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
  feature: Omit<Feature, "subcategory">;
  typeOfPackage: string;
}) {
  const { control } = useFormContext();

  const {
    formState: { errors },
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `${typeOfPackage}.${String(feature.name)}`,
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
        feature.name === "description" ? "border-b-0" : ""
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
  feature: Omit<Feature, "subcategory">;
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
  feature: Omit<Feature, "subcategory">;
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

export default function GigPricingForm({
  onClick,
}: {
  onClick: (cb: (wizard: number) => number) => void;
}) {
  const router = useRouter();
  const features = useGigStore((state) => state.features);
  const setFeatures = useGigStore((state) => state.setFeatures);

  const [loading, setLoading] = useState(false);

  const { handleSubmit, getValues, setValue } = useFormContext();
  const subcategory = useWatch({ name: "subcategory" });
  const user = useUserInfoStore((state) => state.user);

  console.log(useWatch());

  useEffect(() => {
    async function getAllFeaturesWithOptions() {
      try {
        let data = await get<Feature[]>(
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
    const gig = getValues();
    setLoading(true);
    const values = getValues();
    let metadata: { [key: number]: number[] | number } = {};
    for (const meta in values.metadataTag) {
      if (typeof values.metadataTag[meta] == "string") {
        metadata[Number(meta)] = Number(values.metadataTag[meta]);
      } else {
        metadata[Number(meta)] = values.metadataTag[meta].map((e: string) =>
          Number(e),
        );
      }
    }
    let body = {
      title: values.title,
      metadata: metadata,
      categoryId: +values.category,
      subcategoryId: +values.subcategory,
      serviceId: +values.serviceType,
      tagIds: values.tags.map((e: Tag) => Number(e.id)),
      userId: user && user.id,
    };
    try {
      const packages = await get<Package[]>(
        `/package/getPackageByGigId/${gig.id}`,
      );
      await post(`/gig/saveGigWithPackages?gigId=${gig.id}`, {
        ...body,
        basic: gig.basic,
        standard: gig.standard,
        premium: gig.premium,
      });
      if (gig.step < 3) {
        setValue("step", 3);
      }
      toast.success("packages saved successfully");
      onClick((p) => p + 1);
    } catch (err: any) {
      toast.error(
        err?.message ||
          "An error occurred while saving packages, please try again later",
      );
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
              {sharedFeatures.map((feature, i) => {
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
              {features.map((feature, i) => {
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
              <tr className="h-[65px]">
                <td
                  className={`min-w-[220px] whitespace-nowrap border border-gray-200 bg-gray-50 p-3 px-4 text-left text-sm font-medium text-gray-500`}
                >
                  {"Price"}
                </td>
                {["basic", "standard", "premium"].map((type, index) => {
                  const feature = {
                    id: index,
                    name: "price",
                    type: "range",
                    options: null,
                  };
                  return (
                    <FactoryFeature
                      key={type}
                      feature={feature}
                      typeOfPackage={type}
                    />
                  );
                })}
              </tr>
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
