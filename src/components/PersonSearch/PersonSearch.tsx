import React, { useState } from "react";
import { PersonInfoCard } from "../PersonInfoCard";
import ApiManager from "../../ApiManager/ApiManager";
import { validateEmail } from "../../utils/validateEmail";
import { Person } from "../../types/commonTypes";

// Prime react imports
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const CANCEL_LABEL = "Cancel";

interface PersonSearchProps {
  showCancel?: boolean;
  onUpdate: (person: Person) => void;
  onCancel?: () => void;
}

const PersonSearch: React.FC<PersonSearchProps> = ({
  showCancel = false,
  onUpdate,
  onCancel,
}) => {
  const [email, setEmail] = useState<string>("");
  const [person, setPerson] = useState<Person | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSearchEnabled(validateEmail(e.target.value));
    setError(null);
    setPerson(null);
  };

  const handleSearch = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    try {
      // Reset states
      setLoading(true);
      setError(null);
      setPerson(null);
      setSearchEnabled(false);

      // Make API request
      const response = await ApiManager.searchPersonByEmail(email);
      setPerson(response.data);
    } catch (e: any) {
      //Error handling
      setError(e.message);
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
            className="w-12"
            value={email}
            onChange={handleInputChange}
            // style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
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

      {/* Error section */}
      {!!error && <div className="error-text p-2">{error}</div>}

      {/* Section showing person information */}
      {person && (
        <div className="mt-1" onClick={() => onUpdate(person)}>
          <PersonInfoCard model={person} />
        </div>
      )}
    </div>
  );
};

export default PersonSearch;
