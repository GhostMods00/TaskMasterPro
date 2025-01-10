import React from 'react';

const AddEvent: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New Event</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Event Title</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter event title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Save Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
