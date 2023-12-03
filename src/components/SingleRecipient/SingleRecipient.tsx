import type { Recipient } from "../helpers";
import { Box } from "@chakra-ui/react";

const SingleRecipient = ({
	recipient,
	onClick,
}: {
	recipient: Recipient;
	onClick: () => void;
}) => {
	return (
		<Box
			display="flex"
			p={2}
			paddingLeft={[0, 4, 6]}
			fontSize={["xs", "sm", "md"]}
			_hover={{
				background: "orange.200",
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			{recipient.email}
		</Box>
	);
};

export default SingleRecipient;
