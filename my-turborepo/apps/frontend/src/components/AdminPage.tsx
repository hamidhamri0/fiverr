"use client";
import React, { useState, useEffect } from "react";
import { Category, Metadata, Service, Subcategory } from "@fiverr/shared";

// Main AdminPage component
const AdminPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null,
  );
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("category");

  const renderManager = () => {
    switch (selectedSection) {
      case "category":
        return <CategoryManager />;
      case "metadataOption":
        return <MetadataOptionManager />;
      case "tag":
        return <TagManager />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Admin Page</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setSelectedSection("category")}
        >
          Manage Categories
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setSelectedSection("metadataOption")}
        >
          Manage Metadata Options
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setSelectedSection("tag")}
        >
          Manage Tags
        </button>
      </div>
      {renderManager()}
    </div>
  );
};

// CategoryManager component
const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  useEffect(() => {
    // Fetch categories from API
    // setCategories(fetchedCategories);
  }, []);

  const addCategory = () => {
    // API call to add new category
    // Update categories state
  };

  const updateCategory = (id: number, newName: string) => {
    // API call to update category
    // Update categories state
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Category Manager</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
          className="mr-2 border p-2"
        />
        <button
          onClick={addCategory}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Add Category
        </button>
      </div>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center">
            <span className="mr-2">{category.name}</span>
            <button
              onClick={() =>
                updateCategory(category.id, prompt("New name:") || "")
              }
              className="rounded bg-yellow-500 px-2 py-1 text-sm font-bold text-white hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={() =>
                updateCategory(category.id, prompt("New name:") || "")
              }
              className="rounded bg-yellow-500 px-2 py-1 text-sm font-bold text-white hover:bg-yellow-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// MetadataOptionManager component
const MetadataOptionManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "dev",
      gigs: [],
    },
    {
      id: 2,
      name: "pop",
      gigs: [],
    },
  ]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [metadata, setMetadata] = useState<Metadata[]>([]);
  const [metadataOptions, setMetadataOptions] = useState<MetadataOption[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    number | null
  >(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );
  const [selectedMetadataId, setSelectedMetadataId] = useState<number | null>(
    null,
  );
  const [newOptionName, setNewOptionName] = useState<string>("");

  useEffect(() => {
    // Fetch categories from API
    // setCategories(fetchedCategories);
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      // Fetch subcategories for the selected category
      // setSubcategories(fetchedSubcategories);
      setSelectedSubcategoryId(null);
      setSelectedServiceId(null);
      setSelectedMetadataId(null);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (selectedSubcategoryId) {
      // Fetch services for the selected subcategory
      // setServices(fetchedServices);
      setSelectedServiceId(null);
      setSelectedMetadataId(null);
    }
  }, [selectedSubcategoryId]);

  useEffect(() => {
    if (selectedServiceId) {
      // Fetch metadata for the selected service
      // setMetadata(fetchedMetadata);
      setSelectedMetadataId(null);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedMetadataId) {
      // Fetch metadata options for the selected metadata
      // setMetadataOptions(fetchedMetadataOptions);
    }
  }, [selectedMetadataId]);

  const addMetadataOption = () => {
    if (selectedMetadataId) {
      // API call to add new metadata option
      // Update metadataOptions state
    }
  };

  const updateMetadataOption = (id: number, newName: string) => {
    // API call to update metadata option
    // Update metadataOptions state
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Metadata Option Manager</h2>
      <div className="mb-4">
        <select
          value={selectedCategoryId || ""}
          onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
          className="mr-2 border p-2"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {selectedCategoryId && (
          <select
            value={selectedSubcategoryId || ""}
            onChange={(e) => setSelectedSubcategoryId(Number(e.target.value))}
            className="mr-2 border p-2"
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        )}
        {selectedSubcategoryId && (
          <select
            value={selectedServiceId || ""}
            onChange={(e) => setSelectedServiceId(Number(e.target.value))}
            className="mr-2 border p-2"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        )}
        {selectedServiceId && (
          <select
            value={selectedMetadataId || ""}
            onChange={(e) => setSelectedMetadataId(Number(e.target.value))}
            className="mr-2 border p-2"
          >
            <option value="">Select a metadata</option>
            {metadata.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {selectedMetadataId && (
        <div>
          <div className="mb-4 flex">
            <input
              type="text"
              value={newOptionName}
              onChange={(e) => setNewOptionName(e.target.value)}
              placeholder="New Option Name"
              className="mr-2 border p-2"
            />
            <button
              onClick={addMetadataOption}
              className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Add Option
            </button>
          </div>
          <ul className="space-y-2">
            {metadataOptions.map((option) => (
              <li key={option.id} className="flex items-center">
                <span className="mr-2">{option.name}</span>
                <button
                  onClick={() =>
                    updateMetadataOption(option.id, prompt("New name:") || "")
                  }
                  className="rounded bg-yellow-500 px-2 py-1 text-sm font-bold text-white hover:bg-yellow-700"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// TagManager component
const TagManager: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState<string>("");

  useEffect(() => {
    // Fetch tags from API
    // setTags(fetchedTags);
  }, []);

  const addTag = () => {
    // API call to add new tag
    // Update tags state
  };

  const updateTag = (id: number, newName: string) => {
    // API call to update tag
    // Update tags state
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Tag Manager</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New Tag Name"
          className="mr-2 border p-2"
        />
        <button
          onClick={addTag}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Add Tag
        </button>
      </div>
      <ul className="space-y-2">
        {tags.map((tag) => (
          <li key={tag.id} className="flex items-center">
            <span className="mr-2">{tag.name}</span>
            <button
              onClick={() => updateTag(tag.id, prompt("New name:") || "")}
              className="rounded bg-yellow-500 px-2 py-1 text-sm font-bold text-white hover:bg-yellow-700"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
