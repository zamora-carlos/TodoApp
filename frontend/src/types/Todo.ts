type Todo = {
  id: number;
  text: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  isDone: boolean;
  dueDate: string | null;
};

export default Todo;
