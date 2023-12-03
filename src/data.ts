import recipientsData from "./assets/recipientsData.json";
import type { Recipient } from "./components/helpers";

export const getData = (): { [key: string]: Recipient } => {
	if (!recipientsData) {
		throw new Error("Cannot get recipient data");
	}

	return recipientsData.reduce((obj, recipient) => {
		obj[recipient.email] = recipient;
		return obj;
	}, {} as { [key: string]: Recipient });
};
