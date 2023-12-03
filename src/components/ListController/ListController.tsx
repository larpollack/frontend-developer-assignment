import { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	SimpleGrid,
	Box,
	Divider,
} from "@chakra-ui/react";

import RecipientList from "../RecipientList/RecipientList";

import { getData } from "../../data";
import { type Recipient, groupBySelection } from "../helpers";
import Search from "../Search/Search";

const ListController = () => {
	const [recipients, setRecipients] = useState<{ [key: string]: Recipient }>(
		{}
	);
	const [availRecipients, setAvailRecipients] = useState([]);
	const [selectedRecipients, setSelectedRecipients] = useState([]);

	useEffect(() => {
		const recipients = getData();
		setRecipients(recipients);
	}, []);

	useEffect(() => {
		const [avail, selected] = groupBySelection(recipients);
		setAvailRecipients(avail);
		setSelectedRecipients(selected);
	}, [recipients]);

	const select = (selectedRs: Recipient[]) => {
		setRecipients((prevRecipients) => {
			const updated = { ...prevRecipients };
			selectedRs.forEach((recips) => {
				updated[recips.email] = { ...recips, isSelected: true };
			});
			return updated;
		});
	};

	const deselect = (deselectedRs: Recipient[]) => {
		setRecipients((prevRecipients) => {
			const updated = { ...prevRecipients };
			deselectedRs.forEach((recips) => {
				updated[recips.email] = { ...recips, isSelected: false };
			});
			return updated;
		});
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			padding={10}
		>
			<SimpleGrid columns={2} gap={[2, 3, 6]}>
				<Card w={[175, 300, 500]} h={550} bg="white">
					<CardHeader h={50} fontSize={["sm", "md", "lg"]}>
						<Box paddingBottom={4}>Available Recipients</Box>
					</CardHeader>
					<Divider color="gray.200" />
					<Search
						options={availRecipients}
						onSelect={(recipient) =>
							select([{ ...recipient, isSelected: false }])
						}
					/>
					<CardBody>
						<RecipientList recipients={availRecipients} handleSelect={select} />
					</CardBody>
				</Card>
				<Card w={[175, 300, 500]} h={550} bg="white">
					<CardHeader h={50} fontSize={["sm", "md", "lg"]}>
						Selected Recipients
					</CardHeader>
					<Divider color="gray.200" />
					<CardBody>
						<RecipientList
							recipients={selectedRecipients}
							handleSelect={deselect}
						/>
					</CardBody>
				</Card>
			</SimpleGrid>
		</Box>
	);
};
export default ListController;
