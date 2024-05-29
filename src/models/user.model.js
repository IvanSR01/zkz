import mongoose from 'mongoose';

// Определение схемы для хранения данных пользователя
const UserSchema = new mongoose.Schema(
  {
    // Полное имя пользователя
    fullName: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Электронная почта пользователя
    email: {
      type: String,
      required: true, // Поле обязательно для заполнения
      unique: true, // Поле должно быть уникальным
    },
    // Номер удостоверения пользователя
    number: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    // Пароль пользователя
    password: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
  },
  {
    timestamps: true, // Добавляет поля createdAt и updatedAt автоматически
  }
);

// Экспорт модели на основе схемы UserSchema
export default mongoose.model('User', UserSchema);
