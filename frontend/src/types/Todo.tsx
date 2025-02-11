type Todo = {
  id: number;
  state: boolean;
  name: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
};

export default Todo;
