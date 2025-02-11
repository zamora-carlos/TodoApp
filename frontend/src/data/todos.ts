import Todo from '../types/Todo';

const todos: Todo[] = [
  {
    id: 1,
    state: false,
    name: 'Do the laundry',
    priority: 'Medium',
    dueDate: new Date('2025-02-11'),
  },
  { id: 2, state: true, name: 'Take out the trash', priority: 'Low' },
  {
    id: 3,
    state: false,
    name: 'Buy groceries',
    priority: 'High',
    dueDate: new Date('2025-02-12'),
  },
  { id: 4, state: false, name: 'Wash the dishes', priority: 'Medium' },
  { id: 5, state: true, name: 'Water the plants', priority: 'Low' },
  {
    id: 6,
    state: false,
    name: 'Clean the bathroom',
    priority: 'High',
    dueDate: new Date('2025-02-14'),
  },
  { id: 7, state: true, name: 'Make the bed', priority: 'Low' },
  { id: 8, state: false, name: 'Vacuum the living room', priority: 'Medium' },
  {
    id: 9,
    state: false,
    name: 'Pay the electricity bill',
    priority: 'High',
    dueDate: new Date('2025-02-15'),
  },
  { id: 10, state: true, name: 'Call mom', priority: 'Medium' },
];

export default todos;
