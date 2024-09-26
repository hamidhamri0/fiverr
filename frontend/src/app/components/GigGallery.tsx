"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/app/components/button";
import { Card, CardContent } from "@/app/components/card";
import { Input } from "@/app/components/input";
import { Label } from "@/app/components/label";
import { ImageIcon, VideoIcon, FileIcon, XCircleIcon } from "lucide-react";
import SpinnerCenterWithBlur from "./ui/SpinnerCenterWithBlur";
import { GigData } from "@/types/gig.interface";
import { toast } from "react-hot-toast";

type FormData = {
  images: FileList[];
  video: FileList;
  documents: FileList[];
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

const CircularProgressBar = ({ progress }: { progress: number }) => {
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-14 w-14">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="text-white"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-green-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-semibold text-green-500">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default function GigGallery({ onClick }: { onClick: () => void }) {
  const {
    control,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useFormContext<GigData>();

  const gig = getValues();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDatabaseUploading, setIsDataBaseUploading] = useState(false);

  console.log(errors, "ERRORS");

  const generateThumbnail = (url: string) => {
    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.crossOrigin = "anonymous";
    videoElement.onloadedmetadata = () => {
      videoElement.currentTime = 1;
    };
    videoElement.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/png");
        setValue("videoUrlPreview", {
          videoUrl: url,
          thumbnail: imageUrl,
        });
      }
    };
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      generateThumbnail(videoUrl);
    }
  };

  const onSubmit = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();

    for (let i = 0; i < gig.imageUrls.length; i++) {
      let image = gig.imageUrls?.[i];
      let imageUrl = gig.imageUrlsPreview?.[i];

      if (image instanceof File) {
        formData.append(`image${i}`, image);
      } else if (imageUrl) {
        formData.append(`image${i}Url`, imageUrl);
      }
    }

    if (gig.videoUrl instanceof File) {
      formData.append("video", gig.videoUrl);
    } else if (gig.videoUrlPreview) {
      formData.append("videoUrl", JSON.stringify(gig.videoUrlPreview));
    }

    for (let i = 0; i < gig.pdfUrls.length; i++) {
      const pdf = gig.pdfUrls[i];
      const pdfUrl = gig.pdfUrlsPreview[i];

      if (pdf instanceof File) {
        formData.append(`pdf${i}`, pdf);
      } else if (pdfUrl) {
        formData.append(`pdf${i}Url`, pdfUrl);
      }
    }

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (progressEvent) => {
      if (progressEvent.loaded == progressEvent.total) {
        setIsDataBaseUploading(true);
        setIsUploading(false);
        setUploadProgress(0);
      }
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total!,
      );
      setUploadProgress(progress);
    };

    xhr.onloadend = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        toast.success("files uploaded successfully");
        setIsDataBaseUploading(false);
        onClick();
      } else {
        let error = JSON.parse(xhr.responseText).message;
        toast.error(error);
        setIsDataBaseUploading(false);
        setIsUploading(false);
        setUploadProgress(0);
      }
    };

    xhr.open("POST", `http://localhost:3001/cloudinary/files/${gig.id}`, true);
    xhr.send(formData);
  };

  function disabledUnusedInputs(
    type: "imageUrlsPreview" | "pdfUrlsPreview",
    index: number,
  ) {
    return gig[type]?.[Math.max(0, index - 1)] == undefined && index !== 0;
  }

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    type: "imageUrlsPreview" | "videoUrlPreview" | "pdfUrlsPreview",
    index?: number,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      field.onChange(file);
      console.log(field, file);
      if (type === "imageUrlsPreview" || type === "videoUrlPreview") {
        if (type === "videoUrlPreview") {
          handleVideoUpload(e);
        } else {
          const newPreviewUrl = URL.createObjectURL(file);
          setValue("imageUrlsPreview", {
            ...getValues("imageUrlsPreview"), // Preserve existing values
            [index as number]: newPreviewUrl, // Set key 1 to "hamid"
          });
        }
      } else {
        setValue("pdfUrlsPreview", {
          ...getValues("pdfUrlsPreview"),
          [index as number]: file.name,
        });
      }
    }
  };

  function handleDeleteImage(index: number) {
    setValue(
      `imageUrlsPreview`,
      gig[`imageUrlsPreview`]?.filter((_, i) => i !== index),
    );
    setValue(`imageUrls.${index}`, undefined);
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-2 text-3xl font-bold">
        Showcase Your Services In A Gig Gallery
      </h1>
      <p className="mb-6 text-base text-gray-600">
        Encourage buyers to choose your Gig by featuring a variety of your work.
      </p>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
              i
            </span>
            <p>
              To comply with Fiverr`&apos;`s terms of service, make sure to
              upload only content you either own or you have the permission or
              license to use.
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Gig image guidelines</h2>
          <div className="mb-6 h-px w-full bg-gray-200"></div>

          <h3 className="mb-1 text-lg font-semibold">Images (up to 3)</h3>
          <p className="mb-4 text-base text-gray-600">
            Get noticed by the right buyers with visual examples of your
            services.
          </p>
          <div className="grid grid-cols-3 gap-6 md:grid-cols-2 md:gap-4 sm:grid-cols-1 sm:gap-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="relative flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center"
              >
                {gig[`imageUrlsPreview`]?.[index] &&
                  !disabledUnusedInputs("imageUrlsPreview", index) && (
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute right-2 top-2 z-10 rounded-full bg-white p-1 text-gray-500 hover:text-red-500 focus:outline-none"
                      aria-label={`Delete image ${index + 1}`}
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  )}
                <Controller
                  name={`imageUrls.${index}`}
                  control={control}
                  rules={{
                    required: !gig[`imageUrlsPreview`][0]
                      ? "At least one image is required"
                      : false,
                    validate: {
                      fileSize: (file) => {
                        return (
                          (!file ||
                            file?.size <= MAX_FILE_SIZE ||
                            gig[`imageUrlsPreview`][index] ||
                            "File size must be less than 5MB") === true ||
                          "File size must be less than 5MB"
                        );
                      },
                      fileType: (file) => {
                        return (
                          (!file ||
                            ACCEPTED_IMAGE_TYPES.includes(file?.type) ||
                            gig[`imageUrlsPreview`][index] ||
                            "Unsupported file type") === true ||
                          "Unsupported file type"
                        );
                      },
                    },
                  }}
                  render={({ field }) => (
                    <Label
                      htmlFor={`image-${index}`}
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                    >
                      {gig[`imageUrlsPreview`]?.[index] ? (
                        <img
                          src={gig[`imageUrlsPreview`][index]}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : !disabledUnusedInputs("imageUrlsPreview", index) ? (
                        <>
                          <ImageIcon className="mb-2 h-12 w-12 text-gray-400" />
                          <p className="text-sm text-blue-600">
                            Drag & drop a Photo or Browse
                          </p>
                        </>
                      ) : null}
                      <Input
                        id={`image-${index}`}
                        type="file"
                        className="hidden"
                        disabled={disabledUnusedInputs(
                          "imageUrlsPreview",
                          index,
                        )}
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        onChange={(e) => {
                          handleFileChange(e, field, "imageUrlsPreview", index);
                        }}
                      />
                    </Label>
                  )}
                />
                {errors.imageUrls && errors.imageUrls?.[index] && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.imageUrls[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-1 text-lg font-semibold">Video (one only)</h3>
          <p className="mb-1 text-base text-gray-600">
            Capture buyers`&apos;` attention with a video that showcases your
            service.
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Please choose a video shorter than 75 seconds and smaller than 50MB
          </p>
          <div className="flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center">
            <Controller
              name="videoUrl"
              control={control}
              rules={{
                validate: {
                  fileSize: (file) => {
                    console.log(file instanceof File);
                    if (!(file instanceof File)) return true;
                    return (
                      file?.size <= 50 * 1024 * 1024 ||
                      "File size must be less than 50MB"
                    );
                  },
                  fileType: (file) => {
                    if (!(file instanceof File)) return true;
                    return (
                      !file ||
                      ACCEPTED_VIDEO_TYPES.includes(file?.type) ||
                      "Unsupported file type"
                    );
                  },
                },
              }}
              render={({ field }) => (
                <Label
                  htmlFor="video"
                  className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                >
                  {gig["videoUrlPreview"]?.thumbnail ? (
                    <div className="relative h-full w-full">
                      <>
                        <img
                          src={gig["videoUrlPreview"].thumbnail}
                          alt="Video thumbnail"
                          className="h-full w-full object-cover"
                        />
                      </>
                      {!gig["videoUrlPreview"]?.thumbnail && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <VideoIcon className="h-16 w-16 text-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <VideoIcon className="mb-2 h-12 w-12 text-gray-400" />
                      <p className="text-sm text-blue-600">
                        Drag & drop a Video or Browse
                      </p>
                    </>
                  )}
                  <Input
                    id="video"
                    type="file"
                    className="hidden"
                    accept={ACCEPTED_VIDEO_TYPES.join(",")}
                    onChange={(e) =>
                      handleFileChange(e, field, "videoUrlPreview")
                    }
                  />
                </Label>
              )}
            />
            {errors.videoUrl && (
              <p className="mt-2 text-xs text-red-500">
                {errors.videoUrl.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-1 text-lg font-semibold">Documents (up to 2)</h3>
          <p className="mb-4 text-base text-gray-600">
            Show some of the best work you created in a document (PDFs only).
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-4 sm:gap-2">
            {[0, 1].map((index) => (
              <div
                key={index}
                className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center"
              >
                <Controller
                  name={`pdfUrls.${index}` as any}
                  control={control}
                  rules={{
                    validate: {
                      fileSize: (file) =>
                        !file ||
                        file?.size <= MAX_FILE_SIZE ||
                        "File size must be less than 5MB",
                      fileType: (file) =>
                        !file ||
                        file?.type === "application/pdf" ||
                        "Only PDF files are allowed",
                    },
                  }}
                  render={({ field }) => (
                    <Label
                      htmlFor={`document-${index}`}
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                    >
                      {gig[`pdfUrlsPreview`] && gig[`pdfUrlsPreview`][index] ? (
                        <>
                          <FileIcon className="mb-2 h-12 w-12 text-gray-400" />
                          <p className="text-sm text-blue-600">
                            {
                              gig[`pdfUrlsPreview`][index]
                                .split("/")
                                .pop()
                                ?.split("?")[0]
                            }
                          </p>
                        </>
                      ) : !disabledUnusedInputs("pdfUrlsPreview", index) ? (
                        <>
                          <FileIcon className="mb-2 h-12 w-12 text-gray-400" />
                          <p className="text-sm text-blue-600">
                            Drag & drop a PDF or Browse
                          </p>
                        </>
                      ) : null}
                      <Input
                        id={`document-${index}`}
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        disabled={disabledUnusedInputs("pdfUrlsPreview", index)}
                        onChange={(e) =>
                          handleFileChange(e, field, "pdfUrlsPreview", index)
                        }
                      />
                    </Label>
                  )}
                />
                {errors.pdfUrls && errors.pdfUrls[index] && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.pdfUrls[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-stretch md:gap-4">
          <Button type="button" variant="link" className="text-green-500">
            Back
          </Button>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="bg-gray-900 text-white"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Save & Continue"}
          </Button>
        </div>
      </div>

      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <CircularProgressBar progress={uploadProgress} />
        </div>
      )}

      {isDatabaseUploading && <SpinnerCenterWithBlur />}
    </div>
  );
}
