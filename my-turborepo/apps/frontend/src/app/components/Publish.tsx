import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import { Fragment, useState } from "react";
import VerificationPhoneNumber from "./VerificationPhoneNumber";
import { useUserInfoStore } from "@/stores/UserInfoStore";
import { post } from "@/lib/utils/customFetch";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Publish({
  onClick,
}: {
  onClick: (cb: (wizard: number) => number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserInfoStore((state) => state.user);
  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const router = useRouter();

  console.log(errors);

  async function handlePublishGig() {
    const values = getValues();
    try {
      await post(`/gig/publish/${values.id}`, {});
      router.prefetch("/manage_gigs");
      router.push("/manage_gigs");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      {isOpen && <VerificationPhoneNumber setIsOpen={setIsOpen} />}
      <div className="mx-auto flex max-w-[700px] flex-col items-center border border-gray-200 bg-gray-50 p-8">
        <div className="w-full max-w-2xl space-y-12">
          <div className="flex justify-center">
            <svg
              width="298"
              height="137"
              viewBox="0 0 298 137"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6361_76184)">
                <path
                  d="M259.713 116.865c-8.244 8.256-21.588 8.256-29.832 0-8.244-8.257-8.244-21.62 0-29.876l29.832 29.876z"
                  fill="#222325"
                />
                <path
                  d="M194.738 30.315l.07 6.017c0 .21-.14.35-.349.35l-7.406-.77c-.28 0-.489.35-.28.56l4.821 5.318c.07.07.07.21.07.35l-2.096 5.597c-.14.28.21.56.489.42l5.659-3.079c.14-.07.35 0 .419.14l2.586 5.947c.139.28.489.28.628-.07l1.957-6.856a.382.382 0 01.349-.21l8.174.56c.28 0 .419-.28.28-.49l-3.913-5.038c-.07-.07-.07-.21-.07-.28l2.026-7.276c.07-.28-.209-.49-.489-.35l-7.405 4.198c-.14.07-.28.07-.42-.07l-4.541-5.108c-.14-.28-.559-.14-.559.14z"
                  fill="#222325"
                  stroke="#222325"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M146.67 116.585c-.139-6.087 1.048-11.755 7.476-12.524 6.428-.77 11.947.209 13.275-6.088 1.397-6.227.559-10.355 5.449-12.314 4.891-1.959 7.825.98 9.153-4.478 1.397-5.457 6.218-5.107 6.218-5.107l-30.043 47.018s-5.31.559-8.453-2.939l-3.075-3.568zM78.342 69.707l1.117 15.672 32.418-1.889 2.865-7.066c2.864-7.067 6.218-11.755 3.912-20.081 0 0 24.453 4.688 35.282 1.19l-2.445-18.402s-20.82-2.589-31.23-6.507c-10.41-3.918-19.702.84-19.702.84l-.769-4.898H85.887l-.978 4.688h-3.424c-8.803 0-16.418 6.157-18.234 14.763l-9.572 45.059 15.37 2.938 9.293-26.307z"
                  fill="#222325"
                />
                <path
                  d="M98.323 88.038a1.398 1.398 0 10-.002-2.797 1.398 1.398 0 00.002 2.797zm0 6.227a1.398 1.398 0 10-.002-2.797 1.398 1.398 0 00.002 2.797zM81.206 18c4.978 0 9.013-4.04 9.013-9.025S86.184-.051 81.206-.051s-9.013 4.041-9.013 9.026c0 4.985 4.035 9.026 9.013 9.026z"
                  fill="#222325"
                />
                <path
                  d="M223.663 79.572h-36.89v43.45h36.89v-43.45zm-65.395 43.45c-7.545 0-13.694-6.157-13.694-13.714 0-6.227 4.123-11.405 9.712-13.084-.699-1.679-1.118-3.498-1.118-5.457 0-7.557 6.148-13.714 13.694-13.714 1.257 0 2.515.21 3.703.49-.07-.7-.14-1.33-.14-2.03 0-8.045 6.497-14.552 14.532-14.552a14.46 14.46 0 0110.27 4.268l-36.959 57.793zm49.954-44.15c6.791 0 12.297-5.513 12.297-12.314 0-6.8-5.506-12.314-12.297-12.314s-12.296 5.513-12.296 12.314 5.505 12.314 12.296 12.314zm-13.693.7v43.45m7.336-43.45v43.45m7.405-43.45v43.45m7.336-43.45v43.45M111.179 83.42v5.877s11.737 17.352 10.968 33.515M80.088 85.24v5.457s-11.807 8.326-16.069 18.121m16.069-18.051l31.091-1.47m-9.572-5.877l.838 16.722c.14 2.449-1.607 4.618-4.052 5.038l.978 17.632m-6.847-98.374a5.733 5.733 0 005.73-5.738 5.733 5.733 0 00-5.73-5.737 5.733 5.733 0 00-5.729 5.737 5.733 5.733 0 005.73 5.738zM54.308 93.076l-5.03 22.949c-1.049 3.218-10.97 1.399-15.93 6.927"
                  stroke="#222325"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M68.35 95.734l-9.431 28.897c-.629 1.329-1.817 3.918-6.987 4.618-5.17.699-8.593 2.938-9.99 1.749-2.725-2.239 7.335-5.108 8.523-6.227 1.956-1.819-1.048-1.749-1.048-1.749H20.562m254.662 0H58.919m94.668-66.119c10.34-3.289 24.593-18.542 26.13-18.822 1.537-.28 6.777 4.688 9.502 3.499 2.725-1.19-2.376-4.198-3.494-5.458-1.187-1.329-1.187-4.477 1.677-7.136 2.935-2.59 5.31-3.359 6.568-2.38 1.676 1.26 0 3.71 2.096 3.919 2.096.21 2.794-4.758 1.327-7.067-1.677-2.518-5.519-2.448-9.082-.28m-36.82 16.582c3.354-.14 14.532-7.346 19.982-12.663 5.03-4.828 14.881-17.212 15.79-18.192.908-.98 2.585.42.978 3.498-1.607 3.079-4.961 7.487-4.961 7.487"
                  stroke="#222325"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M188.59 11.704c1.188-1.4 3.633-4.338 4.192-4.478.559-.14 2.375.42.349 4.548s-7.056 10.215-7.056 10.215"
                  stroke="#222325"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M189.638 17.301c1.886-1.819 6.917-7.346 8.104-8.046 1.188-.63 2.376.84.42 3.918-1.887 3.149-6.428 8.606-6.428 8.606"
                  stroke="#222325"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M95.668 13.943s-1.816 6.996-8.174 7.416c0 0-2.236-4.268.559-6.507 2.795-2.239 6.428-1.959 7.615-.91z"
                  fill="#222325"
                />
              </g>
              <defs>
                <clipPath id="clip0_6361_76184">
                  <path
                    fill="#fff"
                    transform="translate(.5)"
                    d="M0 0h297v137H0z"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Congratulations!</CardTitle>
            </CardHeader>
            {user?.isVerifiedPhoneNumber ? (
              <CardContent>
                <p className="mb-4 font-semibold">
                  Your phone number has been verified.
                </p>
                <p className="mb-4">
                  You can now start selling on Fiverr. Good luck with your Gig!
                </p>
                <p className="text-sm text-gray-500">
                  Your phone number remains private and is not used for
                  marketing purposes. See more in our
                  <Link href="#" className="ml-1 text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </CardContent>
            ) : (
              <CardContent>
                <p className="mb-4 font-semibold">
                  You&apos;re almost done with your first Gig.
                </p>
                <p className="mb-4">
                  Before you start selling on Fiverr, there is one last thing we
                  need you to do: The security of your account is important to
                  us. Therefore, we require all our sellers to verify their
                  phone number before we can publish their first Gig.
                </p>
                <p className="text-sm text-gray-500">
                  Your phone number remains private and is not used for
                  marketing purposes. See more in our
                  <Link href="#" className="ml-1 text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </CardContent>
            )}
          </Card>

          <div className="flex items-center justify-between">
            <Link href="#" className="text-green-500 hover:underline">
              Back
            </Link>
            {!user?.isVerifiedPhoneNumber ? (
              <Button
                className="bg-gray-900 text-white"
                onClick={() => setIsOpen(true)}
                variant="default"
              >
                Verify Now
              </Button>
            ) : (
              <Button
                className="bg-gray-900 text-white"
                onClick={handlePublishGig}
                variant="default"
              >
                publish
              </Button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
