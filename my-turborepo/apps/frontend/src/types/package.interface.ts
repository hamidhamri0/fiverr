type Feature = {
  name: string;
  value: boolean | string;
};

type Package = {
  name: string;
  description: string;
  price: string;
  deliveryTime: string;
  features: Feature[];
};

export type PricingPackages = {
  basic?: Package;
  standard?: Package;
  premium?: Package;
};
