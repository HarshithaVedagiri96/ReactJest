import { render} from "@testing-library/react";
import App from "./App";

describe("testing the app component", () => {

  test("header render React & Jest in the document", () => {
    const component = render(<App />);
    const linkElement = component.getByText(/React & Jest/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("render login component in doucment", () => {
    // const component = render(<App/>);
    const { getByLabelText } = render(<App />);
    const childElement = getByLabelText("Email");
    expect(childElement).toBeTruthy();
    //expect(childElement).toBeInTheDocument();
  });
  
});
