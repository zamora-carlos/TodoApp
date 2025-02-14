type Todo = {
  id: number;
  text: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  done: boolean;
  dueDate: string | null;
};

export default Todo;
