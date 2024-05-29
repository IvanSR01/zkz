import mongoose from 'mongoose';

// Определение схемы для хранения данных отчета
const ReportSchema = new mongoose.Schema(
  {
    // Идентификатор пользователя
    userId: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Идентификатор заказа
    orderId: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Название отчета
    name: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Дата создания отчета
    date: {
      type: Date,
      default: Date.now, // Поле по умолчанию устанавливается на текущую дату и время
    },
    // Протоколы, связанные с отчетом
    protocols: {
      type: Array,
      default: [], // Поле по умолчанию является пустым массивом
      ref: 'Protocol' // Ссылка на коллекцию Protocol
    },
    // Заголовок отчета (объект с информацией о компании, подразделении и т.д.)
    title: {
      type: Object,
      default: {}, // Поле по умолчанию является пустым объектом
    }
  },
  {
    timestamps: true, // Добавляет поля createdAt и updatedAt автоматически
  }
);

// Экспорт модели на основе схемы ReportSchema
export default mongoose.model('Report', ReportSchema);
