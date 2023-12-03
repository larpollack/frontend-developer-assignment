export interface Recipient {
	email: string;
	isSelected: boolean;
}

export interface DomainName {
	domain: string;
	isOpen: boolean;
	recipients: Recipient[];
}

export const groupByDomain = (
	recipients: Recipient[]
): Map<string, DomainName> => {
	return recipients.reduce(
		(acc: Map<string, DomainName>, recipient: Recipient) => {
			const domain = recipient.email.split("@")[1];
			const domainData = acc.get(domain) || {
				domain,
				isOpen: true,
				recipients: [],
			};
			domainData.recipients.push(recipient);
			acc.set(domain, domainData);
			return acc;
		},
		new Map<string, DomainName>()
	);
};

export const groupBySelection = (
	recips: {
		[key: string]: Recipient;
	} = {}
): [Recipient[], Recipient[]] => {
	return Object.values(recips).reduce(
		([avail, selected], recip) => {
			if (recip.isSelected) {
				selected.push(recip);
			} else {
				avail.push(recip);
			}
			return [avail, selected];
		},
		[[], []]
	);
};
