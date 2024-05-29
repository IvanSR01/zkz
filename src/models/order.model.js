import mongoose from 'mongoose';

// Определение схемы для хранения данных заказа
const OrderSchema = new mongoose.Schema(
  {
    // Идентификатор пользователя
    userId: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Полное имя заказчика
    fullName: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Адрес заказчика
    address: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Дата создания заказа
    date: {
      type: Date,
      default: Date.now, // Поле по умолчанию устанавливается на текущую дату и время
    },
  },
  {
    timestamps: true, // Добавляет поля createdAt и updatedAt автоматически
  }
);

// Экспорт модели на основе схемы OrderSchema
export default mongoose.model('Order', OrderSchema);
