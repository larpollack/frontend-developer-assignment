import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
	styles: {
		global: {
			"html, body": {
				backgroundColor: "#ecebe8",
			},
		},
	},
	components: {
		Input: {
			variants: {
				rounded: {
					field: {
						borderRadius: "full",
						border: "1px solid",
						borderColor: "gray.300",
					},
				},
			},
		},
	},
});

export default customTheme;
