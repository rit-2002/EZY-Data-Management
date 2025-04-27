const FormSection = ({ title, isDarkMode, fields, buttons }) => (
  <div className={`p-6 ${isDarkMode ? "bg-gray-800 text-slate-100" : "bg-gray-100 text-gray-900"} rounded-lg shadow-lg`}>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {fields.map((field, index) => (
      <div key={index}>
        <label className="block mb-1">{field.label}</label>
        <input
          type={field.type}
          placeholder={field.placeholder}
          className="mb-4 p-2 w-full bg-gray-100 dark:bg-gray-700 border rounded"
        />
      </div>
    ))}
    {buttons ? (
      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${!isDarkMode ? "bg-gray-800 text-slate-100" : "bg-gray-100 text-gray-900"} rounded w-full md:w-auto`}
          >
            {button.label}
          </button>
        ))}
      </div>
    ) : null}
  </div>
);

export default FormSection
