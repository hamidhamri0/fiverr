import { PricingPackages } from "@/types/package.interface";
import { GigWithAvgRatingAndTotalReviews as Gig } from "@fiverr/shared";

export default function reshapePackageData(
  packages: Gig["packages"],
): PricingPackages {
  const returnedPackages: PricingPackages = {};
  packages?.forEach((packageItem) => {
    returnedPackages[packageItem.type] = {
      name: packageItem.name,
      description: packageItem.description,
      price: String(packageItem.price),
      deliveryTime: packageItem.deliveryTime,
      features: packageItem.packageFeatures.reduce(
        (acc, feature) => {
          if (
            feature.feature.name == "Package Name" ||
            feature.feature.name == "Package Description" ||
            feature.feature.name == "Price" ||
            feature.feature.name == "Delivery Time"
          )
            return acc;
          acc.push({
            name: feature.feature.name,
            value:
              feature.value === "true"
                ? true
                : feature.value === "false"
                  ? false
                  : feature.value,
          });
          return acc;
        },
        [] as {
          name: string;
          value: boolean | string;
        }[],
      ),
    };
  });
  return returnedPackages;
}
