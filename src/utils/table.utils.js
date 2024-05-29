// Утилита для форматирования даты в строку формата "день месяц год".

export const formatDateUtils = (dateString) => {
  // Проверяем, что dateString не пустой и является строкой или объектом Date
  if (!dateString || (typeof dateString !== "string" && !(dateString instanceof Date))) {
    return "";
  }

  // Преобразуем объект Date в строку ISO, если необходимо
  if (dateString instanceof Date) {
    dateString = dateString.toISOString();
  }

  let year, month, day;

  // Разделяем строку на компоненты даты в зависимости от формата
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

  // Массив названий месяцев на русском языке
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  // Преобразуем номер месяца в название месяца
  const monthName = months[parseInt(month, 10) - 1];

  // Форматируем дату в строку вида "день месяц год"
  return `${parseInt(day, 10)} ${monthName} ${year} г.`;
};

// Утилита для преобразования пикселей в твипы (1 пиксель ≈ 15 твипов)
export const pixelsToTwips = (pixels) => Math.round(pixels * 15);

// Утилита для парсинга заголовка протокола
export const parseProtocolTitle = (title) => {
  // Приведение строки к верхнему регистру и удаление лишних пробелов
  const upperTitle = title.toUpperCase().trim();

  // Регулярное выражение для поиска "ПРОТОКОЛ №" и оставшейся части строки
  const regex = /^(ПРОТОКОЛ\s*№\d+)\s+(.+)$/i;

  // Применение регулярного выражения к строке
  const match = upperTitle.match(regex);
  if (match) {
    // Если регулярное выражение нашло совпадение, возвращаем разобранные части
    return {
      protocolNumber: match[1],
      protocolName: match[2]
    };
  } else {
    // Если регулярное выражение не нашло совпадение, возвращаем оригинальный заголовок
    return {
      protocolNumber: '',
      protocolName: title
    };
  }
};
