import SearchIcon from "@mui/icons-material/Search";
import "./style.scss";
import { SearchProps } from "@/interfaces/types";

export default function Search({ onChange }: SearchProps) {
  return (
    <div className="search-container">
      <input
        id="search"
        className="search-input"
        type="text"
        onChange={onChange}
        aria-label="Search planets by name"
        placeholder="Search planets by name"
      />
      <button type="submit" className="search-button" aria-label="Search">
        <SearchIcon fontSize="small" />
      </button>
    </div>
  );
}
