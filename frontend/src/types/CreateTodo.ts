type CreateTodo = {
  text: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null;
};

export default CreateTodo;
