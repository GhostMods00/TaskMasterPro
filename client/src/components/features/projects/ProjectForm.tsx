import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { Label } from '../../ui/label';

interface ProjectFormData {
  title: string;
  description: string;
  status: string;
  startDate: string;
  dueDate: string;
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  initialData?: Partial<ProjectFormData>;
  isLoading?: boolean;
}

export const ProjectForm = ({ onSubmit, initialData, isLoading }: ProjectFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: initialData
  });

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Completed', value: 'completed' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
          placeholder="Project Title"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Project Description"
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          {...register('status')}
          value={initialData?.status}
          onChange={(value) => register('status').onChange({ target: { value } })}
          options={statusOptions}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            {...register('startDate')}
            type="date"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            {...register('dueDate')}
            type="date"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
      >
        {initialData ? 'Update Project' : 'Create Project'}
      </Button>
    </form>
  );
};