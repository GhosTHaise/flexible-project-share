import { MouseEventHandler } from "react";

type Props = {
    title : string;
    leftIcon? : string | null;
    rightIcon? : string | null;
    handleClick : MouseEventHandler;
    isSubmitting? : boolean;
    type? : 'button' | 'submit';
    bgColor? : string;
    textColor? : string;
}
const Button = (
        {leftIcon,
        rightIcon,
        handleClick,
        isSubmitting,
        type,
        bgColor,
        textColor} : Props
    ) => {
  return (
    <div>Button</div>
  )
}

export default Button