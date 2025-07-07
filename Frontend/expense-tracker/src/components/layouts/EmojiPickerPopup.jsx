import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6 relative'>
      <div
        className='flex items-center gap-4 cursor-pointer'
        onClick={() => setIsOpen(true)}
      >
        <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-shadow-purple-500 rounded-lg'>
          {icon ? (
            <img src={icon} alt='Icon' className='w-12 h-12' />
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {isOpen && (
        <div className='absolute top-full mt-2 z-50 bg-white border border-gray-200 shadow-lg rounded-md max-h-72 overflow-auto'>
          <button
            className='w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-full absolute -top-3 -right-3 z-10 cursor-pointer'
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData?.imageUrl || "");
              setIsOpen(false); // Close after selection
            }}
            height={280} // Optional height
            width={300}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
