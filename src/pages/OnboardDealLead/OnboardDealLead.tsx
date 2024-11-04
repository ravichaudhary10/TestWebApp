import { useCallback, useState } from "react";
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
  CONFIRM_LABEL,
  CANCEL_LABEL,
  SAVE,
  DEAL_LEAD_DETAILS,
  SUCCESS_MESSAGES,
} from "../../constants/global.constants";
import { useNavigate } from "react-router-dom";
import {
  CANCEL_ONBOARD_LEAD_HEADER,
  CANCEL_ONBOARD_LEAD_MSG,
  NO_THERAPEUTIC_AREA_ASSIGNED_MSG,
  ONBOARD_DEAL_LEAD_PAGE_TITLE,
  THERAPEUTIC_AREA_ASSIGNMENT_HEADER,
} from "./OnboardDealLead.constants";

// Prime react imports
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { differenceBetweenSets } from "../../utils/differenceBetweenSets";

const OnboardDealLead: React.FC = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [dealLeadInfo, setDealLeadInfo] = useState<Person | null>(null);
  const [selectedTAs, setSelectedTAs] = useState<Set<number>>(new Set());
  const [preselectedTAs, setPreselectedTAs] = useState<Set<number>>(new Set());

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
  const updateDealLeadInfo = useCallback((person: Person) => {
    if (person) {
      setDealLeadInfo(person);

      const selected = person.therapeuticAreas
        ? person.therapeuticAreas.map((item) => item.id)
        : [];
      setSelectedTAs(new Set(selected));
      setPreselectedTAs(new Set(selected));
    }
  }, []);

  /**
   * Gets invoked when TA checkboxes are selected
   * @param e
   */
  const onSelectedTAChange = (e: CheckboxChangeEvent) => {
    let selected = new Set(selectedTAs);

    if (e.checked) {
      selected.add(e.value);
    } else {
      selected.delete(e.value);
    }

    // Update selected therapeutic areas
    setSelectedTAs(selected);
  };

  /**
   * Gets invoked when TA checkbox with label "All" is selected
   * @param e
   */
  const onSelectAllTAChange = (e: CheckboxChangeEvent) => {
    if (e.checked && therapeuticAreas) {
      setSelectedTAs(new Set(therapeuticAreas?.map((item) => item.value)));
    } else {
      setSelectedTAs(new Set());
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
      therapeuticAreaIds: Array.from(
        differenceBetweenSets(selectedTAs, preselectedTAs)
      ),
      unassignTA: Array.from(
        differenceBetweenSets(preselectedTAs, selectedTAs)
      ),
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
        acceptLabel={CONFIRM_LABEL}
        rejectLabel={CANCEL_LABEL}
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
              {ONBOARD_DEAL_LEAD_PAGE_TITLE}
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
                disabled={!dealLeadInfo || !selectedTAs?.size}
                onClick={handleSaveClick}
              />
            </div>
          </div>

          <div className="flex flex-column gap-5">
            {/* Add deal lead section */}

            <div className="w-5 item-min-width">
              <PersonSearch onUpdate={updateDealLeadInfo} />
            </div>

            {/* Section showing deal lead information */}
            {dealLeadInfo && (
              <>
                <div className="flex flex-column gap-2 w-5 item-min-width">
                  <div className="font-bold text-base">{DEAL_LEAD_DETAILS}</div>

                  <PersonInfoCard model={dealLeadInfo} />
                </div>

                {/* Section showing list of therapeutic areas check boxes */}
                <div className="flex flex-column gap-3 w-full">
                  <div className="font-bold text-base">
                    {THERAPEUTIC_AREA_ASSIGNMENT_HEADER}
                  </div>

                  {/* Show this section if no TA's assigned */}
                  {!preselectedTAs.size && (
                    <div className="font-normal text-base secondary-text">
                      {NO_THERAPEUTIC_AREA_ASSIGNED_MSG}
                    </div>
                  )}

                  {therapeuticAreas && (
                    <div className="card flex flex-wrap gap-3">
                      <div className="flex align-items-center" key="all">
                        <Checkbox
                          name="therapeuticArea"
                          onChange={onSelectAllTAChange}
                          checked={selectedTAs.size === therapeuticAreas.length}
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
                            checked={selectedTAs.has(value)}
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
