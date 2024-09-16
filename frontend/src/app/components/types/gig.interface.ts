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

export type GigData = {
  id: string;
  title: string;
  aboutGig: AboutGig;
  description: string;
  isPublished: boolean;
  step: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  subcategory: Subcategory;
  service: Service;
  metadata: Metadata[];
  tags: Tag[];
  packages: Package[];
  faqs: Faq[];
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
