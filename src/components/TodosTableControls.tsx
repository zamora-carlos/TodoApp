import { useDispatch, useSelector } from 'react-redux';
import Select from '@common/Select';
import AddTodoButton from '@components/AddTodoButton';
import { changePageSizeAsync } from '@src/redux/todosSlice';
import { showCreateModal } from '@src/redux/modalSlice';
import type { AppDispatch } from '@src/redux/store';
import type { RootState } from '@src/redux/store';

const PAGE_SIZE_OPTIONS = ['10', '15', '20'];

function TodoTableControls() {
  const dispatch = useDispatch<AppDispatch>();
  const { pageSize } = useSelector((state: RootState) => state.todos);

  const handleChangePageSize = (value: string) => {
    const numericPageSize = parseInt(value, 10);
    dispatch(changePageSizeAsync(numericPageSize));
  };

  const handleAddTodo = () => {
    dispatch(showCreateModal());
  };

  return (
    <div className="flex gap-2 flex-col items-start xs:flex-row xs:items-center justify-between">
      <AddTodoButton onClick={handleAddTodo} />

      <Select
        id="items-per-page-select"
        label="Todos per page"
        value={pageSize.toString()}
        options={PAGE_SIZE_OPTIONS}
        onChange={handleChangePageSize}
        containerClassName="flex flex-row-reverse xs:flex-row items-center gap-2 text-slate-500"
        labelClassName="text-base"
        selectWrapperClassName="min-w-fit"
      />
    </div>
  );
}

export default TodoTableControls;
