import React from 'react';

const AddMember: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New Team Member</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter team member name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter role"
          />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Save Member
        </button>
      </form>
    </div>
  );
};

export default AddMember; // Ensure the name here matches the component name
