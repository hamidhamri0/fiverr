import { generateText } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import {
  Category,
  GigData,
  Metadata,
  Service,
  Subcategory,
} from "../components/types/gig.interface";

export default function reshapeDataToDefaultValues(data: GigData) {
  return {
    title: data?.title || "",
    aboutGig: data.aboutGig || {
      type: "",
      content: [],
    },
    category: data?.category?.id || "",
    subcategory: data?.subcategory?.id || "",
    serviceType: data?.service?.id || "",
    metadataTag:
      (data.metadata && reshapeMetadataTagToDefaultValues(data.metadata)) || {},
    tags: data.tags || [],
    basic:
      (data.packages?.[0] &&
        reshapePackageToDefaultValues(data.packages?.[0])) ||
      [],
    standard:
      (data.packages?.[1] &&
        reshapePackageToDefaultValues(data.packages?.[1])) ||
      [],
    premium:
      (data.packages?.[2] &&
        reshapePackageToDefaultValues(data.packages?.[2])) ||
      [],
    faqs: data.faqs || [],
    editorJson: (data?.aboutGig && data?.aboutGig) || "",
    editor:
      (data?.aboutGig &&
        generateText(data?.aboutGig, [StarterKit, Highlight])) ||
      "",
  };
}

export type ReshapeGigData = ReturnType<typeof reshapeDataToDefaultValues>;

type ResultMetadata = {
  [key: string]: string | string[];
};

function reshapeMetadataTagToDefaultValues(
  metadata: Metadata[],
): ResultMetadata {
  let data: ResultMetadata = {};
  for (const meta of metadata) {
    let type = meta.type;
    if (type === "multi_select") {
      data[meta.id] = [];
      for (const tag of meta.metadataTags) {
        (data[meta.id] as string[]).push(String(tag.id));
      }
    } else if (meta.metadataTags.length > 0) {
      data[meta.id] = String(meta.metadataTags[0].id);
    }
  }
  return data;
}

// create function reshape package that takes Package type as param and return object with default values key value pair with key as featureId and value as packageFeature value
type ResultPackageFeature = {
  [key: string]: string;
};

function reshapePackageToDefaultValues(
  packageData: Package,
): ResultPackageFeature {
  let data: ResultPackageFeature = {};
  for (const feature of packageData.packageFeatures) {
    data[feature.featureId] = feature.value;
  }
  return data;
}
