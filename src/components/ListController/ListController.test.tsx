import { render, screen } from "@testing-library/react";
import ListController from "./ListController";
import "@testing-library/jest-dom";

describe("ListController", () => {
	it("renders without crashing", () => {
		render(<ListController />);
		expect(screen.getByText("Available Recipients")).toBeInTheDocument();
		expect(screen.getByText("Selected Recipients")).toBeInTheDocument();
	});
});
