import Client from "../Client";

export default function TestWithId() {
  console.log("TestWithId IS RERENDERING");
  return (
    <div>
      <Client key="client" />
    </div>
  );
}
