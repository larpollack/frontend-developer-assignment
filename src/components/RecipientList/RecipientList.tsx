import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import SingleRecipient from "../SingleRecipient/SingleRecipient";
import { type DomainName, type Recipient, groupByDomain } from "../helpers";
import AccordionItems from "../AccordionItems/AccordionItems";

const RecipientList = ({
	recipients,
	handleSelect,
}: {
	recipients: Recipient[];
	handleSelect: (recips: Recipient[]) => void;
}) => {
	const [domains, setDomains] = useState<Map<string, DomainName>>(new Map());

	useEffect(() => {
		const groupedByDomain = groupByDomain(recipients);
		setDomains(groupedByDomain);
	}, [recipients]);

	const toggleDomainName = (domainName: DomainName) => {
		setDomains((prevDomains) => {
			const updated = new Map(prevDomains);
			updated.set(domainName.domain, {
				...domainName,
				isOpen: !domainName.isOpen,
			});
			return updated;
		});
	};

	return (
		<SimpleGrid columns={1}>
			{Array.from(domains.values()).map((domainName) => {
				const [soloRecipient] = domainName.recipients;
				return domainName.recipients.length < 2 ? (
					<SingleRecipient
						key={soloRecipient.email}
						recipient={soloRecipient}
						onClick={() => handleSelect([soloRecipient])}
					/>
				) : (
					<AccordionItems
						key={domainName.domain}
						org={domainName}
						handleToggle={toggleDomainName}
						handleSelect={handleSelect}
					/>
				);
			})}
		</SimpleGrid>
	);
};

export default RecipientList;
