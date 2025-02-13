type Todo = {
  id: number;
  state: boolean;
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
};

export default Todo;
