"use client";

import Button from "@/Components/Atoms/Btn";
import { useState } from "react";

export default () => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-8">
      <h1 className="mb-4 text-2xl font-bold">Client-side Component</h1>
      <Button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Client Component
      </Button>
      {show && (
        <div className="mt-4 rounded-md border p-4">
          <h2 className="mb-2 text-xl font-semibold">Client Component</h2>
          <p>This component is rendered on the client-side.</p>
        </div>
      )}
    </div>
  );
};

import { Suspense, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

// Simulated data fetching functions
const fetchParentData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Parent Data" }), 5000),
  );
const fetchChildData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Child Data" }), 5000),
  );
const fetchGrandchildData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Grandchild Data" }), 0),
  );

// GrandchildComponent
const GrandchildComponent = async () => {
  const grandchildData = await fetchGrandchildData();
  return (
    <div className="rounded-md border p-4">
      <h4 className="text-md mb-2 font-semibold">Grandchild Component</h4>
      <p>{grandchildData.name}</p>
    </div>
  );
};

// ChildComponent
const ChildComponent = async () => {
  const childData = await fetchChildData();
  return (
    <div className="mb-4 rounded-md border p-4">
      <h3 className="mb-2 text-lg font-semibold">Child Component</h3>
      <p className="mb-4">{childData.name}</p>
      <Suspense
        fallback={
          <div className="h-24 animate-pulse rounded-md bg-gray-200"></div>
        }
      >
        <GrandchildComponent />
      </Suspense>
    </div>
  );
};

// ParentComponent
const ParentComponent = async () => {
  const parentData = await fetchParentData();
  return (
    <div className="mb-4 rounded-md border p-4">
      <h2 className="mb-2 text-xl font-semibold">Parent Component</h2>
      <p className="mb-4">{parentData.name}</p>
      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-md bg-gray-200"></div>
        }
      >
        <ChildComponent />
      </Suspense>
    </div>
  );
};

// Main component
export default function Component() {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Nested Server Components with Suspense
      </h1>

      <div className="mb-8">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-md bg-gray-200"></div>
          }
        >
          <ParentComponent />
          <Client />
        </Suspense>
      </div>
    </div>
  );
}

///////////////////////////////////////////////////
/*





SOLUTION 





*/

///////////////////////////////////////////////////////

import { Suspense } from "react";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Loader2 } from "lucide-react";

// Simulated data fetching functions
const fetchParentData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Parent Data" }), 5000),
  );
const fetchChildData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Child Data" }), 5000),
  );
const fetchGrandchildData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Grandchild Data" }), 0),
  );

// GrandchildComponent
const GrandchildComponent = async () => {
  const grandchildData = await fetchGrandchildData();
  return (
    <div className="rounded-md border p-4">
      <h4 className="text-md mb-2 font-semibold">Grandchild Component</h4>
      <p>{grandchildData.name}</p>
    </div>
  );
};

// ChildComponent
const ChildComponent = async ({
  childDataPromise,
}: {
  childDataPromise: Promise<{ name: string }>;
}) => {
  const childData = await childDataPromise;
  return (
    <div className="mb-4 rounded-md border p-4">
      <h3 className="mb-2 text-lg font-semibold">Child Component</h3>
      <p className="mb-4">{childData.name}</p>
      <Suspense
        fallback={
          <div className="h-24 animate-pulse rounded-md bg-gray-200"></div>
        }
      >
        <GrandchildComponent />
      </Suspense>
    </div>
  );
};

// ParentComponent
const ParentComponent = async ({
  parentDataPromise,
  childDataPromise,
}: {
  parentDataPromise: Promise<{ name: string }>;
  childDataPromise: Promise<{ name: string }>;
}) => {
  const parentData = await parentDataPromise;
  return (
    <div className="mb-4 rounded-md border p-4">
      <h2 className="mb-2 text-xl font-semibold">Parent Component</h2>
      <p className="mb-4">{parentData.name}</p>
      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-md bg-gray-200"></div>
        }
      >
        <ChildComponent childDataPromise={childDataPromise} />
      </Suspense>
    </div>
  );
};

// Main component
export default function Component() {
  const parentDataPromise = fetchParentData();
  const childDataPromise = fetchChildData();

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Nested Server Components with Suspense
      </h1>
      <div className="mb-8">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-md bg-gray-200"></div>
          }
        >
          <ParentComponent
            parentDataPromise={parentDataPromise}
            childDataPromise={childDataPromise}
          />
        </Suspense>
      </div>
    </div>
  );
}
