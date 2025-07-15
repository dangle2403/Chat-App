import Message from "../models/message.model";
import User from "../models/user.model";


export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMessages= async (req, res) => {
  try{
    const { id: otherUserId} = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {senderId: myId, receiverId: otherUserId},
        {senderId: otherUserId, receiverId: myId}
      ]
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
