import Image from "next/image";
export const Logo = () => {
    return (
        <Image
            src={"/blue-para-lms.svg"}
            alt={"Logo"}
            width={170}
            height={170}
        />
    )
}