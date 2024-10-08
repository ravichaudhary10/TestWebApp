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
  // States
  const [email, setEmail] = useState<string>("");
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Dispatch function
  const dispatch = useAppDispatch();

  /**
   * Gets invoked when the value in Input field gets changed
   * @param e
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setPerson(null);
  };

  /**
   * Search button click handler
   */
  const handleSearch = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // Reset states
      setLoading(true);
      setPerson(null);

      // Make API request
      const response = await ApiManager.searchPersonByEmail(
        email.trim().toLowerCase()
      );
      setPerson(response.data);
    } catch (error: any) {
      handleError(dispatch, error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * PersonInfoCard click handler
   */
  const handleInfoCardClick = () => {
    if (person) {
      // Update person info in parent component
      onUpdate(person);

      // Reset view back to initial state once person is selected
      setPerson(null);
      setEmail("");
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
          disabled={!validateEmail(email)}
          text
          style={{ position: "absolute", right: 0 }}
        ></Button>
      </div>

      {/* Section showing person information */}
      {person && (
        <div onClick={handleInfoCardClick}>
          <PersonInfoCard model={person} isSelectable />
        </div>
      )}
    </div>
  );
};

export default React.memo(PersonSearch);
