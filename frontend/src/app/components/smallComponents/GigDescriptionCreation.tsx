import React from "react";
import RichTextEditor from "../RichTextEditor";

export default function GigDescriptionCreation() {
  const [description, setDescription] = React.useState("");
  //   console.log(description);
  return (
    <div>
      <RichTextEditor setDescription={setDescription} />
    </div>
  );
}
