import { Image, Send, X } from "lucide-react";
import { useState, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imageReview, setImageReview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageReview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImageReview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageReview) {
      toast.error("Please enter a message or select an image.");
      return;
    }
    try {
      const data = {
        text: text.trim(),
        image: imageReview,
      };

      await sendMessage(data);

      setText("");
      setImageReview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imageReview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imageReview}
              alt="Preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={() => removeImage()}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm: input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleImageChange(e)}
        />
        <button
          type="button"
          className={`hidden sm:flex btn btn-circle ${
            imageReview ? "text-emerald-50" : "text-zinc-400"
          }`}
          onClick={() => fileInputRef.current.click()}
        >
          <Image size={20} />
        </button>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imageReview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
