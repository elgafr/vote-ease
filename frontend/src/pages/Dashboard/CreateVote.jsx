import { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import useUserAuth from "../../hooks/useUserAuth";
import { VOTE_TYPE } from "../../utils/data";
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
                voteData.type === item.value ? "text-white bg-neutral border-neutral" : "bg-white border-neutral"
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

              </div>
            </div>

        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateVote;
