import {default as LibSwitch} from "react-switch";


export default function Switch({onChange, checked, disabled}) {


    const handleChange = (checked) => {
        onChange({ value: checked });
    }


    return (
        <LibSwitch
            // eslint-disable-next-line eqeqeq
            checked={checked == 1}
            onChange={handleChange}
            disabled={disabled}
            width={40}
            handleDiameter={16}
            height={20}
            borderRadius={4}
            onColor={"#3C434D"}
            offColor={"#E5E5E5"}
            uncheckedIcon={null}
            checkedIcon={null}
        />
    )
};
