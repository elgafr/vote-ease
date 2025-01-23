import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash2 } from "react-icons/lu";
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
        inputRef.current.value = "";
      }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-neutral-content rounded-full relative">
          <LuUser className="text-4xl text-neutral" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-neutral text-white rounded-full absolute -bottom-1 -right-1 "
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 "
            onClick={handleRemoveImage}
          >
            <LuTrash2 />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
