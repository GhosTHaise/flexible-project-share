import { MouseEventHandler } from "react";
import Image from "next/image";
type Props = {
    title : string;
    leftIcon? : string | null;
    rightIcon? : string | null;
    handleClick? : MouseEventHandler;
    isSubmitting? : boolean;
    type? : 'button' | 'submit';
    bgColor? : string;
    textColor? : string;
}
const Button = (
    {   
        title,
        leftIcon,
        rightIcon,
        handleClick,
        isSubmitting,
        type,
        bgColor,
        textColor
    } : Props
    ) => {
  return (
    <button
        //bgColor && textColor
        className={`flexCenter gap-3 px-4 py-3 
                ${bgColor ? bgColor : ""} 
                ${textColor ? textColor : ""}`}
        type={type || "button"}
        disabled={isSubmitting}
        onClick={handleClick}
    >
        {
            leftIcon 
                &&
            <Image
                src={leftIcon}
                alt="left"
                width={14}
                height={14}
            />
        }
        {title}
        {
            rightIcon 
                &&
            <Image
                src={rightIcon}
                alt="left"
                width={14}
                height={14}
            />
        }
    </button>
  )
}

export default Button