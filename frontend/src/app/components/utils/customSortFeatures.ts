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

export default function customSortFeatures(features: FeatureType) {
  const customOrder = ["Package Name", "Package Description", "Delivery Time"];

  return features.sort((a, b) => {
    // Always put 'price' at the end
    if (a.name === "price") return 1;
    if (b.name === "price") return -1;

    const indexA = customOrder.indexOf(a.name);
    const indexB = customOrder.indexOf(b.name);

    if (indexA !== -1 && indexB !== -1) {
      // Both features are in the custom order
      return indexA - indexB;
    } else if (indexA !== -1) {
      // Only a is in the custom order
      return -1;
    } else if (indexB !== -1) {
      // Only b is in the custom order
      return 1;
    } else {
      // Neither are in the custom order, sort alphabetically
      return a.name.localeCompare(b.name);
    }
  });
}
