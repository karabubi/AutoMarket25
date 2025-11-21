//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarFilter.jsx

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

function CarFilter({ onFilterChange }) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);

  const makeOptions = ['Audi', 'BMW', 'Toyota'];
  const modelOptions = {
    Audi: ['A4', 'Q5', 'R8'],
    BMW: ['3 Series', 'X5', 'Z4'],
    Toyota: ['Corolla', 'Camry', 'Prius']
  };
  const fuelOptions = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const transmissionOptions = ['Automatic', 'Manual'];
  const driveTypes = ['FWD', 'RWD', 'AWD', '4WD'];
  const emissionClasses = ['Euro 6', 'Euro 5', 'Euro 4'];
  const colors = ['Black', 'White', 'Gray', 'Red', 'Blue', 'Silver'];
  const interiors = ['Leather', 'Cloth', 'Alcantara'];

  const initialFilters = {
    search: '',
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuelTypes: [],
    transmissions: [],
    maxMileage: '',
    driveType: '',
    emissionClass: '',
    color: '',
    interior: ''
  };

  const [filters, setFilters] = useState(initialFilters);

  const debouncedSearch = debounce((value) => {
    onFilterChange?.({ ...filters, search: value });
  }, 400);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  const handleFilterChange = (updatedFields) => {
    const newFilters = { ...filters, ...updatedFields };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
    debouncedSearch(value);
  };

  const toggleMultiSelect = (field, value) => {
    const selected = filters[field].includes(value);
    const updated = selected
      ? filters[field].filter((v) => v !== value)
      : [...filters[field], value];
    handleFilterChange({ [field]: updated });
  };

  const clearFilters = () => handleFilterChange(initialFilters);
  const availableModels = filters.make ? modelOptions[filters.make] || [] : [];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('filter.search')}
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder={t('filter.searchPlaceholder')}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <SelectBox label={t('filter.make')} value={filters.make} onChange={(v) => handleFilterChange({ make: v, model: '' })} options={makeOptions} />
        <SelectBox label={t('filter.model')} value={filters.model} onChange={(v) => handleFilterChange({ model: v })} options={availableModels} disabled={!filters.make} />
        <RangeBox label={t('filter.price')} min={filters.minPrice} max={filters.maxPrice} onMinChange={(v) => handleFilterChange({ minPrice: v })} onMaxChange={(v) => handleFilterChange({ maxPrice: v })} />
        <RangeBox label={t('filter.year')} min={filters.minYear} max={filters.maxYear} options={years} onMinChange={(v) => handleFilterChange({ minYear: v })} onMaxChange={(v) => handleFilterChange({ maxYear: v })} select />

        <MultiSelect label={t('filter.fuelType')} selected={filters.fuelTypes} options={fuelOptions} onToggle={(v) => toggleMultiSelect('fuelTypes', v)} />
        <MultiSelect label={t('filter.transmission')} selected={filters.transmissions} options={transmissionOptions} onToggle={(v) => toggleMultiSelect('transmissions', v)} />
        <SelectBox label={t('filter.driveType')} value={filters.driveType} onChange={(v) => handleFilterChange({ driveType: v })} options={driveTypes} />
        <SelectBox label={t('filter.emissionClass')} value={filters.emissionClass} onChange={(v) => handleFilterChange({ emissionClass: v })} options={emissionClasses} />
        <SelectBox label={t('filter.color')} value={filters.color} onChange={(v) => handleFilterChange({ color: v })} options={colors} />
        <SelectBox label={t('filter.interior')} value={filters.interior} onChange={(v) => handleFilterChange({ interior: v })} options={interiors} />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t('filter.maxMileage')}</label>
          <input
            type="number"
            value={filters.maxMileage}
            onChange={(e) => handleFilterChange({ maxMileage: e.target.value })}
            placeholder="e.g. 100000"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-end">
          <button onClick={clearFilters} className="text-blue-600 underline text-sm">{t('filter.clear')}</button>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function SelectBox({ label, value, onChange, options = [], disabled = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white disabled:bg-gray-100"
      >
        <option value="">{label}...</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function RangeBox({ label, min, max, onMinChange, onMaxChange, options, select = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex space-x-2">
        {select ? (
          <>
            <select value={min} onChange={(e) => onMinChange(e.target.value)} className="w-1/2 border rounded px-2 py-2 text-sm">
              <option value="">{label} From</option>
              {options.map((o) => <option key={`from-${o}`}>{o}</option>)}
            </select>
            <select value={max} onChange={(e) => onMaxChange(e.target.value)} className="w-1/2 border rounded px-2 py-2 text-sm">
              <option value="">{label} To</option>
              {options.map((o) => <option key={`to-${o}`}>{o}</option>)}
            </select>
          </>
        ) : (
          <>
            <input type="number" placeholder="Min" value={min} onChange={(e) => onMinChange(e.target.value)} className="w-1/2 border rounded px-3 py-2 text-sm" />
            <input type="number" placeholder="Max" value={max} onChange={(e) => onMaxChange(e.target.value)} className="w-1/2 border rounded px-3 py-2 text-sm" />
          </>
        )}
      </div>
    </div>
  );
}

function MultiSelect({ label, selected, options, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-3 py-1 rounded-full text-sm border ${selected.includes(opt) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CarFilter;

