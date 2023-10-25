const UserCloseAccountPage = () => {
  return (
    <div className="max-w-xl">
      <h2 className="font-bold text-lg mb-6 dark:text-blue-50">
        Zamknij konto
      </h2>
      <div className="ml-4">
        <p className="dark:text-blue-50">
          Na pewno chcesz zamknąć swoje konto? Proces ten jest nieodwracalny.
        </p>
        <button className="bg-red-600 rounded-md text-red-50 font-semibold shadow-md hover:bg-red-700 transition-all py-2 px-4 mt-4 w-full">
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default UserCloseAccountPage;
