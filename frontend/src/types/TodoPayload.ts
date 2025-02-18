type TodoPayload = {
  text: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null;
};

export default TodoPayload;
