import React, { useState } from "react";
import { PersonInfoCard } from "../PersonInfoCard";
import ApiManager from "../../ApiManager/ApiManager";
import { validateEmail } from "../../utils/validateEmail";
import { Person } from "../../types/commonTypes";
import { useAppDispatch } from "../../hooks/hooks";

// Prime react imports
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { handleError } from "../../utils/handleError";

const CANCEL_LABEL = "Cancel";

interface PersonSearchProps {
  showCancel?: boolean;
  onUpdate: (person: Person) => void;
  onCancel?: () => void;
  className?: string;
}

const PersonSearch: React.FC<PersonSearchProps> = ({
  showCancel = false,
  onUpdate,
  onCancel,
  className,
}) => {
  const [email, setEmail] = useState<string>("");
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSearchEnabled(validateEmail(e.target.value));
    setPerson(null);
  };

  /**
   * Shows error toast
   */
  const handleSearch = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    try {
      // Reset states
      setLoading(true);
      setPerson(null);
      setSearchEnabled(false);

      // Make API request
      const response = await ApiManager.searchPersonByEmail(email);
      setPerson(response.data);
    } catch (error: any) {
      handleError(dispatch, error);
    } finally {
      setLoading(false);
      setSearchEnabled(true);
    }
  };

  return (
    <div className="flex flex-column gap-2">
      {showCancel && (
        <div className="flex justify-content-end">
          <Button
            label={CANCEL_LABEL}
            outlined
            size="small"
            onClick={onCancel}
          />
        </div>
      )}
      <div className="flex" style={{ position: "relative" }}>
        <div className="p-float-label flex-1">
          <InputText
            value={email}
            onChange={handleInputChange}
            className={`${className} w-12`}
          ></InputText>
          <label>Email</label>
        </div>
        <Button
          icon={loading ? "pi pi-spin pi-spinner" : "pi pi-search"}
          onClick={handleSearch}
          disabled={!searchEnabled}
          text
          style={{ position: "absolute", right: 0 }}
        ></Button>
      </div>

      {/* Section showing person information */}
      {person && (
        <div onClick={() => onUpdate(person)}>
          <PersonInfoCard model={person} isSelectable />
        </div>
      )}
    </div>
  );
};

export default PersonSearch;
