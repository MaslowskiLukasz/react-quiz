export const decodeText = (text: string): string => {
	const textarea = document.createElement('textarea');
	textarea.innerHTML = text;
	return textarea.value;
};
