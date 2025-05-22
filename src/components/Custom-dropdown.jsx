import { useState, useRef, useEffect } from 'react';
import Icons from './Icons';
import { useTheme } from '../context/ThemeContext';

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('system');
  const dropdownRef = useRef(null);
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'system', label: 'System', icon: 'system' },
    { value: 'light', label: 'Light', icon: 'light' },
    { value: 'dark', label: 'Dark', icon: 'dark' },
  ];

  useEffect(()=> {
    setSelected(theme);
  },[theme]);

  // Close dropdown on outside click
  useEffect(() => {

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setTheme(value);
    setSelected(value);
    setIsOpen(false);
  };
 
  return (
    <div id="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setIsOpen((prev) => !prev)}>
        <Icons name={selected} />
        <span>{options.find((obj) => obj.value === selected)?.label}</span>
        <span className="arrow">{isOpen ? '˄' : '˅'}</span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li key={opt.value} onClick={() => handleSelect(opt.value)}>
              <Icons name={opt.icon} />
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
