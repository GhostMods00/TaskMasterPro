import React from 'react';

const NewMessage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight">New Message</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Recipient</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter recipient name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter subject"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter your message"
            rows={5}
          ></textarea>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default NewMessage;
