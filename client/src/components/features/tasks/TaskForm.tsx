import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';

interface TaskFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assigneeId?: string;
}

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  initialData?: Partial<TaskFormData>;
  isLoading?: boolean;
}

export const TaskForm = ({ onSubmit, initialData, isLoading }: TaskFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: initialData
  });

  const statusOptions = [
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Review', value: 'review' },
    { label: 'Completed', value: 'completed' }
  ];

  const priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          {...register('title', { required: 'Title is required' })}
          placeholder="Task Title"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </div>

      <div>
        <Textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Task Description"
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          {...register('status')}
          options={statusOptions}
          placeholder="Select Status"
        />
        <Select
          {...register('priority')}
          options={priorityOptions}
          placeholder="Select Priority"
        />
      </div>

      <div>
        <Input
          {...register('dueDate')}
          type="date"
          label="Due Date"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
      >
        {initialData ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
};