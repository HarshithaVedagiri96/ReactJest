import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login,{validateEmail} from "../Login";

describe(" Testing Login Component",()=>{

  test("render login form with 2 buttons", async ()=>{
    render(<Login />);
    const buttonsCount = await screen.findAllByRole("button");
    expect(buttonsCount).toHaveLength(2);
  });

  test("should fail on email validation", ()=>{
    const testEmail = "Harshi.com";
    expect(validateEmail(testEmail)).toBe(false);
    // or  ....    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("email input field should have accept email",()=>{
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    // using use event to see if the user types email
    userEvent.type(email, "Harshi")
    expect(email.value).not.toMatch("harshitha@gmail.com");
  });

  test("password input should have type = password",()=>{
    render(<Login />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type","password");
  });

  test("should be able to reset the form",()=>{
    const {getByTestId} = render(<Login />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const resetButton = getByTestId("reset");

    fireEvent.click(resetButton);
    // or...   userEvent.click(resetButton);
    expect(emailInput.value).toMatch("");
    expect(passwordInput.value).toMatch("");
  });

  test("should be able to submit the form",()=>{
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTestId("submit");

    userEvent.type(emailInput,"harshi@gmail.com");
    userEvent.type(passwordInput,"1234");
    userEvent.click(submitButton);

    const userInfo = screen.getByText("harshi@gmail.com");
    expect(userInfo).toBeInTheDocument();
  });

  test("should be able to display error",()=>{
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTestId("submit");

    userEvent.type(emailInput,"harshi");
    userEvent.type(passwordInput,"1234");
    userEvent.click(submitButton);

    const err = screen.getByText("Email is not valid");
    expect(err).toBeInTheDocument();
  });

});