import { PrimaryButton, SolidButton } from "mirr-ui";
import "./App.css";
import "mirr-ui/styles";

function App() {
  return (
    <>
      <button>Click me</button>
      <SolidButton label="Click me" />
      <PrimaryButton theme="dark" onClick={() => alert("clicked")}>
        Click me
      </PrimaryButton>
    </>
  );
}

export default App;
