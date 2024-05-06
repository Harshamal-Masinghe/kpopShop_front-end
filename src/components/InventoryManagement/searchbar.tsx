import React, { FormEvent, useState } from "react";
import { CgSearch } from "react-icons/cg";

interface SearchBarProps {
  title: string; 
  onSearch: (query: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ title, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    onSearch(searchQuery);
  };

  return (
    <form className=" w-[345px] relative" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="search"
          placeholder={title} 
          className="w-full h-[50px] bg-shadeofpurple hover:bg-darkmagenta shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-[30px] p-4 placeholder-black hover:placeholder-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-1 p-3 text-black">
          <CgSearch className="font-bold w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
