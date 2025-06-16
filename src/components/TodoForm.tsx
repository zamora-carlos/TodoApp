import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from '@common/Select';
import Checkbox from '@common/Checkbox';
import useTodoValidation from '@hooks/useTodoValidation';
import formatLocalDate from '@utils/formatLocalDate';
import isTodayOrLater from '@utils/isTodayOrLater';
import { PRIORITY } from '@constants/priority';
import type { TodoPayload } from '@customTypes/todoPayload';
import type { TodoFormData } from '@customTypes/todoFormData';
import type { Priority } from '@customTypes/priority';
import 'react-datepicker/dist/react-datepicker.css';

type TodoFormProps = {
  todo?: TodoPayload;
  onSubmit: (todo: TodoPayload) => void;
};

function TodoForm({ todo, onSubmit }: TodoFormProps) {
  const [hasDueDate, setHasDueDate] = useState(() => !!todo?.dueDate);
  const [formData, setFormData] = useState<TodoFormData>(() => ({
    text: todo?.text ?? '',
    priority: todo?.priority ?? PRIORITY.LOW,
    dueDate: todo?.dueDate ? new Date(todo.dueDate) : new Date(),
  }));

  const { errors, hasErrors, validate } = useTodoValidation(
    formData,
    hasDueDate
  );

  const isEditing = !!todo;

  const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newText = evt.target.value;
    setFormData(prev => ({ ...prev, text: newText }));
  };

  const handlePriorityChange = (value: Priority) => {
    setFormData(prev => ({ ...prev, priority: value }));
  };

  const handleDueDateToggle = () => {
    setHasDueDate(prevHasDueDate => !prevHasDueDate);
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setFormData(prev => ({ ...prev, dueDate: date }));
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (validate()) {
      const payload: TodoPayload = {
        text: formData.text,
        priority: formData.priority,
        dueDate: hasDueDate ? formatLocalDate(formData.dueDate) : null,
      };

      onSubmit(payload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 sm:px-5 md:px-6 lg:px-8 py-10 max-w-full w-xl"
      aria-labelledby="todo-form-title"
    >
      <h2
        className="text-2xl font-bold mb-6 text-slate-700"
        id="todo-form-title"
      >
        {isEditing ? 'Update todo' : 'Create todo'}
      </h2>

      <div className="flex flex-col mt-4 text-slate-600">
        <label htmlFor="todo-text">Name</label>
        <input
          id="todo-text"
          type="text"
          placeholder="Your todo..."
          value={formData.text}
          onChange={handleTextChange}
          className={`py-2 px-4 mt-1 border rounded-lg ${
            errors.text ? 'border-red-400' : 'border-slate-300'
          }`}
          aria-invalid={!!errors.text}
          aria-describedby={errors.text ? 'text-error' : undefined}
        />
        {errors.text && (
          <p id="text-error" className="error-message" role="alert">
            {errors.text}
          </p>
        )}
      </div>

      <Select
        id="todo-form-select"
        label="Priority"
        value={formData.priority}
        options={Object.values(PRIORITY)}
        onChange={handlePriorityChange}
        containerClassName="flex flex-col mt-4 text-slate-600"
        selectWrapperClassName="w-72 max-w-full"
        errorMessage={errors.priority}
      />

      <div className="flex flex-col mt-4">
        <div className="flex gap-2 items-center">
          <label
            htmlFor="due-date-toggle"
            className={hasDueDate ? 'text-slate-600' : 'text-slate-400'}
          >
            Due date
          </label>
          <Checkbox
            id="due-date-toggle"
            size="base"
            checked={hasDueDate}
            onChange={handleDueDateToggle}
          />
        </div>

        {hasDueDate && (
          <div className="ml-0">
            <DatePicker
              selected={formData.dueDate}
              filterDate={isTodayOrLater}
              onChange={handleDateChange}
              showTimeSelect
              className={`text-slate-600 p-2 mt-1 border rounded-lg w-72 max-w-full ${
                errors.dueDate ? 'border-red-400' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.dueDate}
              aria-describedby={errors.dueDate ? 'duedate-error' : undefined}
            />
          </div>
        )}

        {errors.dueDate && (
          <div id="duedate-error" className="error-message" role="alert">
            {errors.dueDate}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={hasErrors}
        className={`p-2 mt-8 border border-slate-300 rounded-lg w-72 max-w-full  ${
          hasErrors
            ? 'text-slate-200 bg-indigo-300 cursor-not-allowed'
            : 'text-white cursor-pointer bg-indigo-500 hover:bg-indigo-400'
        }`}
      >
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  );
}

export default TodoForm;
