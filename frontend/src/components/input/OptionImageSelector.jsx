/* eslint-disable react/prop-types */
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";

const OptionImageSelector = ({ imageList, setImageList }) => {
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file && imageList.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList([...imageList, { base64: reader.result, file }]);
      };
      reader.readAsDataURL(file);
      e.target.value = null;
    }
  };

  const handleDeleteImage = (index) => {
    const updatedList = imageList.filter((_, idx) => idx !== index)
    setImageList(updatedList)
  };
  return (
    <div>
      {imageList?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {imageList.map((item, index) => (
            <div key={index} className="rounded-md relative bg-base-100">
              <img src={item.base64} alt={`Selected_${index}`} className="w-full h-36 object-contain rounded-md " />
              <button
                onClick={() => handleDeleteImage(index)}
                className="text-red-500 bg-base-100 rounded-full p-2 absolute top-2 right-2"
              >
                <HiOutlineTrash className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}

      {imageList.length < 4 && (
        <div className="flex items-center gap-5">
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleAddImage}
            className="hidden"
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="btn btn-sm text-nowrap py-[6px] bg-neutral text-white hover:bg-white hover:text-neutral border-none flex items-center"
          >
            <HiMiniPlus className="text-lg" />
            Select Image
          </label>
        </div>
      )}

      
    </div>
  );
};

export default OptionImageSelector;
