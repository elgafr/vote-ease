const StatsInfo = ({ label, value }) => {
    return (
        <div className="text-center">
            <p className="font-medium" >{value}</p>
            <p className="text-xs mt-[2px]">{label}</p>
        </div>

    )
}
const UserDetailsCard = ({
    profileImageUrl,
    fullName,
    username,
    totalVotesCast,
    totalVotesCreated,
    totalVotesBookmarked
}) => {
  return (
    <div className="bg-neutral-content rounded-lg pr-10 pl-10 mt-16 overflow-hidden">
      <div className="w-full h-32 bg-cover flex justify-center relative">
        <div className="absolute bottom-0 rounded-full overflow-hidden border-2 border-base-100">
          <img
            src={profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 rounded-full bg-slate-400"
          />
        </div>
      </div>

      <div className="mt-2 mb-10 px-5">
        <div className="text-center pt-1">
            <h5 className="text-lg font-medium leading-6">
                {fullName}
            </h5>
            <span className="text-[13px] font-medium text-slate-700/60">
                @{username}
            </span>
        </div>

        <div className="flex items-center justify-center gap-5 flex-wrap my-4">
            <StatsInfo label="Votes Created" value={totalVotesCreated || 0 }  />
            <StatsInfo label="Votes Cast" value={totalVotesCast || 0}  />
            <StatsInfo label="Votes Bookmarked" value={totalVotesBookmarked || 0}  />
        </div>
      </div>
    </div>
  )
}

export default UserDetailsCard
