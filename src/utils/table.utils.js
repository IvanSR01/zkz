export const formatDateUtils = (dateString) => {
	if (!dateString || (typeof dateString !== "string" && !(dateString instanceof Date))) {
			return "";
	}

	if (dateString instanceof Date) {
			dateString = dateString.toISOString();
	}

	let year, month, day;

	if (dateString.includes("T")) {
			const datePart = dateString.split("T")[0];
			[year, month, day] = datePart.split("-");
	} else if (dateString.includes("-")) {
			[year, month, day] = dateString.split("-");
	} else if (dateString.includes(".")) {
			[day, month, year] = dateString.split(".");
	} else {
			return "";
	}

	const months = [
			"января", "февраля", "марта", "апреля", "мая", "июня",
			"июля", "августа", "сентября", "октября", "ноября", "декабря"
	];

	const monthName = months[parseInt(month, 10) - 1];

	return `${parseInt(day, 10)} ${monthName} ${year} г.`;
};

export const pixelsToTwips = (pixels) => Math.round(pixels * 15); // 1 пиксель ≈ 15 твипов
  
export const parseProtocolTitle = (title) => {
	// Приведение строки к верхнему регистру
	const upperTitle = title.toUpperCase().trim();
	
	// Регулярное выражение для поиска "ПРОТОКОЛ №" и оставшейся части строки
	const regex = /^(ПРОТОКОЛ\s*№\d+)\s+(.+)$/i;
	
	// Применение регулярного выражения к строке
	const match = upperTitle.match(regex);
	if (match) {
			return {
					protocolNumber: match[1],
					protocolName: match[2]
			};
	} else {
			return {
					protocolNumber: '',
					protocolName: title
			};
	}
};