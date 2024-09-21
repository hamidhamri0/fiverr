"use client";

import { useState } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import axios from "axios";
import { Button } from "@/ShadComponents/ui/button";
import { Card, CardContent } from "@/ShadComponents/ui/card";
import { Input } from "@/ShadComponents/ui/input";
import { Label } from "@/ShadComponents/ui/label";
import { ImageIcon, VideoIcon, FileIcon } from "lucide-react";
import SpinnerCenterWithBlur from "./ui/SpinnerCenterWithBlur";

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

export default function GigGallery() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<FormData>();
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isUploading, setIsUploading] = useState(false);
  const [isDatabaseUploading, setIsDataBaseUploading] = useState(false);

  const onSubmit = async () => {
    const data = getValues() as FormData;
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();

    if (data.images[0]) {
      console.log("Appending image:", data.images[0]);
      formData.append("image", data.images[0][0]);
    } else {
      console.error("No images found in data");
      setIsUploading(false);
      return;
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
      console.log("Upload complete:", xhr.responseText);
      setIsDataBaseUploading(false);
    };

    xhr.onerror = () => {
      console.error("Upload failed:", xhr.responseText);
      setIsDataBaseUploading(false);
      setIsUploading(false);
      setUploadProgress(0);
    };

    xhr.open("POST", "http://localhost:3001/cloudinary/image", true);
    xhr.send(formData);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    type: string,
    index?: number,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      field.onChange(e.target.files);
      const file = e.target.files[0];
      if (type === "image" || type === "video") {
        if (type === "video") {
          const url = URL.createObjectURL(file);
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
              setPreviewUrls((prevUrls) => ({
                ...prevUrls,
                video: imageUrl,
              }));
            }
          };
          videoElement.onerror = (error) => {
            console.error("Error loading video:", error);
          };
        } else {
          const newPreviewUrl = URL.createObjectURL(file);
          setPreviewUrls((prevUrls) => ({
            ...prevUrls,
            [`${type}${index !== undefined ? index : ""}`]: newPreviewUrl,
          }));
        }
      } else {
        setPreviewUrls((prevUrls) => ({
          ...prevUrls,
          [`${type}${index !== undefined ? index : ""}`]: file.name,
        }));
      }
    }
  };

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
              To comply with Fiverr's terms of service, make sure to upload only
              content you either own or you have the permission or license to
              use.
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
                className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center"
              >
                <Controller
                  name={`images.${index}` as any}
                  control={control}
                  rules={{
                    required:
                      index === 0 ? "At least one image is required" : false,
                    validate: {
                      fileSize: (file) =>
                        !file ||
                        file[0]?.size <= MAX_FILE_SIZE ||
                        "File size must be less than 5MB",
                      fileType: (file) =>
                        !file ||
                        ACCEPTED_IMAGE_TYPES.includes(file[0]?.type) ||
                        "Unsupported file type",
                    },
                  }}
                  render={({ field }) => (
                    <Label
                      htmlFor={`image-${index}`}
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                    >
                      {previewUrls[`image${index}`] ? (
                        <img
                          src={previewUrls[`image${index}`]}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          <ImageIcon className="mb-2 h-12 w-12 text-gray-400" />
                          <p className="text-sm text-blue-600">
                            Drag & drop a Photo or Browse
                          </p>
                        </>
                      )}
                      <Input
                        id={`image-${index}`}
                        type="file"
                        className="hidden"
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        onChange={(e) => {
                          handleFileChange(e, field, "image", index);
                        }}
                      />
                    </Label>
                  )}
                />
                {errors.images && errors.images[index] && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.images[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-1 text-lg font-semibold">Video (one only)</h3>
          <p className="mb-1 text-base text-gray-600">
            Capture buyers' attention with a video that showcases your service.
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Please choose a video shorter than 75 seconds and smaller than 50MB
          </p>
          <div className="flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center">
            <Controller
              name="video"
              control={control}
              rules={{
                validate: {
                  fileSize: (file) =>
                    !file ||
                    file[0]?.size <= 50 * 1024 * 1024 ||
                    "File size must be less than 50MB",
                  fileType: (file) =>
                    !file ||
                    ACCEPTED_VIDEO_TYPES.includes(file[0]?.type) ||
                    "Unsupported file type",
                },
              }}
              render={({ field }) => (
                <Label
                  htmlFor="video"
                  className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                >
                  {previewUrls["video"] ? (
                    <div className="relative h-full w-full">
                      <img
                        src={previewUrls["video"]}
                        alt="Video thumbnail"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <VideoIcon className="h-16 w-16 text-white" />
                      </div>
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
                    onChange={(e) => handleFileChange(e, field, "video")}
                  />
                </Label>
              )}
            />
            {errors.video && (
              <p className="mt-2 text-xs text-red-500">
                {errors.video.message}
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
                  name={`documents.${index}` as any}
                  control={control}
                  rules={{
                    validate: {
                      fileSize: (file) =>
                        !file ||
                        file[0]?.size <= MAX_FILE_SIZE ||
                        "File size must be less than 5MB",
                      fileType: (file) =>
                        !file ||
                        file[0]?.type === "application/pdf" ||
                        "Only PDF files are allowed",
                    },
                  }}
                  render={({ field }) => (
                    <Label
                      htmlFor={`document-${index}`}
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                    >
                      {previewUrls[`document${index}`] ? (
                        <div className="relative h-full w-full">
                          <img
                            src={previewUrls[`document${index}`]}
                            alt={`PDF thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <FileIcon className="h-16 w-16 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <FileIcon className="mb-2 h-12 w-12 text-gray-400" />
                          <p className="text-sm text-blue-600">
                            Drag & drop a PDF or Browse
                          </p>
                        </>
                      )}
                      <Input
                        id={`document-${index}`}
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) =>
                          handleFileChange(e, field, "document", index)
                        }
                      />
                    </Label>
                  )}
                />
                {errors.documents && errors.documents[index] && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.documents[index]?.message}
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
            onClick={() => onSubmit()}
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
