import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  HeightRule,
  HeadingLevel,
  AlignmentType,
  TextRun,
  BorderStyle,
  ImageRun,
} from "docx";
import path from "path";
import {
  formatDateUtils,
  pixelsToTwips,
  parseProtocolTitle,
} from "./table.utils.js";

const tableFileUtils = ({ protocol, order, report }) => {

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${report.title.company}`,
                size: 52, // Увеличиваем размер текста до 26 пунктов
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          ...Array(4).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({
                text: `${report.title.subCompany}`,
                size: 32, // Увеличиваем размер текста до 16 пунктов
                underline: {},
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          ...Array(3).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `Свидетельство о регистрации № 6377-3 от ${formatDateUtils(
                              report.title.dateLicense
                            )}.`,
                            size: 20,
                          }),
                          new TextRun({
                            text: "\nВыдано Управлением энергетического и строительного",
                            size: 20,
                            bold: true,
                          }),
                          new TextRun({
                            text: " надзора Федеральной службы по экологическому,",
                            size: 20,
                          }),
                          new TextRun({
                            text: "\nтехнологическому и атомному надзору г. Москва",
                            size: 20,
                          }),
                          new TextRun({
                            text: "\n\nДействительна до: ",
                            size: 20,
                            bold: true,
                          }),
                          new TextRun({
                            text: `${formatDateUtils(
                              report.title.dateOverLicense
                            )}`,
                            size: 20,
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 61,
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0 },
                      bottom: { style: BorderStyle.NONE, size: 0 },
                      left: { style: BorderStyle.NONE, size: 0 },
                      right: { style: BorderStyle.NONE, size: 0 },
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "" }), // Пустая ячейка для отступа
                    ],
                    width: {
                      size: 0, // Ширина пустой ячейки для отступа
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0 },
                      bottom: { style: BorderStyle.NONE, size: 0 },
                      left: { style: BorderStyle.NONE, size: 0 },
                      right: { style: BorderStyle.NONE, size: 0 },
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "«Утверждаю»", size: 28 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Начальник ЭТЛ ООО «Энергосервис»",
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "_________________ Н.П.Асташко",
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "«___» ________________ 2022 г.",
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0 },
                      bottom: { style: BorderStyle.NONE, size: 0 },
                      left: { style: BorderStyle.NONE, size: 0 },
                      right: { style: BorderStyle.NONE, size: 0 },
                    },
                  }),
                ],
                borders: {
                  top: { style: BorderStyle.NONE, size: 0 },
                  bottom: { style: BorderStyle.NONE, size: 0 },
                  left: { style: BorderStyle.NONE, size: 0 },
                  right: { style: BorderStyle.NONE, size: 0 },
                },
              }),
            ],
            borders: {
              top: { style: BorderStyle.NONE, size: 0 },
              bottom: { style: BorderStyle.NONE, size: 0 },
              left: { style: BorderStyle.NONE, size: 0 },
              right: { style: BorderStyle.NONE, size: 0 },
              insideHorizontal: { style: BorderStyle.NONE, size: 0 },
              insideVertical: { style: BorderStyle.NONE, size: 0 },
            },
          }),
          ...Array(7).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            text: `${report.name}`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ПО ИСПЫТАНИЯМ ЭЛЕКТРООБОРУДОВАНИЯ",
                size: 32, // Увеличиваем размер текста до 16 пунктов
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          ...Array(6).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({ text: "Заказчик: ", bold: true, size: 28 }),
              new TextRun({
                text: `${order.fullName}`,
                size: 28,
              }),
            ],
          }),
          new Paragraph({ text: " " }),
          new Paragraph({
            children: [
              new TextRun({ text: "Объект: ", bold: true, size: 28 }),
              new TextRun({
                text: `${report.title.object}`,
                size: 28,
              }),
            ],
          }),
          new Paragraph({ text: " " }),
          new Paragraph({
            children: [
              new TextRun({ text: "Адрес объекта: ", bold: true, size: 28 }),
              new TextRun({
                text: `${report.title.addressObject}`,
                size: 28,
              }),
            ],
          }),
          new Paragraph({ text: " " }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Дата проведения измерений ",
                bold: true,
                size: 28,
              }),
              new TextRun({
                text: `${formatDateUtils(report.date)}`,
                size: 28,
              }),
            ],
          }),
          ...Array(3).fill(new Paragraph({ text: " " })),
          new Paragraph({
            children: [
              new TextRun({ text: "Всего листов:", bold: true }),
              new TextRun("2"),
            ],
          }),
          ...Array(6).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({
                text: "г. Москва",
                bold: true,
                size: 36,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
      {
        properties: {},
        children: [
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Электротехническая лаборатория ООО «Энергосервис» ",
                            bold: true,
                            underline: true,
                            size: 18,
                          }),
                          new TextRun({
                            text: `Свидетельство регистрации № 6377-3 от ${formatDateUtils(
                              report.title.dateLicense
                            )} г.`,
                            bold: true,
                            underline: true,
                            size: 18,
                          }),
                          new TextRun({
                            text: "Выдано Управлением энергетического и строительного надзора Федеральной службы по экологическому и атомному надзору г. Москва.",
                            bold: true,
                            underline: true,
                            size: 18,
                          }),
                          new TextRun({
                            text: `Действительна до: ${formatDateUtils(
                              report.title.dateOverLicense
                            )} г.`,
                            bold: true,
                            underline: true,
                            size: 18,
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 45,
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0 },
                      bottom: { style: BorderStyle.NONE, size: 0 },
                      left: { style: BorderStyle.NONE, size: 0 },
                      right: { style: BorderStyle.NONE, size: 0 },
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "" }), // Пустая ячейка для отступа
                    ],
                    width: {
                      size: 10, // Ширина пустой ячейки для отступа
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0 },
                      bottom: { style: BorderStyle.NONE, size: 0 },
                      left: { style: BorderStyle.NONE, size: 0 },
                      right: { style: BorderStyle.NONE, size: 0 },
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Заказчик: ", bold: true }),
                          new TextRun(" " + order.fullName),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Объект: ", bold: true }),
                          new TextRun(" " + report.title.object),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Адрес: ", bold: true }),
                          new TextRun(" " + report.title.addressObject),
                        ],
                      }),
                    ],
                    width: {
                      size: 45,
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0 },
                      bottom: { style: BorderStyle.NONE, size: 0 },
                      left: { style: BorderStyle.NONE, size: 0 },
                      right: { style: BorderStyle.NONE, size: 0 },
                    },
                  }),
                ],
                borders: {
                  top: { style: BorderStyle.NONE, size: 0 },
                  bottom: { style: BorderStyle.NONE, size: 0 },
                  left: { style: BorderStyle.NONE, size: 0 },
                  right: { style: BorderStyle.NONE, size: 0 },
                },
              }),
            ],
            borders: {
              top: { style: BorderStyle.NONE, size: 0 },
              bottom: { style: BorderStyle.NONE, size: 0 },
              left: { style: BorderStyle.NONE, size: 0 },
              right: { style: BorderStyle.NONE, size: 0 },
              insideHorizontal: { style: BorderStyle.NONE, size: 0 },
              insideVertical: { style: BorderStyle.NONE, size: 0 },
            },
          }),
          ...Array(1).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({
                text: parseProtocolTitle(protocol.title).protocolNumber
                  ? parseProtocolTitle(protocol.title).protocolNumber
                  : parseProtocolTitle(protocol.title).protocolName,
                size: 32,
                bold: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: parseProtocolTitle(protocol.title).protocolNumber
                  ? parseProtocolTitle(protocol.title).protocolName
                  : "",
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Цель измерений (испытаний: ",
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: `${protocol.goal}`,
                size: 24,
              }),
            ],
          }),
          ...Array(1).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({
                text: protocol.description,
                size: 20,
              }),
            ],
          }),
          ...Array(1).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({
                text: "Методика измерений:",
              }),
            ],
          }),
          ...Array(1).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: protocol.methodology.map(
              (row) =>
                new TableRow({
                  height: {
                    value: pixelsToTwips(35), // Переводим 35 пикселей в твипы
                    rule: HeightRule.ATLEAST,
                  },
                  children: row.map(
                    (cell) =>
                      new TableCell({
                        children: [
                          new Paragraph({
                            text: cell.toString(),
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                        width: {
                          size: 100 / row.length,
                          type: WidthType.PERCENTAGE,
                        },
                      })
                  ),
                })
            ),
          }),
          ...Array(2).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({
                text: "Результаты измерений:",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING1,
          }),
          ...Array(2).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: protocol.rows.map(
              (row) =>
                new TableRow({
                  height: {
                    value: pixelsToTwips(35), // Переводим 35 пикселей в твипы
                    rule: HeightRule.ATLEAST,
                  },
                  children: row.map(
                    (cell) =>
                      new TableCell({
                        children: [
                          new Paragraph({
                            text: cell.toString(),
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                        width: {
                          size: 100 / row.length,
                          type: WidthType.PERCENTAGE,
                        },
                      })
                  ),
                })
            ),
          }),
          ...Array(2).fill(new Paragraph({ text: " " })), // добавляем пустые строки для отступов
          new Paragraph({
            children: [
              new TextRun({
                text: "Заключение: ",
                bold: true,
                size: 28,
              }),
              new TextRun({
                text: `${protocol.result}`,
                size: 28,
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Сохраняем документ в файл
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(
      path.join(`tables/${protocol.title + " " + Math.random() * 1000}.docx`),
      buffer
    );
  });
};

export default tableFileUtils;
