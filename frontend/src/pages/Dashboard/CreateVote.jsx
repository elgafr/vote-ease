import { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import useUserAuth from "../../hooks/useUserAuth";
import { VOTE_TYPE } from "../../utils/data";
import OptionInput from "../../components/input/OptionInput";
import OptionImageSelector from "../../components/input/OptionImageSelector";
const CreateVote = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [voteData, setVoteData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],

    error: "",
  });

  const handleValueChange = (key, value) => {
    setVoteData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateVote = async () => {
    const { question, type, options, imageOptions} = voteData;

    if(!question || !type) {
      handleValueChange("error", "Question and type are required")
      return
    }

    if (type === "single-choice" && options.length < 2) {
      handleValueChange("error", "At least 2 options are required")  
      return
    }

    if (type === "image-based" && imageOptions.length < 2) {
      handleValueChange("error", "At least 2 options are required")  
      return
    }
    handleValueChange("error", "")
  }

  return (
    <DashboardLayout activeMenu="Create Vote">
      <div className="bg-neutral-content my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg font-medium">Create Vote</h2>

        <div className="mt-3">
          <label className="text-xs font-medium">QUESTION</label>

          <textarea
            placeholder="What's in your mind?"
            className="w-full text-[13px] outline-none p-2 bg-base-100 rounded-md mt-2"
            rows={4}
            value={voteData.question}
            onChange={({ target }) =>
              handleValueChange("question", target.value)
            }
          />
        </div>

        <div className="mt-3">
          <label className="text-xs font-medium">Vote Type</label>

          <div className="flex gap-4 flex-wrap mt-3">
            {VOTE_TYPE.map((item) => (
              <div
                key={item.value}
                className={`text-xs font-medium text-neutral  px-4 py-1 rounded-lg border cursor-pointer hover:border-primary ${
                  voteData.type === item.value
                    ? "text-white bg-neutral border-neutral"
                    : "bg-white border-neutral"
                }`}
                onClick={() => {
                  handleValueChange("type", item.value);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {voteData.type === "single-choice" && (
          <div className="mt-5">
            <label className="text-xs font-medium">Options</label>
            <div className="mt-3">
              <OptionInput
                optionList={voteData.options}
                setOptionList={(value) => {
                  handleValueChange("options", value);
                }}
              />
            </div>
          </div>
        )}

        {voteData.type === "image-based" && (
          <div className="mt-5">
            <label className="text-xs font-medium">IMAGE OPTIONS</label>
            <div className="mt-3">
              <OptionImageSelector
                imageList={voteData.imageOptions}
                setImageList={(value) => {
                  handleValueChange("imageOptions", value);
                }}
              />
            </div>
          </div>
        )}

        {voteData.error && (
          <p className="text-xs font-medium text-red-500 mt-5">
            {voteData.error}
          </p>
        )}

        <button
          onClick={handleCreateVote}
          className="btn btn-sm text-nowrap mt-6 bg-neutral text-white hover:bg-white hover:text-neutral border-none flex items-center "
        >
          Create
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CreateVote;
