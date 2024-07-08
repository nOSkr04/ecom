import { AntDesign } from "@expo/vector-icons";

export const icons = {
  index: (props: any) => <AntDesign name="home" size={26} {...props} />,
  create: (props: any) => <AntDesign name="API" size={26} {...props} />,
  explore: (props: any) => (
    <AntDesign name="CodeSandbox" size={26} {...props} />
  ),
  profile: (props: any) => <AntDesign name="HTML" size={26} {...props} />,
};
