import { groupByDomain, groupBySelection } from "./helpers";
import "@testing-library/jest-dom";

test("groupByDomain groups recipients by domain", () => {
	const recipients = [
		{ email: "test1@example.com", isSelected: false },
		{ email: "test2@example.com", isSelected: true },
		{ email: "test3@another.com", isSelected: false },
	];

	const result = groupByDomain(recipients);

	expect(result.get("example.com")).toEqual({
		domain: "example.com",
		isOpen: true,
		recipients: [
			{ email: "test1@example.com", isSelected: false },
			{ email: "test2@example.com", isSelected: true },
		],
	});

	expect(result.get("another.com")).toEqual({
		domain: "another.com",
		isOpen: true,
		recipients: [{ email: "test3@another.com", isSelected: false }],
	});
});

test("groupBySelection groups recipients by selection", () => {
	const recipients = {
		"test1@example.com": { email: "test1@example.com", isSelected: false },
		"test2@example.com": { email: "test2@example.com", isSelected: true },
		"test3@another.com": { email: "test3@another.com", isSelected: false },
	};

	const [available, selected] = groupBySelection(recipients);

	expect(available).toEqual([
		{ email: "test1@example.com", isSelected: false },
		{ email: "test3@another.com", isSelected: false },
	]);

	expect(selected).toEqual([{ email: "test2@example.com", isSelected: true }]);
});
