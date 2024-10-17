import { get } from "@/lib/utils/customFetch";
import { useGigStore } from "@/stores/GigStore";
import { useEffect } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { Category, Service, Subcategory } from "@fiverr/shared";
import toast from "react-hot-toast";

export function SubcategorySelect() {
  const subcategories = useGigStore((state) => state.subcategories);
  const setSubcategories = useGigStore((state) => state.setSubcategories);
  const setFeatures = useGigStore((state) => state.setFeatures);
  const {
    setValue,
    setError,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useFormContext();
  const {
    field: { value: subcategory, ref: subcategoryRef },
  } = useController({
    control,
    name: "subcategory",
    rules: {
      required: "subcategory is required",
    },
    defaultValue: "",
  });
  const category = useWatch({
    name: "category",
  });
  useEffect(() => {
    if (!category) return;

    async function fetchSubCategories() {
      try {
        const data = await get<Subcategory[]>(
          `/subcategory/getSubcategoriesByCategoryId?categoryId=${category}`,
        );
        setSubcategories(data);
      } catch (err) {
        setError("root", {
          type: "manual",
          message:
            (err instanceof Error && err?.message) || "Something went wrong",
        });
        console.log(err);
      }
    }

    fetchSubCategories();
  }, [category, setValue, setError, setSubcategories]);
  return (
    <select
      ref={subcategoryRef}
      value={subcategory}
      onChange={(e) => {
        const values = getValues();
        setFeatures([]);
        reset({
          ...values,
          basic: {},
          standard: {},
          premium: {},
          serviceType: "",
          subcategory: e.target.value,
        });
      }}
      className={`flex-1 rounded-md border p-2 text-sm ${errors.category ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">Select a sub-category</option>
      {subcategories.map((subcategory: Subcategory) => (
        <option key={subcategory.id} value={subcategory.id}>
          {subcategory.name}
        </option>
      ))}
    </select>
  );
}

export const ServiceTypeSelect = () => {
  const {
    formState: { errors },
    setValue,
    setError,
    control,
    getValues,
    unregister,
  } = useFormContext(); // const [services, setServices] = useState<Services>([]);

  const services = useGigStore((state) => state.services);
  const setServices = useGigStore((state) => state.setServices);
  const setMetadata = useGigStore((state) => state.setMetadata);
  const subcategory = useWatch({
    name: "subcategory",
  });
  const {
    field: { value: service, onChange: setService, ref: serviceRef },
  } = useController({
    control,
    name: "serviceType",
    rules: {
      required: "service is required",
    },
    defaultValue: "",
  });
  useEffect(() => {
    if (!subcategory) return;

    async function fetchServices() {
      try {
        const data = await get<Service[]>(
          `/service/getServicesBySubcategoryId?subcategoryId=${subcategory}`,
        );
        setServices(data);
      } catch (err) {
        toast.error("Something went wrong");
      }
    }

    fetchServices();
  }, [subcategory, setValue, setError, setServices]);
  if (!subcategory) return null;
  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr]">
      <label
        htmlFor="serviceType"
        className="mb-1 block font-semibold text-gray-700"
      >
        Service type
      </label>

      <select
        ref={serviceRef}
        value={service}
        onChange={(e) => {
          setService(e.target.value);
          let values = getValues()?.["metadataTag"] || {};

          if (Object.keys(values).length) {
            for (let key of Object.keys(values)) {
              unregister(`metadataTag.${key}`);
            }
          }

          setMetadata([]);
        }}
        className={`w-full rounded-md border p-2 text-sm ${errors.serviceType ? "border-red-500" : "border-gray-300"}`}
      >
        <option className="text-sm" value="">
          SELECT A SERVICE TYPE
        </option>
        {services.map((service: Service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
    </div>
  );
};
