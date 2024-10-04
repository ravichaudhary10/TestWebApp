import { useState } from "react";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Header } from "../../components/Header";
import { Breadcrumb } from "../../components/Breadcrumb";
import { getBreadcrumbItems } from "./OnboardDealLead.helpers";
import { PersonSearch } from "../../components/PersonSearch";
import { PersonInfoCard } from "../../components/PersonInfoCard";
import { Person } from "../../types/commonTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ApiManager from "../../ApiManager/ApiManager";
import useAuth from "../../hooks/useAuth";
import { handleSuccess } from "../../utils/handleSuccess";
import { handleError } from "../../utils/handleError";
import {
  CANCEL,
  ONBOARD_DEAL_LEAD,
  CONFIRMATION_ACCEPT_LABEL,
  CONFIRMATION_REJECT_LABEL,
  SAVE,
  DEAL_LEAD_DETAILS,
  SUCCESS_MESSAGES,
} from "../../constants/global.constants";
import { useNavigate } from "react-router-dom";
import {
  CANCEL_ONBOARD_LEAD_HEADER,
  CANCEL_ONBOARD_LEAD_MSG,
  NO_THERAPEUTIC_AREA_ASSIGNED_MSG,
  THERAPEUTIC_AREA_ASSIGNMENT_HEADER,
} from "./OnboardDealLead.constants";

// Prime react imports
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

const OnboardDealLead: React.FC = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [dealLeadInfo, setDealLeadInfo] = useState<Person | null>(null);
  const [selectedTherapeuticAreas, setSelectedTherapeuticAreas] = useState<
    number[]
  >([]);
  const [disabledTA, setDisabledTA] = useState<number[]>([]);

  // Selectors
  const therapeuticAreas = useAppSelector((state) => state.therapeuticAreas);

  // Get logged-in user info
  const { user } = useAuth();

  // Navigate function
  const navigate = useNavigate();

  // Dispatch function
  const dispatch = useAppDispatch();

  /**
   * Gets invoked when user clicks form cancel button
   */
  const handleCancelClick = (e: any) => {
    e.preventDefault();

    const accept = () => {
      navigate(-1);
    };

    confirmDialog({
      message: CANCEL_ONBOARD_LEAD_MSG,
      header: CANCEL_ONBOARD_LEAD_HEADER,
      accept,
    });
  };

  /**
   * Update deal lead info with the person info passed as parameter.
   * @param person
   */
  const updateDealLeadInfo = (person: Person) => {
    if (person) {
      setDealLeadInfo(person);

      const selected = person.therapeuticAreas
        ? person.therapeuticAreas.map((item) => item.id)
        : [];
      setSelectedTherapeuticAreas(selected);
      setDisabledTA(selected);
    }
  };

  /**
   * Gets invoked when TA checkboxes are selected
   * @param e
   */
  const onSelectedTAChange = (e: CheckboxChangeEvent) => {
    let selected = [...selectedTherapeuticAreas];

    if (e.checked) {
      selected.push(e.value);
    } else {
      selected.splice(selected.indexOf(e.value), 1);
    }

    // Update selected therapeutic areas
    setSelectedTherapeuticAreas(selected);
  };

  /**
   * Gets invoked when TA checkbox with label "All" is selected
   * @param e
   */
  const onSelectAllTAChange = (e: CheckboxChangeEvent) => {
    if (e.checked && therapeuticAreas) {
      setSelectedTherapeuticAreas(therapeuticAreas?.map((item) => item.value));
    } else {
      setSelectedTherapeuticAreas([...disabledTA]);
    }
  };

  /**
   * Get invoked when Save button is clicked
   * @param e
   */
  const handleSaveClick = () => {
    // Form payload
    const payload = {
      adminUserId: user?.id,
      dealLeadId: dealLeadInfo?.id,
      therapeuticAreaIds: selectedTherapeuticAreas,
    };

    assignTA(payload);
  };

  /**
   * Assigns selected therapeutic areas to the selected deal lead
   * @param data - Payload consisting of adminUserId, dealLeadId and therapeuticAreaIds
   */
  const assignTA = async (data: any) => {
    try {
      // Show loading spinner
      setIsLoading(true);

      await ApiManager.assignTherapeuticAreas(data);

      // Show success toast
      handleSuccess(dispatch, SUCCESS_MESSAGES.TA_ASSIGNMENT_SUCCESS);

      // Go back to previous view on success
      navigate(-1);
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
      // Hide loading spinner
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-column align-items-center">
      {isLoading && <LoadingIndicator />}

      <ConfirmDialog
        acceptLabel={CONFIRMATION_ACCEPT_LABEL}
        rejectLabel={CONFIRMATION_REJECT_LABEL}
        closable={false}
        acceptClassName="p-button-sm"
        rejectClassName="p-button-outlined p-button-sm"
        defaultFocus="reject"
      />

      <Header />

      <div className="flex-1  w-11  p-3">
        <Breadcrumb items={getBreadcrumbItems()} />

        {/* Onboard deal lead form */}
        <div>
          {/* Page Header section */}
          <div className="flex align-items-center mb-3 w-full">
            <h1 className="font-bold text-xl line-height-2">
              {ONBOARD_DEAL_LEAD}
            </h1>

            <div className="flex flex-1 gap-2 justify-content-end ">
              <Button
                label={CANCEL}
                size="small"
                outlined
                onClick={handleCancelClick}
              />
              <Button
                label={SAVE}
                size="small"
                disabled={!dealLeadInfo || !selectedTherapeuticAreas?.length}
                onClick={handleSaveClick}
              />
            </div>
          </div>

          <div className="flex flex-column gap-5">
            {/* Add deal lead section */}

            <div className="w-5">
              <PersonSearch
                onUpdate={(model: Person) => {
                  updateDealLeadInfo(model);
                }}
              />
            </div>

            {/* Section showing deal lead information */}
            {dealLeadInfo && (
              <>
                <div className="flex flex-column gap-2 w-5">
                  <div className="font-bold text-base">{DEAL_LEAD_DETAILS}</div>

                  <PersonInfoCard model={dealLeadInfo} />
                </div>

                {/* Section showing list of therapeutic areas check boxes */}
                <div className="flex flex-column gap-3 w-full">
                  <div className="font-bold text-base">
                    {THERAPEUTIC_AREA_ASSIGNMENT_HEADER}
                  </div>

                  <div className="font-normal text-base secondary-text">
                    {NO_THERAPEUTIC_AREA_ASSIGNED_MSG}
                  </div>

                  {therapeuticAreas && (
                    <div className="card flex flex-wrap gap-3">
                      <div className="flex align-items-center" key="all">
                        <Checkbox
                          name="therapeuticArea"
                          onChange={onSelectAllTAChange}
                          checked={
                            selectedTherapeuticAreas.length ===
                            therapeuticAreas.length
                          }
                        />
                        <label className="ml-2 primary-text">All</label>
                      </div>

                      {therapeuticAreas.map(({ value, label }) => (
                        <div className="flex align-items-center" key={value}>
                          <Checkbox
                            inputId={value}
                            name="therapeuticArea"
                            value={value}
                            onChange={onSelectedTAChange}
                            checked={selectedTherapeuticAreas.includes(value)}
                            disabled={disabledTA.includes(value)}
                          />
                          <label htmlFor={value} className="ml-2 primary-text">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardDealLead;
