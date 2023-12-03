import React, { useState } from "react";
import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	List,
	ListItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface OptionType {
	isSelected: boolean;
	email: string;
}

const Search = ({
	options,
	onSelect,
}: {
	options: OptionType[];
	onSelect: (option: OptionType) => void;
}) => {
	const [searchValue, setSearchValue] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (email: string) => {
		const selectedVal = email;
		const selectedOpt = options.find(
			(option: OptionType) => option.email === selectedVal
		);
		onSelect(selectedOpt);
	};

	const handleSearch = (event) => {
		const searchVal = event.target.value;
		setSearchValue(searchVal);
		setShowSuggestions(searchVal.length > 0);
	};

	const filteredOptions = options.filter(
		(option) =>
			!option.isSelected &&
			option.email.toLowerCase().includes(searchValue.toLowerCase())
	);

	const handleFocus = (open: boolean) => {
		filteredOptions.length > 0 && setIsOpen(open);
	};

	const listStyles = isOpen
		? { borderWidth: "1px", borderColor: "#E2E8F0" }
		: {
				borderWidth: "0",
				borderColor: "transparent",
				border: "none",
		  };
	return (
		<>
			<InputGroup>
				<InputLeftElement pointerEvents="none">
					<SearchIcon
						color="gray.500"
						boxSize={[2.5, 3, 4]}
						ml={[3.5, 4, 3]}
						mt={[10, 2, 2]}
						mr={[1, 4, 2]}
					/>
				</InputLeftElement>
				<Input
					value={searchValue}
					size="sm"
					variant="rounded"
					placeholder="Search"
					w={"60%"}
					m={[null, 2, 2]}
					mt={[6, null, null]}
					ml={[4, null, null]}
					pl={[4, 5, 6]}
					onChange={handleSearch}
					fontSize={["xs", "sm", "md"]}
					onFocus={() => handleFocus(true)}
					onBlur={() => handleFocus(false)}
				/>
			</InputGroup>
			<Box
				position="absolute"
				left={25}
				top={85}
				bg="white"
				w={[100, 200, 300]}
				maxH={200}
				overflowY="auto"
				zIndex={6}
			>
				<List h="fit-content" borderRadius="5px" {...listStyles}>
					{isOpen &&
						showSuggestions &&
						filteredOptions.map((recipient) => {
							return (
								<ListItem
									key={recipient.email}
									display="flex"
									px={2}
									py={1}
									borderBottom="1px solid #E2E8F0)"
									fontSize={["xs", "sm", "md"]}
									_hover={{
										background: "orange.200",
										cursor: "pointer",
									}}
									onMouseDown={() => handleSelect(recipient.email)}
								>
									{recipient.email}
								</ListItem>
							);
						})}
				</List>
			</Box>
		</>
	);
};

export default Search;
