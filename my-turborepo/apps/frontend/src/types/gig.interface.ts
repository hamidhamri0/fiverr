import { Gig } from "@fiverr/shared";

export type Type = {
  id: number;
  name: string;
};

export type Category = Type;
export type Categories = Category[];
export type Subcategory = Type;
export type Subcategories = Subcategory[];
export type Service = Type;
export type Services = Service[];
export type Tag = Type;
export type Tags = Tag[];

export type MetadataTag = {
  id: number;
  name: string;
};

export type Metadata = {
  id: number;
  name: string;
  type: string;
  metadataTags: MetadataTag[];
};

export type AboutGigContentMarks = {
  type: string;
};

export type AboutGigContent = {
  text: string;
  type: string;
  marks?: AboutGigContentMarks[];
};

export type AboutGigParagraph = {
  type: string;
  content: AboutGigContent[];
};

export type AboutGig = {
  type: string;
  content: AboutGigParagraph[];
};

export type PackageFeature = {
  packageId: number;
  featureId: number;
  value: string;
};

export type Package = {
  id: number;
  type: string;
  packageFeatures: PackageFeature[];
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  position: number;
};

export type ResultMetadata = {
  [key: string]: string | string[];
};

export type ResultPackageFeature = {
  [key: string]: string;
};

export type GigData = Gig & {
  metadataTag: ResultMetadata[];
  tags: Tag[];
  packages: Package[];
  faqs: Faq[];
  clicks: number;
  orders: number;
  impressions: number;
  cancellations: number;
  questions: Questions;
  imageUrls: File[] | undefined[];
  imageUrlsPreview: string[];
  videoUrl: File | undefined;
  videoUrlPreview: {
    videoUrl?: string;
    thumbnail?: string;
  };
  pdfUrlsPreview: string[];
  editor: string;
};

export type Option = {
  id: number;
  value: string;
};

export type Feature = {
  id: number;
  name: string;
  type: boolean | string;
  options: Option[];
};

export type Features = Feature[];

export type GigInputData = {
  title: string;
  description: string;
  metadataIds: string[];
  metadataTagIds: string[];
  categoryId: string;
  subcategoryId: string;
  serviceId: string;
  tagIds: Tags;
  userId: string;
};

export type Question = {
  id: number;
  question: string;
  options: string[];
  type: {
    genre: "input" | "multiple";
    multiple: boolean;
  };
};

export type Questions = Question[];
