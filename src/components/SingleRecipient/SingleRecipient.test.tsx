import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SingleRecipient from "./SingleRecipient";

test("renders recipient email and responds to click events", () => {
	const handleClick = jest.fn();
	const recipient = { email: "test@example.com", isSelected: false };

	render(<SingleRecipient recipient={recipient} onClick={handleClick} />);

	expect(screen.getByText("test@example.com")).toBeInTheDocument();

	userEvent.click(screen.getByText("test@example.com"));
	expect(handleClick).toHaveBeenCalledTimes(1);
});
