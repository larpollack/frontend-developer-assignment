import SingleRecipient from "../SingleRecipient/SingleRecipient";
import type { DomainName, Recipient } from "../helpers";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";
import { useState } from "react";

const AccordionItems = ({
	org,
	handleToggle,
	handleSelect,
}: {
	org: DomainName;
	handleToggle: (domains: DomainName) => void;
	handleSelect: (recips: Recipient[]) => void;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const handleToggleClick = () => {
		handleToggle(org);
		setIsExpanded(!isExpanded);
	};
	return (
		<Accordion allowToggle key={org.domain}>
			<AccordionItem>
				<h2>
					<AccordionButton
						onClick={handleToggleClick}
						_hover={{ bg: "orange.200" }}
					>
						<Box
							as="span"
							flex="1"
							textAlign="left"
							fontSize={["xs", "sm", "md"]}
						>
							{org.domain}
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				{isExpanded && (
					<AccordionPanel>
						{org.recipients.map((recipient) => (
							<SingleRecipient
								key={recipient.email}
								recipient={recipient}
								onClick={() => handleSelect([recipient])}
							/>
						))}
					</AccordionPanel>
				)}
			</AccordionItem>
		</Accordion>
	);
};

export default AccordionItems;
