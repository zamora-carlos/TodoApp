import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  validateTodoText,
  validateTodoPriority,
  validateTodoDueDate,
} from '@utils/todoValidation';
import type { TodoFormData } from '@customTypes/todoFormData';
import type { ValidationErrors } from '@customTypes/validationErrors';

function useTodoValidation(todo: TodoFormData, hasDueDate: boolean) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateFieldError = useCallback(
    (field: keyof TodoFormData, error: string | null) => {
      setErrors(prev => {
        if (error === null) {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        }
        return { ...prev, [field]: error };
      });
    },
    []
  );

  // Automatically revalidate fields on change
  useEffect(() => {
    updateFieldError('text', validateTodoText(todo.text));
  }, [todo.text, updateFieldError]);

  useEffect(() => {
    updateFieldError('priority', validateTodoPriority(todo.priority));
  }, [todo.priority, updateFieldError]);

  useEffect(() => {
    updateFieldError('dueDate', validateTodoDueDate(todo.dueDate, hasDueDate));
  }, [todo.dueDate, hasDueDate, updateFieldError]);

  // Main validation function - validates all fields
  const validate = useCallback(() => {
    const textError = validateTodoText(todo.text);
    const priorityError = validateTodoPriority(todo.priority);
    const dueDateError = validateTodoDueDate(todo.dueDate, hasDueDate);

    const newErrors: ValidationErrors = {};
    if (textError) newErrors.text = textError;
    if (priorityError) newErrors.priority = priorityError;
    if (dueDateError) newErrors.dueDate = dueDateError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [todo, hasDueDate]);

  // Computed properties
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return { errors, hasErrors, validate };
}

export default useTodoValidation;
