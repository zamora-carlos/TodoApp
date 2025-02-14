type Filter = {
  name: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | null;
  done: boolean | null;
};

export default Filter;
