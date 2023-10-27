// import {
//   NotificationStatus,
//   addNotification,
// } from "../../store/features/notificationSlice";
// import { startLoading, stopLoading } from "../../store/features/loadingSlice";
// import { useEffect, useState } from "react";

// import PendingInvitationModel from "../../models/PendingInvitationModel";
// import UserModel from "../../models/UserModel";
// import { getPendingInvitations } from "../../services/friendsService";
// import handleError from "../../services/errorHandler";
// import { useAppDispatch } from "../../store/store";

// import { getPendingFriends } from "../../services/friendsService";

const UserPendingFriends = () => {
  return (
    <div>
      {/* {pendingFriends.map((friend) => {
        return (
          <div
            className="flex items-center justify-between gap-4 w-full 2xl:w-1/2 overflow-y-auto py-4 px-6  rounded-md bg-white dark:bg-primaryDark2 shadow-md"
            key={friend.id}
          >
            <div className="flex items-center gap-6 ">
              <img
                className="w-12 h-12 rounded-full"
                //   src={user.photo}
                alt={friend.firstName + " " + friend.lastName}
              />
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold">
                  {friend.firstName} {friend.lastName}
                </span>
                <span className="text-sm text-gray-500">{friend.nickname}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">
                Accept
              </button>
              <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
                Decline
              </button>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default UserPendingFriends;
