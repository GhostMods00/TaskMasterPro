import React from 'react';

const AddReport: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New Report</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Report Title</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter report title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter report details"
            rows={5}
          ></textarea>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Save Report
        </button>
      </form>
    </div>
  );
};

export default AddReport;
