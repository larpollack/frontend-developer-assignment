test("getData transforms recipients data into an object", () => {
	const recipientsData = [
		{ email: "test1@example.com", isSelected: false },
		{ email: "test2@example.com", isSelected: true },
	];

	jest.doMock("./assets/recipientsData.json", () => recipientsData);

	const result = require("./data").getData();

	expect(result).toEqual({
		"test1@example.com": { email: "test1@example.com", isSelected: false },
		"test2@example.com": { email: "test2@example.com", isSelected: true },
	});
});
