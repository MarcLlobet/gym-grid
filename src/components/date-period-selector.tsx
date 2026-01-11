import styled from "@emotion/styled";
import ReactSelect, {
  type StylesConfig,
  components,
  type DropdownIndicatorProps,
  type SingleValue,
} from "react-select";
import { ExpandMoreIcon } from "./expand-more-icon";
import { DATE_OPTIONS_LABEL } from "../constants";
import type { DateOptionsType } from "../logic/dateFilter";

const DatePeriodSelectorWrapper = styled.div`
  display: flex;
  width: 251px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
`;

const SelectWrapper = styled.div`
  width: 100%;
`;

type OptionType = {
  value: string;
  label: string;
};

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #333",
    borderRadius: "6px",
    padding: "2px 4px",
    fontSize: "14px",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#9ca3af",
    },
    ...(state.isFocused && {
      borderColor: "#6366f1",
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
    }),
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 8px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#6b7280",
    padding: "8px",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "4px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "4px",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#333",
    backgroundColor: state.isSelected
      ? "#f3f4f6"
      : state.isFocused
      ? "#f9fafb"
      : "white",
    "&:active": {
      backgroundColor: "#f3f4f6",
    },
  }),
};

const DropdownIndicator = (
  props: DropdownIndicatorProps<OptionType, false>
): React.ReactNode => {
  return (
    <components.DropdownIndicator {...props}>
      <ExpandMoreIcon width={20} height={20} />
    </components.DropdownIndicator>
  );
};

const options: OptionType[] = Object.entries(DATE_OPTIONS_LABEL)
    .map(([value, label]) => ({ value, label }));

const optionsByValue = Object.groupBy(options, ({value}) => value as DateOptionsType) as Record<DateOptionsType, OptionType[]>

const [defaultOption] = options;

function DatePeriodSelector({ selectedOption, onChange }: {
  selectedOption: DateOptionsType
  onChange: (value: DateOptionsType) => void }
): React.ReactNode {

  const [selectedValue] = optionsByValue[selectedOption]

  const handleChange = (newOption: SingleValue<OptionType>): void => {
    onChange(newOption?.value as DateOptionsType);
  }

  return (
    <DatePeriodSelectorWrapper>
      <Label htmlFor="date-period-select">Select date</Label>
      <SelectWrapper>
        <ReactSelect
          inputId="date-period-select"
          defaultValue={defaultOption}
          value={selectedValue}
          options={options}
          getOptionLabel={option => option.label}
          getOptionValue={option => option.value}
          styles={customStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
          onChange={handleChange}
        />
      </SelectWrapper>
    </DatePeriodSelectorWrapper>
  );
}

export default DatePeriodSelector;
