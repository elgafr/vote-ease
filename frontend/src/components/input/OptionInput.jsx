/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineTrash, HiMiniPlus } from "react-icons/hi2";

const OptionInput = ({ optionList, setOptionList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if(option.trim() && optionList.length < 4) {
        setOptionList([...optionList, option.trim()]);
        setOption("")
    }  
  };
  const handleDeleteOption = (index) => {
    const updatedArr = optionList.filter((_, idx) => idx !== index)
    setOptionList(updatedArr)
  };
  return (
    <div>
      {optionList.map((item, index) => (
        <div key={item} className="flex justify-between px-4 py-2 bg-base-100 rounded-md mb-3">
          <p className="text-xs font-medium">{item}</p>
          <button
            onClick={() => {
              handleDeleteOption(index);
            }}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {optionList.length < 4 && (
        <div className="flex items-center gap-5 mt-4">
          <input
            type="text"
            placeholder="Enter Option"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] outline-none bg-base-100 px-3 py-[6px] rounded-md"
          />
          <button
          className="btn btn-sm text-nowrap py-[6px] bg-neutral text-white hover:bg-white hover:text-neutral border-none flex items-center" 
          onClick={handleAddOption}
          >
            <HiMiniPlus className="text-lg" /> Add Option
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionInput;
